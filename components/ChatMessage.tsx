// components/ChatMessage.tsx
'use client';
import { Message } from '@/lib/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: Message;
  currentUserId?: string;
}

export default function ChatMessage({ message, currentUserId }: ChatMessageProps) {
  const isCurrentUser = message.userId === currentUserId;
  const timestamp = message.createdAt instanceof Timestamp
    ? format(message.createdAt.toDate(), 'HH:mm')
    : format(new Date(message.createdAt), 'HH:mm');

  return (
    <motion.div
      className={`${styles.messageContainer} ${isCurrentUser ? styles.messageRight : styles.messageLeft}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="listitem"
      aria-label={`Message from ${isCurrentUser ? 'you' : 'another user'}`}
    >
      <div
        className={`${styles.message} ${isCurrentUser ? styles.messageCurrentUser : styles.messageOtherUser}`}
      >
        <p className={styles.messageText}>{message.text}</p>
        <span className={`${styles.timestamp} ${isCurrentUser ? styles.timestampCurrentUser : styles.timestampOtherUser}`}>
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
}