'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();

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
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className={styles.logoContainer}>
            <Image
              src="/favicon.ico"
              alt="SerenitySpace Logo"
              width={32}
              height={32}
              className={styles.logoIcon}
            />
            <Link href="/" className={styles.logo}>
              SerenitySpace
            </Link>
          </div>
          <CardTitle className={styles.cardTitle}>
            {isSignUp ? 'Join SerenitySpace 🌿' : 'Welcome Back 🌿'}
          </CardTitle>
          <p className={styles.subtitle}>
            {isSignUp
              ? 'Create an account to join our supportive community'
              : 'Sign in to connect with others'}
          </p>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.input}
                required
                aria-label="Email"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.input}
                required
                aria-label="Password"
              />
            </div>
            {error && (
              <p className={styles.error}>{error}</p>
            )}
            <Button
              type="submit"
              className={styles.submitButton}
              aria-label={isSignUp ? 'Sign up' : 'Sign in'}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <div className={styles.switchContainer}>
            <p className={styles.switchText}>
              {isSignUp ? 'Already have an account?' : 'New to SerenitySpace?'}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className={styles.switchLink}
                aria-label={isSignUp ? 'Switch to sign in' : 'Switch to sign up'}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
          <div className={styles.terms}>
            <p className={styles.termsText}>
              By {isSignUp ? 'signing up' : 'signing in'}, you agree to our{' '}
              <Link href="/user-agreement" className={styles.termsLink}>
                User Agreement
              </Link>
              ,{' '}
              <Link href="/privacy" className={styles.termsLink}>
                Privacy Policy
              </Link>
              , and{' '}
              <Link href="/rules" className={styles.termsLink}>
                Community Rules
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}