// components/PostCard.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Post } from '@/lib/types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import styles from './PostCard.module.css';

export default function PostCard({ post }: { post: Post }) {
  const createdAt = post.createdAt instanceof Timestamp
    ? format(post.createdAt.toDate(), 'MMM d, yyyy')
    : format(post.createdAt, 'MMM d, yyyy');

  return (
    <motion.div
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
            Posted by User {post.userId} on {createdAt}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}