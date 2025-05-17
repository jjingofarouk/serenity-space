// components/Header.tsx
'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-soft"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <Link href="/" className="text-2xl font-serif text-teal-900">
            SerenitySpace
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-text hover:text-primary font-sans text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/forum"
              className="text-text hover:text-primary font-sans text-base font-medium transition-colors duration-200"
            >
              Forum
            </Link>
            <Link
              href="/chat"
              className="text-text hover:text-primary font-sans text-base font-medium transition-colors duration-200"
            >
              Chat
            </Link>
          </div>
          <AuthButton />
        </div>
      </nav>
    </motion.header>
  );
}
