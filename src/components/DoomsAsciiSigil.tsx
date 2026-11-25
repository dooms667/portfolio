'use client';

import React, { useEffect, useRef } from 'react';

interface DoomsAsciiSigilProps {
  className?: string;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
}

/* ───────────── tuning ───────────── */
// true  = muter 360° (logo kebalik di belakang)
// false = ayun pendulum ±54° (logo selalu kebaca, 3D tetap jelas)
const FULL_SPIN = false;
const LIME = '#ccff00';
const GRID = 58;
const EXTRUDE = 0.26;
const WALL_STEPS = 5;
const DEPTH_BUCKETS = 28;
const ALPHA_LEVELS = [0.3, 0.55, 0.8, 1];
const NOISE_COUNT = 150;

// Ramp ASCII murni (tanpa block glyph) -> lebih bersih & konsisten
const FACE_RAMP = ['.', ':', '-', '=', '+', '*', '#', '%', '@'];
const SIDE_RAMP = ['·', ':', '+', '=', '*', '#'];
const NOISE_CHARS = ['·', '.', ':', ';', '+', '*', '°', '`'];
const ALL_GLYPHS = Array.from(new Set([...FACE_RAMP, ...SIDE_RAMP, ...NOISE_CHARS]));
const GLYPH_COL: Record<string, number> = {};
ALL_GLYPHS.forEach((c, i) => {
  GLYPH_COL[c] = i;
});
const FACE_COL = FACE_RAMP.map((c) => GLYPH_COL[c]);
const SIDE_COL = SIDE_RAMP.map((c) => GLYPH_COL[c]);
const NOISE_COL = NOISE_CHARS.map((c) => GLYPH_COL[c]);

// Atlas row = colorIdx * 4 + alphaLevel  (0..3 = ink, 4..7 = lime)
// Alpha di-bake ke atlas -> nol perubahan globalAlpha per glyph.

