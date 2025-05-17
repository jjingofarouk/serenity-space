// components/AuthButton.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import LoginModal from './LoginModal';

export default function AuthButton() {
  const { user, signInWithGoogle, signInAnonymously, signOutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3"
    >
      {user ? (
        <Button
          onClick={signOutUser}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl px-6 py-2 transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label="Sign out"
        >
          Sign Out
        </Button>
      ) : (
        <>
          <Button
            onClick={signInWithGoogle}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 py-2 transition-all duration-200 ease-in-out transform hover:scale-105"
            aria-label="Sign in with Google"
          >
            Sign In with Google
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 py-2 transition-all duration-200 ease-in-out transform hover:scale-105"
            aria-label="Sign in with email"
          >
            Sign In with Email
          </Button>
          <Button
            onClick={signInAnonymously}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl px-6 py-2 transition-all duration-200 ease-in-out transform hover:scale-105"
            aria-label="Sign in anonymously"
          >
            Sign In Anonymously
          </Button>
          <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
      )}
    </motion.div>
  );
}