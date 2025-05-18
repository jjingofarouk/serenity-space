// components/PostCard.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { addComment, addReaction, removeReaction, getReactions } from '@/lib/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion } from 'framer-motion';
import styles from './PostCard.module.css';

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp | Date;
}

export default function PostCard({ post }: { post: Post }) {
  const [displayName, setDisplayName] = useState('Unknown User');
  const { user } = useAuth();
  const [reactions, setReactions] = useState<{
    love: number;
    like: number;
    support: number;
    userReaction?: 'love' | 'like' | 'support';
  }>({
    love: 0,
    like: 0,
    support: 0,
  });
  const [showQuickComments, setShowQuickComments] = useState(false);
  const quickCommentOptions = ['I love this!', 'This is inspiring!', 'You’re not alone!', 'Thanks for sharing!'];

  useEffect(() => {
    const fetchDisplayName = async () => {
      const userRef = doc(db, 'users', post.userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName || 'Unknown User');
      }
    };
    fetchDisplayName();

    const fetchReactions = async () => {
      const reactionData = await getReactions(post.id);
      setReactions(reactionData);
    };
    fetchReactions();
  }, [post.id, post.userId]);

  const handleReaction = async (reactionType: 'love' | 'like' | 'support') => {
    if (!user) {
      alert('Please sign in to react.');
      return;
    }
    try {
      if (reactions.userReaction === reactionType) {
        await removeReaction(post.id, user.uid);
        setReactions((prev) => ({
          ...prev,
          [reactionType]: prev[reactionType] - 1,
          userReaction: undefined,
        }));
      } else {
        await addReaction(post.id, user.uid, reactionType);
        setReactions((prev) => {
          const newReactions = { ...prev };
          if (prev.userReaction) {
            newReactions[prev.userReaction] = prev[prev.userReaction] - 1;
          }
          newReactions[reactionType] = prev[reactionType] + 1;
          newReactions.userReaction = reactionType;
          return newReactions;
        });
      }
    } catch (error: any) {
      console.error('Failed to update reaction:', error);
      alert('Failed to update reaction.');
    }
  };

  const handleQuickComment = async (text: string) => {
    if (!user) {
      alert('Please sign in to comment.');
      return;
    }
    try {
      await addComment({
        postId: post.id,
        text,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setShowQuickComments(false);
    } catch (error: any) {
      console.error('Failed to add quick comment:', error);
      alert('Failed to add comment.');
    }
  };

  const createdAt = post.createdAt instanceof Timestamp
    ? format(post.createdAt.toDate(), 'MMM d, yyyy')
    : format(post.createdAt, 'MMM d, yyyy');

  return (
    <motion.div
      className={styles.motionWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>
            <Link href={`/forum/${post.id}`} className={styles.titleLink}>
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <p className={styles.content}>{post.content}</p>
          <p className={styles.meta}>
            Posted by {displayName} on {createdAt}
          </p>
          <div className={styles.actions}>
            <button
              className={`${styles.reactionButton} ${reactions.userReaction === 'love' ? styles.active : ''}`}
              onClick={() => handleReaction('love')}
              aria-label="Love reaction"
            >
              ❤️ {reactions.love > 0 ? reactions.love : ''}
            </button>
            <button
              className={`${styles.reactionButton} ${reactions.userReaction === 'like' ? styles.active : ''}`}
              onClick={() => handleReaction('like')}
              aria-label="Like reaction"
            >
              👍 {reactions.like > 0 ? reactions.like : ''}
            </button>
            <button
              className={`${styles.reactionButton} ${reactions.userReaction === 'support' ? styles.active : ''}`}
              onClick={() => handleReaction('support')}
              aria-label="Support reaction"
            >
              🤗 {reactions.support > 0 ? reactions.support : ''}
            </button>
            <button
              className={styles.quickCommentButton}
              onClick={() => setShowQuickComments(!showQuickComments)}
              aria-label="Toggle quick comments"
            >
              Quick Comment
            </button>
            {showQuickComments && (
              <div className={styles.quickCommentMenu}>
                {quickCommentOptions.map((option) => (
                  <button
                    key={option}
                    className={styles.quickCommentOption}
                    onClick={() => handleQuickComment(option)}
                    aria-label={`Post quick comment: ${option}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}