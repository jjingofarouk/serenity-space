// app/forum/[postId]/page.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/firestore';
import CommentSection from '@/components/CommentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';

export default function PostPage({ params }: { params: { postId: string } }) {
  const [displayName, setDisplayName] = useState('Unknown User');
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPost(params.postId),
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
    }
  }, [post]);

  if (isLoading) {
    return (
      <p className={styles.loading}>Loading...</p>
    );
  }
  if (!post) {
    return (
      <p className={styles.error}>Post not found.</p>
    );
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
          <CommentSection postId={params.postId} />
        </CardContent>
      </Card>
    </motion.div>
  );
}