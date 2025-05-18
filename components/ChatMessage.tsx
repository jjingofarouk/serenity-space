'use client';
import { Message } from '@/lib/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: Message;
  currentUserId?: string;
}

export default function ChatMessage({ message, currentUserId }: ChatMessageProps) {
  const [displayName, setDisplayName] = useState('Unknown User');
  const isCurrentUser = message.userId === currentUserId;
  const timestamp = message.createdAt instanceof Timestamp
    ? format(message.createdAt.toDate(), 'HH:mm')
    : format(new Date(message.createdAt), 'HH:mm');

  useEffect(() => {
    const fetchDisplayName = async () => {
      const userRef = doc(db, 'users', message.userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName || 'Unknown User');
      }
    };
    fetchDisplayName();
  }, [message.userId]);

  return (
    <motion.div
      className={`${styles.messageContainer} ${isCurrentUser ? styles.messageRight : styles.messageLeft}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="listitem"
      aria-label={`Message from ${isCurrentUser ? 'you' : displayName}`}
    >
      <div
        className={`${styles.message} ${isCurrentUser ? styles.messageCurrentUser : styles.messageOtherUser}`}
      >
        <p className={styles.messageText}>{message.text}</p>
        <span
          className={`${styles.timestamp} ${isCurrentUser ? styles.timestampCurrentUser : styles.timestampOtherUser}`}
        >
          {displayName} • {timestamp}
        </span>
      </div>
    </motion.div>
  );
}