// components/CommentSection.tsx
'use client';
import { useState, useEffect } from 'react';
import { getComments, addComment } from '@/lib/firestore';
import { Comment } from '@/lib/types';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './CommentSection.module.css';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const [userDisplayNames, setUserDisplayNames] = useState<{ [key: string]: string }>({});

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

  useEffect(() => {
    const fetchDisplayNames = async () => {
      const uniqueUserIds = [...new Set(comments.map((comment) => comment.userId))];
      const displayNames: { [key: string]: string } = {};
      for (const userId of uniqueUserIds) {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        displayNames[userId] = userDoc.exists() ? userDoc.data().displayName || 'Unknown User' : 'Unknown User';
      }
      setUserDisplayNames(displayNames);
    };
    if (comments.length > 0) {
      fetchDisplayNames();
    }
  }, [comments]);

  const handleAddComment = async () => {
    if (!user) {
      alert('Please sign in to comment.');
      return;
    }
    if (!newComment.trim()) {
      alert('Comment cannot be empty.');
      return;
    }
    try {
      await addComment({
        postId,
        text: newComment,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setNewComment('');
    } catch (error: any) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment.');
    }
  };

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
      {user && (
        <div className={styles.commentForm}>
          <textarea
            className={styles.commentInput}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            rows={3}
          />
          <button
            className={styles.submitButton}
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </div>
      )}
      {comments.length === 0 ? (
        <p className={styles.noComments}>No comments yet.</p>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <p>{comment.text}</p>
              <p className={styles.meta}>
                Posted by {userDisplayNames[comment.userId] || 'Unknown User'} on{' '}
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