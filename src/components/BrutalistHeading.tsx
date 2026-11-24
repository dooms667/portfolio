'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BrutalistHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function BrutalistHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: BrutalistHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.word-unit', {
        yPercent: 115,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    }, headingRef);

    return () => ctx.revert();
  }, [children]);

  const words = children.split(' ');

  return (
    <Tag ref={headingRef} className={className}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0"
        >
          <span className="word-unit inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}