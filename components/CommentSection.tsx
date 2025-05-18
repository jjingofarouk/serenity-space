'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { addComment, getComments } from '@/lib/firestore';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import styles from './CommentSection.module.css';

interface Comment {
  id: string;
  postId: string;
  text: string;
  userId: string;
  createdAt: Timestamp | Date;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<(Comment & { displayName: string })[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = getComments(postId, async (comments) => {
      const enrichedComments = await Promise.all(
        comments.map(async (comment) => {
          const userRef = doc(db, 'users', comment.userId);
          const userDoc = await getDoc(userRef);
          const displayName = userDoc.exists() ? userDoc.data().displayName : 'Anonymous';
          return { ...comment, displayName };
        })
      );
      setComments(enrichedComments);
    });
    return () => unsubscribe();
  }, [postId]);

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
      <div className={styles.commentsList}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              className={styles.comment}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.commentHeader}>
                <span className={styles.displayName}>{comment.displayName}</span>
                <span className={styles.timestamp}>
                  {formatDistanceToNow(comment.createdAt instanceof Timestamp ? comment.createdAt.toDate() : comment.createdAt, {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </motion.div>
          ))
        ) : (
          <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
        )}
      </div>
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
          <Link href="/login" className={styles.signInLink}>
            sign in
          </Link>{' '}
          to comment.
        </p>
      )}
    </motion.div>
  );
}