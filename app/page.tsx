// app/page.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import styles from './styles/page.module.css';

export default function Home() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>
            <Leaf className={styles.icon} />
            Welcome to SerenitySpace
          </CardTitle>
          <p className={styles.subtitle}>
            A warm, safe haven to share and find support.
          </p>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <p className={styles.description}>
            Connect with others, share your thoughts, and discover a community that cares.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/forum" className={styles.buttonPrimary}>
              Explore Forum
            </Link>
            <Link href="/chat" className={styles.buttonSecondary}>
              Join Chat
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}