export default function DoomsAsciiSigil({ className = '' }: DoomsAsciiSigilProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { desynchronized: true });
    if (!ctx) return;

    let disposed = false;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isVisible = false;
    let rafId = 0;
    let lastTime = performance.now();
    let progress = 0;
    let tiltX = 0;
    let tiltY = 0;
    let perfEma = 1 / 60;
    let frameCount = 0;
    let lowPerf = false;

    const waves: PulseWave[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, inside: false };

    /* ───────────── voxel storage (typed arrays, zero alloc per frame) ───────────── */
    let count = 0;
    let X = new Float32Array(0);
    let Y = new Float32Array(0);
    let Z = new Float32Array(0);
    let NX = new Float32Array(0);
    let NY = new Float32Array(0);
    let NZ = new Float32Array(0);
    let INK = new Float32Array(0);
    let THR = new Float32Array(0);
    let KIND = new Uint8Array(0); // 0 = face, 1 = face edge, 2 = side wall
    let SEED = new Uint8Array(0);
    let DX = new Float32Array(0);
    let DY = new Float32Array(0);
    let VX = new Float32Array(0);
    let VY = new Float32Array(0);
    // per-frame scratch
    let SX = new Float32Array(0);
    let SY = new Float32Array(0);
    let PS = new Float32Array(0);
    let GL = new Uint16Array(0);
    let RW = new Uint8Array(0);
    let BK = new Uint8Array(0);
    let ORDER = new Int32Array(0);
    const counts = new Int32Array(DEPTH_BUCKETS);
    const starts = new Int32Array(DEPTH_BUCKETS);

    /* ───────────── noise halo ───────────── */
    const nXr = new Float32Array(NOISE_COUNT);
    const nYr = new Float32Array(NOISE_COUNT);
    const nPh = new Float32Array(NOISE_COUNT);
    const nSp = new Float32Array(NOISE_COUNT);
    const nSz = new Float32Array(NOISE_COUNT);
    for (let n = 0; n < NOISE_COUNT; n++) {
      nXr[n] = Math.random();
      nYr[n] = Math.random();
      nPh[n] = Math.random() * Math.PI * 2;
      nSp[n] = 0.3 + Math.random() * 0.85;
      nSz[n] = Math.random() > 0.65 ? 11 : 9;
    }

    /* ───────────── sprite atlas (resolusi = ukuran render, jadi tajam & nggak di-scale) ───────────── */
    const atlas = document.createElement('canvas');
    const actx = atlas.getContext('2d');
    let cell = 16;
    let inkColor = '#ffffff';
    let isDark = true;

    const buildAtlas = () => {
      if (!actx) return;
      const step = (Math.min(width * 0.34, height * 0.42, 185) * 2) / GRID;
      cell = Math.max(12, Math.min(40, Math.round(step * 1.5 * dpr)));
      atlas.width = ALL_GLYPHS.length * cell;
      atlas.height = cell * 8;
      actx.clearRect(0, 0, atlas.width, atlas.height);
      actx.font = `900 ${Math.round(cell * 0.82)}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`;
      actx.textAlign = 'center';
      actx.textBaseline = 'middle';
      for (let colorIdx = 0; colorIdx < 2; colorIdx++) {
        actx.fillStyle = colorIdx === 0 ? inkColor : LIME;
        for (let a = 0; a < 4; a++) {
          actx.globalAlpha = ALPHA_LEVELS[a];
          const row = colorIdx * 4 + a;
          for (let g = 0; g < ALL_GLYPHS.length; g++) {
            actx.fillText(ALL_GLYPHS[g], g * cell + cell * 0.5, row * cell + cell * 0.54);
          }
        }
      }
      actx.globalAlpha = 1;
    };

    const syncTheme = () => {
      inkColor = getComputedStyle(container).color || '#ffffff';
      const m = inkColor.match(/[\d.]+/g);
      isDark = m ? (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255 > 0.5 : true;
      buildAtlas();
    };

    const computeSize = () => {
      width = container.clientWidth || 800;
      height = container.clientHeight || 400;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    computeSize();
    syncTheme();

    // next-themes nempel class di <html>, bukan <body> -> observe dua-duanya
    const themeObserver = new MutationObserver(syncTheme);
    const obsOpts = { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] };
    themeObserver.observe(document.documentElement, obsOpts);
    themeObserver.observe(document.body, obsOpts);

    /* ───────────── build voxels dari logo ───────────── */
    const img = new Image();
    img.src = '/assets/images/logo-dooms667.png';
    img.onload = () => {
      if (disposed) return;

      const scanSize = 192;
      const scanCanvas = document.createElement('canvas');
      scanCanvas.width = scanSize;
      scanCanvas.height = scanSize;
      const scanCtx = scanCanvas.getContext('2d', { willReadFrequently: true });
      if (!scanCtx) return;

      scanCtx.clearRect(0, 0, scanSize, scanSize);
      scanCtx.drawImage(img, 0, 0, scanSize, scanSize);
      const scanData = scanCtx.getImageData(0, 0, scanSize, scanSize).data;

      const cornerLum = (0.299 * scanData[0] + 0.587 * scanData[1] + 0.114 * scanData[2]) / 255;
      const lightBg = scanData[3] > 128 && cornerLum > 0.5;

      let minX = scanSize;
      let minY = scanSize;
      let maxX = 0;
      let maxY = 0;

      for (let y = 0; y < scanSize; y++) {
        for (let x = 0; x < scanSize; x++) {
          const i = (y * scanSize + x) * 4;
          const lum = (0.299 * scanData[i] + 0.587 * scanData[i + 1] + 0.114 * scanData[i + 2]) / 255;
          const alpha = scanData[i + 3] / 255;
          const ink = lightBg ? (1 - lum) * alpha : lum * alpha;
          if (ink > 0.15) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX <= minX || maxY <= minY) {
        minX = 0;
        minY = 0;
        maxX = scanSize - 1;
        maxY = scanSize - 1;
      }

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      const aspectRatio = cropW / cropH;

      const offscreen = document.createElement('canvas');
      offscreen.width = GRID;
      offscreen.height = GRID;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, GRID, GRID);
      offCtx.drawImage(scanCanvas, minX, minY, cropW, cropH, 2, 2, GRID - 4, GRID - 4);
      const { data } = offCtx.getImageData(0, 0, GRID, GRID);

      const total = GRID * GRID;
      const inkGrid = new Float32Array(total);
      for (let i = 0; i < total; i++) {
        const p = i * 4;
        const lum = (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]) / 255;
        const alpha = data[p + 3] / 255;
        const ink = lightBg ? (1 - lum) * alpha : lum * alpha;
        inkGrid[i] = ink > 0.16 ? ink : 0;
      }

      const bx: number[] = [];
      const by: number[] = [];
      const bz: number[] = [];
      const bnx: number[] = [];
      const bny: number[] = [];
      const bnz: number[] = [];
      const bink: number[] = [];
      const bthr: number[] = [];
      const bkind: number[] = [];
      const bseed: number[] = [];

      const push = (
        x: number, y: number, z: number,
        nx: number, ny: number, nz: number,
        ink: number, thr: number, kind: number, seed: number
      ) => {
        bx.push(x); by.push(y); bz.push(z);
        bnx.push(nx); bny.push(ny); bnz.push(nz);
        bink.push(ink); bthr.push(thr); bkind.push(kind); bseed.push(seed);
      };

      for (let r = 1; r < GRID - 1; r++) {
        for (let c = 1; c < GRID - 1; c++) {
          const idx = r * GRID + c;
          const ink = inkGrid[idx];
          if (ink <= 0) continue;

          const x = ((c / (GRID - 1)) * 2 - 1) * Math.min(1.06, aspectRatio);
          const y = (r / (GRID - 1)) * 2 - 1;

          const noise = Math.random();
          const verticalFactor = 1 - r / GRID;
          const waveOffset = Math.sin(c * 0.26) * 0.04;
          const thr = Math.max(0.02, Math.min(0.98, verticalFactor * 0.8 + waveOffset + noise * 0.12));
          const seed = Math.floor(noise * 8);

          const left = inkGrid[idx - 1];
          const right = inkGrid[idx + 1];
          const up = inkGrid[idx - GRID];
          const down = inkGrid[idx + GRID];
          const isContour = left <= 0.22 || right <= 0.22 || up <= 0.22 || down <= 0.22;

          const gx = (right - left) * 0.35;
          const gy = (down - up) * 0.35;
          const fLen = Math.hypot(-gx, -gy, 1) || 1;
          const faceKind = isContour ? 1 : 0;

          push(x, y, EXTRUDE, -gx / fLen, -gy / fLen, 1 / fLen, ink, thr, faceKind, seed);
          push(x, y, -EXTRUDE, -gx / fLen, -gy / fLen, -1 / fLen, ink, thr, faceKind, seed);

          if (isContour && ink > 0.24) {
            const snx = left - right;
            const sny = up - down;
            const sLen = Math.hypot(snx, sny) || 1;
            for (let s = 1; s < WALL_STEPS; s++) {
              const zPos = -EXTRUDE + (s / WALL_STEPS) * (EXTRUDE * 2);
              push(x, y, zPos, snx / sLen, sny / sLen, 0, ink, thr, 2, seed);
            }
          }
        }
      }

      count = bx.length;
      X = Float32Array.from(bx);
      Y = Float32Array.from(by);
      Z = Float32Array.from(bz);
      NX = Float32Array.from(bnx);
      NY = Float32Array.from(bny);
      NZ = Float32Array.from(bnz);
      INK = Float32Array.from(bink);
      THR = Float32Array.from(bthr);
      KIND = Uint8Array.from(bkind);
      SEED = Uint8Array.from(bseed);
      DX = new Float32Array(count);
      DY = new Float32Array(count);
      VX = new Float32Array(count);
      VY = new Float32Array(count);
      SX = new Float32Array(count);
      SY = new Float32Array(count);
      PS = new Float32Array(count);
      GL = new Uint16Array(count);
      RW = new Uint8Array(count);
      BK = new Uint8Array(count);
      ORDER = new Int32Array(count);
    };

    /* ───────────── input (pointer events di canvas: nggak perlu getBoundingClientRect) ───────────── */
    const onMove = (e: PointerEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (mouse.inside) {
        mouse.vx = x - mouse.x;
        mouse.vy = y - mouse.y;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.inside = true;
    };
    const onLeave = () => {
      mouse.inside = false;
      mouse.vx = 0;
      mouse.vy = 0;
    };
    const onDown = (e: PointerEvent) => {
      waves.push({ x: e.offsetX, y: e.offsetY, radius: 0, maxRadius: 240, life: 1 });
      if (waves.length > 4) waves.shift();
    };
    canvas.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);

    /* ───────────── render ───────────── */
    const lx = -0.55;
    const ly = -0.5;
    const lz = 0.66;
    const lLen = Math.hypot(lx, ly, lz);
    const lightX = lx / lLen;
    const lightY = ly / lLen;
    const lightZ = lz / lLen;

    const hoverRadius = 68;
    const hoverSq = hoverRadius * hoverRadius;
    const fov = 2.45;
    const springK = 195;
    const bandOn = true; // set true jika tetap mau scanner line

    const render = (now: number) => {
      rafId = 0;
      if (!isVisible || disposed) return;

      const rawDt = Math.max(0, (now - lastTime) / 1000);
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);
      const frameScale = dt * 60;
      const t = now * 0.001;

      // governor: kalau device lemah, otomatis kurangi beban (sekali turun, nggak flapping)
      perfEma += (Math.min(rawDt, 0.1) - perfEma) * 0.05;
      frameCount++;
      if (!lowPerf && frameCount > 120 && perfEma > 0.026) lowPerf = true;

      if (count > 0 && progress < 1.2) progress += dt * (reduced ? 20 : 0.9);

      for (let w = waves.length - 1; w >= 0; w--) {
        waves[w].radius += dt * 360;
        waves[w].life = 1 - waves[w].radius / waves[w].maxRadius;
        if (waves[w].life <= 0) waves.splice(w, 1);
      }

      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);

      /* 1. noise halo */
      const noiseLen = lowPerf ? NOISE_COUNT >> 1 : NOISE_COUNT;
      for (let n = 0; n < noiseLen; n++) {
        const nx = nXr[n] * width;
        const ny = (((nYr[n] * height - t * nSp[n] * 12) % height) + height) % height;
        const ndx = nx - mouse.x;
        const ndy = ny - mouse.y;
        const hovered = mouse.inside && ndx * ndx + ndy * ndy < hoverSq * 1.4;

        const ci = (Math.floor(t * 4 + n) + (hovered ? 3 : 0)) % NOISE_COL.length;
        const lvl = Math.min(2, ((Math.sin(t * 3 + nPh[n]) * 0.5 + 0.5) * 3) | 0);
        const row = hovered ? 7 : lvl;
        const s = nSz[n] * 1.35;
        ctx.drawImage(atlas, NOISE_COL[ci] * cell, row * cell, cell, cell, nx - s * 0.5, ny - s * 0.5, s, s);
      }

      /* 2. shockwave ring (satu stroke per wave, murah) */
      if (waves.length > 0) {
        ctx.strokeStyle = LIME;
        ctx.lineWidth = 1.2;
        for (let w = 0; w < waves.length; w++) {
          ctx.globalAlpha = Math.max(0, waves[w].life) * 0.35;
          ctx.beginPath();
          ctx.arc(waves[w].x, waves[w].y, waves[w].radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      /* 3. sigil */
      if (count > 0) {
        const cx = width * 0.5;
        const radius = Math.min(width * 0.34, height * 0.42, 185);
        const cy = height * 0.5 + (reduced ? 0 : Math.sin(t * 1.1) * radius * 0.025);
        const baseStep = (radius * 2) / GRID;
        const baseDraw = baseStep * 1.5;

        const ease = 1 - Math.exp(-dt * 5);
        const targetTiltY = mouse.inside ? ((mouse.x - cx) / width) * 0.65 : 0;
        const targetTiltX = mouse.inside ? -((mouse.y - cy) / height) * 0.45 : 0;
        tiltY += (targetTiltY - tiltY) * ease;
        tiltX += (targetTiltX - tiltX) * ease;

        const spin = FULL_SPIN ? t * 0.78 : Math.sin(t * 0.55) * 0.95;
        const angleY = (reduced ? 0 : spin) + tiltY;
        const angleX = (reduced ? 0 : Math.sin(t * 0.45) * 0.2) + tiltX;
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        const damp = Math.exp(-13.4 * dt);
        const bandOn = !reduced && progress >= 1;
        const bandY = cy - radius * 1.15 + ((t % 4.5) / 4.5) * radius * 2.3;
        const bandW = radius * 0.06;
        const hasWaves = waves.length > 0;

        let m = 0;

        for (let i = 0; i < count; i++) {
          if (progress < THR[i]) continue;
          const kind = KIND[i];
          if (lowPerf && kind === 2 && (i & 1) === 1) continue;

          const vx0 = X[i];
          const vy0 = Y[i];
          const vz0 = Z[i];

          const nx1 = NX[i] * cosY - NZ[i] * sinY;
          const nz1 = NX[i] * sinY + NZ[i] * cosY;
          const nz2 = NY[i] * sinX + nz1 * cosX;
          if (kind !== 2 && nz2 < -0.05) continue;
          const ny2 = NY[i] * cosX - nz1 * sinX;

          const x1 = vx0 * cosY - vz0 * sinY;
          const z1 = vx0 * sinY + vz0 * cosY;
          const y2 = vy0 * cosX - z1 * sinX;
          const z2 = vy0 * sinX + z1 * cosX;

          const persp = fov / (fov + z2);
          const ax = cx + x1 * radius * persp;
          const ay = cy + y2 * radius * persp;

          // spring physics: cuma jalan kalau voxel memang lagi bergerak / kena gaya
          let ox = DX[i];
          let oy = DY[i];
          let ovx = VX[i];
          let ovy = VY[i];
          let active = ox * ox + oy * oy + ovx * ovx + ovy * ovy > 0.0009;

          if (mouse.inside) {
            const dx = ax + ox - mouse.x;
            const dy = ay + oy - mouse.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < hoverSq && dSq > 0.01) {
              const dist = Math.sqrt(dSq);
              const falloff = 1 - dist / hoverRadius;
              const push = falloff * 20 * frameScale;
              ovx += (dx / dist) * push + mouse.vx * 0.14 * falloff;
              ovy += (dy / dist) * push + mouse.vy * 0.14 * falloff;
              active = true;
            }
          }

          if (hasWaves) {
            const curX = ax + ox;
            const curY = ay + oy;
            for (let w = 0; w < waves.length; w++) {
              const sw = waves[w];
              const wdx = curX - sw.x;
              const wdy = curY - sw.y;
              const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
              const ringDist = Math.abs(wdist - sw.radius);
              if (ringDist < 22 && wdist > 0.1) {
                const impulse = (1 - ringDist / 22) * sw.life * 32;
                ovx += (wdx / wdist) * impulse;
                ovy += (wdy / wdist) * impulse;
                active = true;
              }
            }
          }

          if (active) {
            ovx = (ovx - ox * springK * dt) * damp;
            ovy = (ovy - oy * springK * dt) * damp;
            ox += ovx * dt;
            oy += ovy * dt;
            DX[i] = ox;
            DY[i] = oy;
            VX[i] = ovx;
            VY[i] = ovy;
          }

          const sx = ax + ox;
          const sy = ay + oy;

          /* lighting: diffuse + specular murah (d^8) + depth fog */
          const diffuse = Math.max(0, nx1 * lightX + ny2 * lightY + nz2 * lightZ);
          const d2 = diffuse * diffuse;
          const d4 = d2 * d2;
          const spec = d4 * d4;
          const light =
            kind === 2
              ? Math.min(1, 0.2 + diffuse * 0.8 + spec * 0.2)
              : Math.min(1, 0.45 + diffuse * 0.55 + spec * 0.35);
          const fog = 1 - Math.min(1, Math.max(0, (z2 + 1.1) / 2.4)) * 0.5;

          const ramp = kind === 2 ? SIDE_COL : FACE_COL;
          const rLast = ramp.length - 1;
          const ink = INK[i];
          const dens = kind === 2 ? light : light * (0.45 + ink * 0.55);
          let gi = Math.min(rLast, Math.max(0, Math.floor(dens * rLast + 0.5)));

          const age = progress - THR[i];
          if (age < 0.08) gi = Math.floor(gi * (age / 0.08));
          // shimmer murah: tanpa sin() per voxel
          if (kind !== 2 && ink < 0.58 && ((Math.floor(t * 10) + SEED[i]) & 7) === 0) {
            gi = Math.max(0, gi - 1);
          }

          // warna: reveal / hover / scanner / rim-light
          let lime = false;
          const hdx = sx - mouse.x;
          const hdy = sy - mouse.y;
          if (age < 0.05) {
            lime = true;
          } else if (mouse.inside && hdx * hdx + hdy * hdy < hoverSq) {
            lime = true;
          } else if (bandOn && Math.abs(sy - bandY) < bandW) {
            lime = true;
            gi = Math.min(rLast, gi + 2);
          } else if (isDark && kind !== 0 && light > (kind === 2 ? 0.58 : 0.84)) {
            lime = true;
          }

          const tone = fog * (kind === 2 ? 0.55 + light * 0.45 : 0.6 + ink * 0.4);
          const aLvl = lime ? 3 : tone > 0.85 ? 3 : tone > 0.65 ? 2 : tone > 0.45 ? 1 : 0;

          let b = ((1.4 - z2) / 2.8 * DEPTH_BUCKETS) | 0;
          if (b < 0) b = 0;
          else if (b >= DEPTH_BUCKETS) b = DEPTH_BUCKETS - 1;

          SX[m] = sx;
          SY[m] = sy;
          PS[m] = persp;
          GL[m] = ramp[gi];
          RW[m] = (lime ? 4 : 0) + aLvl;
          BK[m] = b;
          m++;
        }

        // counting sort O(n) berdasarkan depth bucket (pengganti Array.sort per frame)
        counts.fill(0);
        for (let j = 0; j < m; j++) counts[BK[j]]++;
        let acc = 0;
        for (let b = 0; b < DEPTH_BUCKETS; b++) {
          starts[b] = acc;
          acc += counts[b];
        }
        for (let j = 0; j < m; j++) ORDER[starts[BK[j]]++] = j;

        // gambar far -> near, tanpa ubah state canvas sama sekali
        for (let k = 0; k < m; k++) {
          const j = ORDER[k];
          const ds = baseDraw * PS[j];
          ctx.drawImage(atlas, GL[j] * cell, RW[j] * cell, cell, cell, SX[j] - ds * 0.5, SY[j] - ds * 0.5, ds, ds);
        }
      }

      mouse.vx *= 0.55;
      mouse.vy *= 0.55;
      rafId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(() => {
      computeSize();
      buildAtlas();
    });
    resizeObserver.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    return () => {
      disposed = true;
      img.onload = null;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full h-[320px] md:h-[400px] select-none overflow-hidden ${className}`}
    >
      {/* glow statis di belakang canvas (CSS, nol biaya per frame) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 52%, rgba(204,255,0,0.10), transparent 70%)',
        }}
      />

      {/* tepi canvas memudar halus -> nggak ada batas kotak yang kelihatan */}
      <canvas
        ref={canvasRef}
        className="relative block h-full w-full cursor-crosshair touch-pan-y"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 84% 88% at 50% 50%, #000 72%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 84% 88% at 50% 50%, #000 72%, transparent 100%)',
        }}
      />
    </div>
  );
}
