// components/Header.tsx
'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { Card } from './ui/card';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-none shadow-lg rounded-2xl mb-8 mx-auto max-w-7xl">
        <nav className="flex justify-between items-center p-6">
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-teal-600 hover:text-teal-700 font-medium text-lg transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/forum"
              className="text-teal-600 hover:text-teal-700 font-medium text-lg transition-colors duration-200"
            >
              Forum
            </Link>
            <Link
              href="/chat"
              className="text-teal-600 hover:text-teal-700 font-medium text-lg transition-colors duration-200"
            >
              Chat
            </Link>
          </div>
          <AuthButton />
        </nav>
      </Card>
    </motion.div>
  );
}