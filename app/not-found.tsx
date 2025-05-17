// app/not-found.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import styles from './styles/not-found.module.css';

export default function NotFound() {
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
            <Home className={styles.icon} />
            Page Not Found
          </CardTitle>
          <p className={styles.subtitle}>
            The page you’re looking for doesn’t exist.
          </p>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <p className={styles.description}>
            It seems you’ve wandered off the path. Let’s get you back to SerenitySpace.
          </p>
          <Link href="/" className={styles.buttonPrimary}>
            Return to Home
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}