// components/Header.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, Home, Clipboard, MessageSquare, Folder, HelpCircle, FileText, Lock, Handshake, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { useAuth } from '@/lib/auth';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOutUser } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toggleMenu();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
          <div className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/forum" className={styles.navLink}>
              Forum
            </Link>
            <Link href="/chat" className={styles.navLink}>
              Chat
            </Link>
            <Link href="/topics" className={styles.navLink}>
              Topics
            </Link>
            <Link href="/help" className={styles.navLink}>
              Help
            </Link>
            {user ? (
              <button onClick={signOutUser} className={styles.navLink} aria-label="Log out">
                Logout
              </button>
            ) : (
              <Link href="/login" className={styles.navLink}>
                Login
              </Link>
            )}
          </div>
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
            <Link href="/" className={styles.sidebarLink} onClick={toggleMenu}>
              <Home className={styles.icon} size={16} /> Home
            </Link>
            <Link href="/forum" className={styles.sidebarLink} onClick={toggleMenu}>
              <Clipboard className={styles.icon} size={16} /> Forum
            </Link>
            <Link href="/chat" className={styles.sidebarLink} onClick={toggleMenu}>
              <MessageSquare className={styles.icon} size={16} /> Chat
            </Link>
            <Link href="/topics" className={styles.sidebarLink} onClick={toggleMenu}>
              <Folder className={styles.icon} size={16} /> Topics
            </Link>
            <Link href="/help" className={styles.sidebarLink} onClick={toggleMenu}>
              <HelpCircle className={styles.icon} size={16} /> Help
            </Link>
            <Link href="/rules" className={styles.sidebarLink} onClick={toggleMenu}>
              <FileText className={styles.icon} size={16} /> Rules
            </Link>
            <Link href="/privacy" className={styles.sidebarLink} onClick={toggleMenu}>
              <Lock className={styles.icon} size={16} /> Privacy Policy
            </Link>
            <Link href="/user-agreement" className={styles.sidebarLink} onClick={toggleMenu}>
              <Handshake className={styles.icon} size={16} /> User Agreement
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className={styles.sidebarLink}
                aria-label="Log out"
              >
                <LogOut className={styles.icon} size={16} /> Logout
              </button>
            ) : (
              <Link href="/login" className={styles.sidebarLink} onClick={toggleMenu}>
                <LogIn className={styles.icon} size={16} /> Login
              </Link>
            )}
          </div>
        </div>
        {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
      </nav>
    </motion.header>
  );
}