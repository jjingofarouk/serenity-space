// components/CommentSection.tsx
'use client';
import { useState, useEffect } from 'react';
import { getComments } from '@/lib/firestore';
import { Comment } from '@/lib/types';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import styles from './CommentSection.module.css';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getComments(postId, (fetchedComments, err) => {
      setLoading(false);
      if (err) {
        setError(err);
        setComments([]);
      } else {
        setError(null);
        setComments(fetchedComments);
      }
    });
    return () => unsubscribe();
  }, [postId]);

  if (loading) {
    return <p className={styles.loading}>Loading comments...</p>;
  }

  if (error) {
    return (
      <p className={styles.error}>
        Failed to load comments: {error}.{' '}
        <a
          href="https://console.firebase.google.com/v1/r/project/serenity-space-52d85/firestore/indexes?create_composite=ClVwcm9qZWN0cy9zZXJlbml0eS1zcGFjZS01MmQ4NS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvY29tbWVudHMvaW5kZXhlcy9fEAEaCgoGcG9zdElkEAEaDQoJY3JlYXRlZEF0EAEaDAoIX19uYW1lX18QAQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create the required index
        </a>
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comments</h3>
      {comments.length === 0 ? (
        <p className={styles.noComments}>No comments yet.</p>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <p>{comment.text}</p>
              <p className={styles.meta}>
                Posted by {comment.userId} on{' '}
                {comment.createdAt instanceof Timestamp
                  ? format(comment.createdAt.toDate(), 'MMM d, yyyy')
                  : format(new Date(comment.createdAt), 'MMM d, yyyy')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}