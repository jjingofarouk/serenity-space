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

    const totalWidth = shuffledMessages.length * 200;
    marquee.style.setProperty('--marquee-width', `${totalWidth}px`);
    marquee.style.setProperty('--marquee-duration', `${totalWidth / 40}s`);

    return () => {
      marquee.innerHTML = '';
    };
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee} ref={marqueeRef}></div>
    </div>
  );
}