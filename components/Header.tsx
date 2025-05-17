// components/Header.tsx
'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        <button className={styles.hamburger} onClick={toggleMenu}>
          {isOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
        </button>
        <div className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <div className={styles.linkGroup}>
            <Link href="/" className={styles.navLink} onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/forum" className={styles.navLink} onClick={toggleMenu}>
              Forum
            </Link>
            <Link href="/chat" className={styles.navLink} onClick={toggleMenu}>
              Chat
            </Link>
          </div>
          <AuthButton />
        </div>
      </nav>
    </motion.header>
  );
}