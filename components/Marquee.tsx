// components/Marquee.tsx
'use client';
import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';
import { encouragingMessages } from '@/lib/encouragingMessages';

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const shuffledMessages = [...encouragingMessages].sort(() => Math.random() - 0.5);

    marquee.innerHTML = [...shuffledMessages, ...shuffledMessages]
      .map(msg => `<span>${msg}</span>`)
      .join(' ');

    const totalWidth = shuffledMessages.length * 300;
    marquee.style.setProperty('--marquee-width', `${totalWidth}px`);
    marquee.style.setProperty('--marquee-duration', `${totalWidth / 50}s`);

    const handleMouseEnter = () => marquee.style.animationPlayState = 'paused';
    const handleMouseLeave = () => marquee.style.animationPlayState = 'running';
    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      marquee.innerHTML = '';
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee} ref={marqueeRef}></div>
    </div>
  );
}