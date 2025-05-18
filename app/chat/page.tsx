'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { addMessage } from '@/lib/firestore';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { Send, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis());
      setMessages(updatedMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;
    try {
      await addMessage({
        text: newMessage,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MessageCircle size={24} />
        <h1>Community Thread</h1>
      </motion.div>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div
            className={styles.chatContainer}
            role="log"
            aria-live="polite"
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage message={msg} currentUserId={user?.uid} />
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          {user ? (
            <form onSubmit={handleSend} className={styles.form}>
              <div className={styles.inputWrapper}>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Add to the thread..."
                  className={styles.textarea}
                  rows={2}
                  aria-label="Thread input"
                />
                <Button
                  type="submit"
                  className={styles.sendButton}
                  disabled={!newMessage.trim()}
                  aria-label="Post to thread"
                >
                  <Send size={18} />
                </Button>
              </div>
            </form>
          ) : (
            <motion.p
              className={styles.signInPrompt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Please{' '}
              <Link href="/login" className={styles.signInLink}>
                sign in
              </Link>{' '}
              to join the thread.
            </motion.p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}