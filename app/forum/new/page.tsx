// app/forum/new/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPost } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import styles from './page.module.css';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in.');
      return;
    }
    try {
      await addPost({ title, content, userId: user.uid, createdAt: Timestamp.now() });
      router.push('/forum');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Create a Post</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className={styles.input}
              required
              aria-label="Post title"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              className={styles.textarea}
              rows={6}
              required
              aria-label="Post content"
            />
            <Button
              type="submit"
              className={styles.button}
              disabled={!title.trim() || !content.trim()}
              aria-label="Submit post"
            >
              Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}