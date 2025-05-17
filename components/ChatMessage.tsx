// components/ChatMessage.tsx
'use client';
import { Message } from '@/lib/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="listitem"
      aria-label={`Message from ${isCurrentUser ? 'you' : displayName}`}
    >
      <div
        className={`max-w-[70%] p-4 rounded-xl shadow-sm ${
          isCurrentUser
            ? 'bg-teal-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-base break-words">{message.text}</p>
        <span
          className={`text-xs ${
            isCurrentUser ? 'text-teal-100' : 'text-gray-500'
          } block mt-1 text-right`}
        >
          {displayName} • {timestamp}
        </span>
      </div>
    </motion.div>
  );
}