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

    // Duplicate messages to create seamless loop
    const messages = [...encouragingMessages, ...encouragingMessages];
    marquee.innerHTML = messages.map(msg => `<span>${msg}</span>`).join(' ');

    // Randomize starting position
    const randomStart = Math.floor(Math.random() * encouragingMessages.length);
    marquee.scrollLeft = randomStart * 300; // Approximate width per message

    // Animation logic
    let animationFrame: number;
    const animate = () => {
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft -= marquee.scrollWidth / 2;
      } else {
        marquee.scrollLeft += 1;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee} ref={marqueeRef}></div>
    </div>
  );
}