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
    // Display one message at a time with fade effect
    let currentIndex = 0;

    const updateMessage = () => {
      marquee.innerHTML = `<span>${shuffledMessages[currentIndex]}</span>`;
      currentIndex = (currentIndex + 1) % shuffledMessages.length;
    };

    updateMessage(); // Initial message
    const interval = setInterval(updateMessage, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee} ref={marqueeRef}></div>
    </div>
  );
}