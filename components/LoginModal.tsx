// components/LoginModal.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signInWithEmail, signUpWithEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      setEmail('');
      setPassword('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl rounded-2xl w-full max-w-md">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-2xl font-semibold text-blue-800 tracking-tight">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 text-gray-800 text-base"
              required
              aria-label="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 text-gray-800 text-base"
              required
              aria-label="Password"
            />
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
              aria-label={isSignUp ? 'Sign up' : 'Sign in'}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
              aria-label={isSignUp ? 'Switch to sign in' : 'Switch to sign up'}
            >
              {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
              aria-label="Close modal"
            >
              Close
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}