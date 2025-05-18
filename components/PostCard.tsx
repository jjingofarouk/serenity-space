import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Post } from '@/lib/types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './PostCard.module.css';

export default function PostCard({ post }: { post: Post }) {
  const [displayName, setDisplayName] = useState('Unknown User');
  const createdAt = post.createdAt instanceof Timestamp
    ? format(post.createdAt.toDate(), 'MMM d, yyyy')
    : format(post.createdAt, 'MMM d, yyyy');

  useEffect(() => {
    const fetchDisplayName = async () => {
      const userRef = doc(db, 'users', post.userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName || 'Unknown User');
      }
    };
    fetchDisplayName();
  }, [post.userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={styles.motionWrapper}
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
        </CardContent>
      </Card>
    </motion.div>
  );
}