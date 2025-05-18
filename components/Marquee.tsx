'use client';
import { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

const encouragingMessages = [
  "It's never too late to start anew.",
  "You are stronger than you know.",
  "Every step forward counts.",
  "Your journey is uniquely yours.",
  "Breathe, you're doing great.",
  "Hope is always within reach.",
  "You are enough just as you are.",
  "Small progress is still progress.",
  "You have the power to change.",
  "Today is a fresh start.",
  "Your feelings are valid.",
  "Keep going, you've got this.",
  "One day at a time is enough.",
  "You are not alone in this.",
  "Your courage inspires others.",
  "Healing takes time, be patient.",
  "You are capable of great things.",
  "Your story isn't over yet.",
  "Embrace your inner strength.",
  "Every moment is a new chance."
];

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Shuffle messages for random order
    const shuffledMessages = [...encouragingMessages].sort(() => Math.random() - 0.5);
    // Create two sets of messages for seamless looping
    marquee.innerHTML = [...shuffledMessages, ...shuffledMessages]
      .map(msg => `<span>${msg}</span>`)
      .join(' ');

    // CSS handles the smooth animation
    const totalWidth = shuffledMessages.length * 300; // Approximate width per message
    marquee.style.setProperty('--marquee-width', `${totalWidth}px`);
    marquee.style.setProperty('--marquee-duration', `${totalWidth / 50}s`); // Adjust speed

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