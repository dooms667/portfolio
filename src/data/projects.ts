export interface Project {
  id: string;
  title: string;
  category: 'logic' | 'pixels';
  tags: string[];
  description: string;
  featured: boolean;
  link?: string;
  preview?: string;
  year?: string;
  role?: string;
  problem?: string;
  architecture?: string;
  deliverables?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'doompet',
    title: 'DOOMPET',
    category: 'logic',
    tags: ['FLUTTER', 'SQLITE', 'SUPABASE'],
    description: 'An offline-first financial tracking application featuring daily limits and a local storage architecture.',
    featured: true,
    link: 'https://github.com/dooms667/doompet',
    preview: '/assets/videos/doompet.mp4',
    year: '2026',
    role: 'MOBILE ARCHITECT & UI/UX DESIGNER',
    problem: 'Most personal finance apps stall on weak connections or lock basic expense logging behind cloud sign-ups. Daily spending caps require instant, zero-latency entry anywhere.',
    architecture: 'Built around a local SQLite database as the primary source of truth so transactions, savings milestones, and daily budget calculations run completely offline with optional Supabase sync.',
    deliverables: [
      'Offline-First Flutter Android Application',
      'Local SQLite Schema & Daily Limit Engine',
      'High-Contrast Dark Mode Interface',
    ],
  },

  {
    id: 'pos-system',
    title: 'POS & INVENTORY SYSTEM',
    category: 'logic',
    tags: ['JAVA', 'NETBEANS', 'MYSQL'],
    description: 'Desktop Point of Sale system for SMKS Persada Husada Indonesia, featuring a food pre-order module.',
    featured: true,
    link: 'https://github.com/dooms667/POS-SMK',
    preview: '/assets/videos/posphi.mp4',
    year: '2026',
    role: 'SYSTEM ANALYST & DESKTOP DEVELOPER',
    problem: 'The Business Center at SMKS Persada Husada Indonesia relied on manual bookkeeping across multiple vocational units, causing stock discrepancies and slow break-time order queues.',
    architecture: 'Engineered a relational MySQL backend connected via JDBC to a modular Java Swing desktop client in NetBeans, separating master inventory, cashier transactions, and pre-order workflows.',
    deliverables: [
      'Java Desktop POS & Inventory Client',
      'Multi-Unit Relational MySQL Database',
      'Food Pre-Order Queue & Reporting Module',
    ],
  },

  {
    id: 'dovault-manager',
    title: 'DOVAULT - PASSWORD MANAGER',
    category: 'logic',
    tags: ['FLUTTER', 'SQLITE', 'LOCAL-FIRST'],
    description: 'A local-first, offline password manager for Android. Built with Flutter.',
    featured: false,
    link: 'https://github.com/dooms667/dovault',
    year: '2026',
    role: 'SOLO DEVELOPER & PRODUCT DESIGNER',
    problem: 'Cloud password managers introduce third-party server exposure and subscription bloat for users who want direct physical control over their credentials.',
    architecture: 'Zero-cloud local vault stored strictly on-device via encrypted SQLite storage, eliminating external network calls and keeping credential retrieval instantaneous.',
    deliverables: [
      'Offline Android Credential Vault',
      'Encrypted Local SQLite Storage Layer',
      'Minimalist High-Contrast Vault UI',
    ],
  },

  {
    id: 'zine-kehancuran',
    title: 'KEHANCURAN NGASAL',
    category: 'pixels',
    tags: ['ZINE', 'SELF-PUBLISHED', 'PRINT'],
    description: 'A black-and-white zine about grief, anxiety and the stresses of everyday life printed in monochrome.',
    featured: true,
    link: 'https://www.instagram.com/p/DfSsPfkkx9P/?img_index=1',
    preview: '/assets/videos/zine-kehancuran.mp4',
    year: '2025',
    role: 'AUTHOR, ILLUSTRATOR & PRINT LAYOUT',
    problem: 'Translating raw personal grief, burnout, and everyday anxiety into a physical print artifact without polishing away the discomfort.',
    architecture: 'Photocopy-inspired monochrome halftone textures, aggressive grid breaks, and raw hand-rendered ink compositions formatted for independent zine printing.',
    deliverables: [
      'Self-Published Monochrome Print Zine',
      'Editorial Sequence & Spread Typography',
      'Custom Halftone & Ink Illustrations',
    ],
  },

  {
    id: 'napak-tanah',
    title: 'NAPAK TANAH WOK!',
    category: 'pixels',
    tags: ['POSTER', 'TIPOGRAFI', 'POP'],
    description: 'Conceptual illustration set against a contrasting red background, framing a plated dish surrounded by flames. It carries a narrative about grounding ideas, social realism, and the fiery energy of local cultural roots.',
    featured: true,
    link: 'https://www.instagram.com/p/DekmvToEzYP/?img_index=1',
    preview: '/assets/images/napak-tanah.png',
    year: '2025',
    role: 'ILLUSTRATOR & TYPOGRAPHER',
    problem: 'Visualizing the tension between grounded everyday survival and local cultural heat without falling into nostalgic clichés.',
    architecture: 'High-saturation crimson ground paired with stark focal framing, custom display lettering, and graphic flame motifs.',
    deliverables: [
      'Key Visual Poster Artwork',
      'Custom Display Title Typography',
      'Social Editorial Series',
    ],
  },

  {
    id: 'sori-ye',
    title: 'SORI YE!',
    category: 'pixels',
    tags: ['POSTER', 'VECTOR', 'POLITICAL'],
    description: 'A political and pop-culture satire piece featuring an iconic figure framed by roaring flames and signature speech bubbles, blending vintage comic book aesthetics with acute contemporary critique.',
    featured: false,
    link: 'https://www.instagram.com/p/Ddn8zkcGHz7/?img_index=1',
    preview: '/assets/images/soriye.png',
    year: '2025',
    role: 'GRAPHIC DESIGNER & ILLUSTRATOR',
    problem: 'Delivering sharp political satire in a visual language that cuts through passive social feeds immediately.',
    architecture: 'Vintage comic-book halftone dots, heavy vector ink contours, and bold speech-bubble framing built for instant visual punch.',
    deliverables: [
      'Satirical Vector Poster',
      'Print-Ready High-Contrast Master',
      'Digital Release Assets',
    ],
  },

  {
    id: 'akarkarsa',
    title: 'Akarkarsa Visual Identity',
    category: 'pixels',
    tags: ['BRANDING', 'EMBROIDERY', 'VISUAL IDENTITY'],
    description: 'Visual identity and embroidered emblem design for the Akarkarsa organization. Featuring a sapling illustration embraced by two hands in a deep blue and forest green palette, symbolizing sustainable growth, environmental care, and grassroots collaboration.',
    featured: false,
    link: 'https://667-portfolio.vercel.app/error',
    preview: '/assets/images/akarkarsa.png',
    year: '2025',
    role: 'BRAND & EMBLEM DESIGNER',
    problem: 'Creating an organizational emblem readable both on digital screens and when translated into physical thread embroidery on apparel.',
    architecture: 'Controlled line weights, simplified negative space, and a two-tone deep blue and forest green palette engineered specifically for stitch density.',
    deliverables: [
      'Primary Organizational Emblem',
      'Embroidery-Ready Vector Specification',
      'Color & Brand Usage Guidelines',
    ],
  },

  {
    id: 'makan-tai',
    title: 'MAKAN T*I!',
    category: 'pixels',
    tags: ['LYRICAL', 'SATIRE', 'ILLUSTRATION'],
    description: 'A bold, provocative satirical illustration combining vibrant red typography with expressive character design to deliver a sharp yet humorous social commentary.',
    featured: false,
    link: 'https://www.instagram.com/p/C_ueAefy53y/',
    preview: '/assets/images/makantai.webp',
    year: '2024',
    role: 'ILLUSTRATOR & LETTERING ARTIST',
    problem: 'Capturing unfiltered street-level frustration through blunt humor and confrontational graphic composition.',
    architecture: 'Distorted character proportions locked against oversized red display lettering for immediate visual impact.',
    deliverables: [
      'Editorial Satire Illustration',
      'Custom Poster Typography',
    ],
  },

  {
    id: 'mulai-sekarang',
    title: 'MULAI SEKARANG',
    category: 'pixels',
    tags: ['TIPOGRAFI', 'HINDIA', 'LYRICAL'],
    description: 'Street-style hand-lettered typography exploration set in a monochromatic blue palette, inspired by the lyric lines of Hindia song "Satu Hari Lagi". This piece merges fluid text flow with an introspective mindset to evoke personal urgency and self-reflection.',
    featured: false,
    link: 'https://www.instagram.com/p/C7wTvncSjdd/',
    preview: '/assets/images/mulaisekarang.jpg',
    year: '2024',
    role: 'TYPOGRAPHER & VISUAL ARTIST',
    problem: 'Translating the quiet urgency of Hindia’s "Satu Hari Lagi" lyrics into a typographic piece that feels rhythmic rather than static.',
    architecture: 'Fluid hand-lettered strokes interlocked across a monochromatic cobalt palette to guide eye movement line by line.',
    deliverables: [
      'Custom Hand-Lettered Poster',
      'Monochromatic Color Study',
    ],
  },

  {
    id: 'siksa-kubur',
    title: 'SIKSA KUBUR',
    category: 'pixels',
    tags: ['MOVIE POSTER', 'DARK ART', 'HORROR'],
    description: 'An alternative cinematic poster design using a tense, dark-red monotone palette. It highlights psychological tension and fragmented character visuals to capture an intimate, grim horror atmosphere. (Approved by Joko Anwar himself.)',
    featured: false,
    link: 'https://www.instagram.com/p/C6JBTPZLS22/?img_index=1',
    preview: '/assets/images/siksakubur.webp',
    year: '2024',
    role: 'KEY ART & POSTER DESIGNER',
    problem: 'Reimagining the theatrical key art for Siksa Kubur with a focus on claustrophobic psychological dread over standard horror tropes.',
    architecture: 'Fragmented character silhouettes submerged in a dark-crimson monotone grade with distressed billing typography—acknowledged directly by director Joko Anwar.',
    deliverables: [
      'Alternative Theatrical Poster Key Art',
      'Custom Title Treatment & Billing Block',
    ],
  },

  {
    id: 'doom-scrolling',
    title: 'IN THE PALM OF OUR HAND',
    category: 'pixels',
    tags: ['ILLUSTRATION', 'RETRO POP', 'GRAPHIC DESIGN'],
    description: 'An illustration centered around the relationship between humanity and modern digital technology. Depicting a figure surrounded by gadgets and global connectivity within a retro-pop streetwear archive color palette, highlighting how our world rests in the palms of the digital age.',
    featured: false,
    link: 'https://www.instagram.com/p/DbOB1vkGPGi/?img_index=1',
    preview: '/assets/images/theworlds.jpg',
    year: '2024',
    role: 'ILLUSTRATOR & GRAPHIC DESIGNER',
    problem: 'Depicting hyper-connectivity and screen dependency without resorting to sterile blue-circuit sci-fi clichés.',
    architecture: 'Retro-pop streetwear archive palette combined with dense foreground-background framing of hardware artifacts.',
    deliverables: [
      'Editorial Concept Illustration',
      'Apparel & Print-Ready Artwork',
    ],
  },

  {
    id: 'amoliva',
    title: 'AMOLIVA - Product Branding',
    category: 'pixels',
    tags: ['ART DIRECTION', 'PRODUCT BRANDING', 'CAMPAIGN VISUAL'],
    description: 'Atmospheric product visual for Amoliva, a natural hair oil venture formulated with pumpkin seed oil and an eight-spices blend. Serving as the Art Director, this piece explores a moody, cinematic aesthetic with soft, diffused lighting to evoke natural care, organic purity, and an intimate sensory experience.',
    featured: false,
    link: 'https://www.instagram.com/p/DZejGQPO0JN/',
    preview: '/assets/videos/amoliva.mp4',
    year: '2026',
    role: 'ART DIRECTOR & PACKAGING DESIGNER',
    problem: 'Positioning a botanical pumpkin-seed and 8-spice hair oil away from generic herbal packaging toward an apothecary-grade visual identity.',
    architecture: 'Low-key chiaroscuro lighting, tactile bottle label typography, and moody botanical staging across product renders and campaign motion.',
    deliverables: [
      'Brand Art Direction & Visual Identity',
      'Bottle Label & Packaging Mockups',
      'Commercial Campaign Motion & Storyboards',
    ],
  },
  
  {
    id: 'whiplash',
    title: 'WHIPLASH',
    category: 'pixels',
    tags: ['EDITORIAL DESIGN', 'POSTER', 'MOTION GRAPHIC'],
    description: 'A conceptual editorial poster study inspired by the intense psychological drama Whiplash. Emphasizing bold typography, high-contrast monochrome tones, and raw emotional expressions to capture the grit, pressure, and relentless pursuit of perfection.',
    featured: false,
    link: 'https://www.instagram.com/p/C3xXUhdrC1s/?img_index=1',
    preview: '/assets/videos/whiplash.mp4',
    year: '2024',
    role: 'EDITORIAL & MOTION DESIGNER',
    problem: 'Visualizing acoustic tempo, obsession, and psychological pressure through static grid tension and kinetic motion.',
    architecture: 'Hard-edged monochrome contrast, Swiss-inspired typographic alignment, and percussive motion timing synced to jazz drum cadences.',
    deliverables: [
      'Editorial Poster Study',
      'Kinetic Typography Motion Loop',
    ],
  },
];