// components/CommentSection.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { addComment } from '@/lib/firestore';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import styles from './CommentSection.module.css';

export default function CommentSection({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    try {
      await addComment({
        postId,
        text: comment,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.title}>Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className={styles.textarea}
            rows={4}
            aria-label="Comment input"
          />
          <Button
            type="submit"
            className={styles.button}
            disabled={!comment.trim()}
            aria-label="Submit comment"
          >
            Comment
          </Button>
        </form>
      ) : (
        <p className={styles.signInPrompt}>
          Please{' '}
          <a href="/login" className={styles.signInLink}>
            sign in
          </a>{' '}
          to comment.
        </p>
      )}
    </motion.div>
  );
}