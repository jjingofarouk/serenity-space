// app/forum/[postId]/page.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { getPost, getReactions, addReaction, removeReaction } from '@/lib/firestore';
import CommentSection from '@/components/CommentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import styles from './page.module.css';

export default function PostPage({ params }: { params: { postId: string } }) {
  const [displayName, setDisplayName] = useState('Unknown User');
  const { user } = useAuth();
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPost(params.postId),
  });
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

  useEffect(() => {
    if (post) {
      const fetchDisplayName = async () => {
        const userRef = doc(db, 'users', post.userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || 'Unknown User');
        }
      };
      fetchDisplayName();

      const fetchReactions = async () => {
        const reactionData = await getReactions(params.postId, user?.uid);
        setReactions(reactionData);
      };
      fetchReactions();
    }
  }, [post, params.postId, user]);

  const handleReaction = async (reactionType: 'love' | 'like' | 'support') => {
    if (!user) {
      alert('Please sign in to react.');
      return;
    }
    try {
      if (reactions.userReaction === reactionType) {
        await removeReaction(params.postId, user.uid);
        setReactions((prev) => ({
          ...prev,
          [reactionType]: prev[reactionType] - 1,
          userReaction: undefined,
        }));
      } else {
        await addReaction(params.postId, user.uid, reactionType);
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

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }
  if (!post) {
    return <p className={styles.error}>Post not found.</p>;
  }

  const createdAt = post.createdAt instanceof Timestamp
    ? format(post.createdAt.toDate(), 'MMM d, yyyy')
    : format(new Date(post.createdAt), 'MMM d, yyyy');

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>{post.title}</CardTitle>
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
          </div>
          <CommentSection postId={params.postId} />
        </CardContent>
      </Card>
    </motion.div>
  );
}