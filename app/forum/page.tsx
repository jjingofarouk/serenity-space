'use client';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/firestore';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Marquee from '@/components/Marquee';
import styles from './page.module.css';

export default function Forum() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Marquee />
      <div className={styles.header}>
        <h1 className={styles.title}>Forum</h1>
        <Link href="/forum/new">
          <Button
            className={styles.button}
            aria-label="Create new post"
          >
            New Post
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.posts}>
          {posts?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}