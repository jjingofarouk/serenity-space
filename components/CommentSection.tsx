// components/CommentSection.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { addComment, getComments } from '@/lib/firestore';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CommentSection.module.css';

interface Comment {
  id: string;
  postId: string;
  text: string;
  userId: string;
  createdAt: Timestamp | Date;
  displayName?: string;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    console.log('Listening for comments on postId:', postId);
    const unsubscribe = getComments(postId, async (rawComments) => {
      console.log('Raw comments from Firestore:', rawComments);
      const enrichedComments = await Promise.all(
        rawComments.map(async (comment) => {
          try {
            const userRef = doc(db, 'users', comment.userId);
            const userDoc = await getDoc(userRef);
            const displayName = userDoc.exists() ? userDoc.data().displayName || 'Anonymous' : 'Anonymous';
            return { ...comment, displayName };
          } catch (error) {
            console.error(`Error fetching user ${comment.userId}:`, error);
            return { ...comment, displayName: 'Anonymous' };
          }
        })
      );
      console.log('Enriched comments:', enrichedComments);
      setComments(enrichedComments);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting comment:', { postId, text: comment, userId: user?.uid });
    if (!user || !comment.trim()) {
      console.log('Submit blocked: user or comment missing');
      return;
    }
    try {
      await addComment({
        postId,
        text: comment,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setComment('');
      console.log('Comment submitted successfully');
    } catch (error: any) {
      console.error('Failed to add comment:', error.code, error.message);
      alert(`Failed to add comment: ${error.message}`);
    }
  };

  return (
    <motion.div
      className={styles.commentSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.title}>Comments</h3>
      <div className={styles.commentsContainer}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              className={styles.commentCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.commentHeader}>
                <span className={styles.displayName}>{comment.displayName || 'Anonymous'}</span>
                <span className={styles.timestamp}>
                  {formatDistanceToNow(
                    comment.createdAt instanceof Timestamp ? comment.createdAt.toDate() : comment.createdAt,
                    { addSuffix: true }
                  )}
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
            className={styles.submitButton}
            disabled={!comment.trim()}
            aria-label="Submit comment"
          >
            Comment
          </Button>
        </form>
      ) : (
        <p className={styles.signInPrompt}>
          Please <Link href="/login" className={styles.signInLink}>sign in</Link> to comment.
        </p>
      )}
    </motion.div>
  );
}