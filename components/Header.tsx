// components/Header.tsx
'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Leaf className={styles.logoIcon} />
          <Link href="/" className={styles.logo}>
            SerenitySpace
          </Link>
        </div>
        <div className={styles.navLinks}>
          <div className={styles.linkGroup}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/forum" className={styles.navLink}>
              Forum
            </Link>
            <Link href="/chat" className={styles.navLink}>
              Chat
            </Link>
          </div>
          <AuthButton />
        </div>
      </nav>
    </motion.header>
  );
}