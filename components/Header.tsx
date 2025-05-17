'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, Home, Clipboard, MessageSquare, Folder, HelpCircle, FileText, Lock, Handshake, Sun, Moon, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
        <div className={styles.controls}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
          </button>
        </div>
        <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.logo}>
              SerenitySpace
            </Link>
            <button className={styles.closeButton} onClick={toggleMenu} aria-label="Close menu">
              <X className={styles.icon} />
            </button>
          </div>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink} onClick={toggleMenu}>
              <Home className={styles.icon} size={16} /> Home
            </Link>
            <Link href="/forum" className={styles.navLink} onClick={toggleMenu}>
              <Clipboard className={styles.icon} size={16} /> Forum
            </Link>
            <Link href="/chat" className={styles.navLink} onClick={toggleMenu}>
              <MessageSquare className={styles.icon} size={16} /> Chat
            </Link>
            <Link href="/topics" className={styles.navLink} onClick={toggleMenu}>
              <Folder className={styles.icon} size={16} /> Topics
            </Link>
            <Link href="/help" className={styles.navLink} onClick={toggleMenu}>
              <HelpCircle className={styles.icon} size={16} /> Help
            </Link>
            <Link href="/rules" className={styles.navLink} onClick={toggleMenu}>
              <FileText className={styles.icon} size={16} /> Rules
            </Link>
            <Link href="/privacy" className={styles.navLink} onClick={toggleMenu}>
              <Lock className={styles.icon} size={16} /> Privacy Policy
            </Link>
            <Link href="/user-agreement" className={styles.navLink} onClick={toggleMenu}>
              <Handshake className={styles.icon} size={16} /> User Agreement
            </Link>
            <Link href="/login" className={styles.navLink} onClick={toggleMenu}>
              <LogIn className={styles.icon} size={16} /> Login
            </Link>
            <button
              onClick={toggleTheme}
              className={styles.navLink}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className={styles.icon} size={16} /> : <Sun className={styles.icon} size={16} />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
        {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
      </nav>
    </motion.header>
  );
}