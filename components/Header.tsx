// components/Header.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import AuthButton from './AuthButton';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
          <Image
            src="/favicon.ico"
            alt="SerenitySpace Logo"
            width={24}
            height={24}
            className={styles.logoIcon}
          />
          <Link href="/" className={styles.logo}>
            SerenitySpace
          </Link>
        </div>
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
        </button>
        <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.logo} праці
              SerenitySpace
            </Link>
            <button className={styles.closeButton} onClick={toggleMenu} aria-label="Close menu">
              <X className={styles.icon} />
            </button>
          </div>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink} onClick={toggleMenu}>
              🏠 Home
            </Link>
            <Link href="/forum" className={styles.navLink} onClick={toggleMenu}>
              📋 Forum
            </Link>
            <Link href="/chat" className={styles.navLink} onClick={toggleMenu}>
              💬 Chat
            </Link>
            <Link href="/topics" className={styles.navLink} onClick={toggleMenu}>
              🗂️ Topics
            </Link>
            <Link href="/help" className={styles.navLink} onClick={toggleMenu}>
              ❓ Help
            </Link>
            <Link href="/rules" className={styles.navLink} onClick={toggleMenu}>
              📜 Rules
            </Link>
            <Link href="/privacy" className={styles.navLink} onClick={toggleMenu}>
              🔒 Privacy Policy
            </Link>
            <Link href="/user-agreement" className={styles.navLink} onClick={toggleMenu}>
              🤝 User Agreement
            </Link>
          </div>
          <div className={styles.authContainer}>
            <AuthButton />
          </div>
        </div>
        {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
      </nav>
    </motion.header>
  );
}