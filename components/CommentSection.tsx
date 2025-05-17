// components/CommentSection.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { addComment } from '@/lib/firestore';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';

export default function CommentSection({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    try {
      await addComment({
        postId,
        text: comment,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-blue-800 tracking-tight mb-4">
        Comments
      </h3>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full resize-none rounded-xl border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 text-gray-800 text-base"
            rows={4}
            aria-label="Comment input"
          />
          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
            disabled={!comment.trim()}
            aria-label="Submit comment"
          >
            Comment
          </Button>
        </form>
      ) : (
        <p className="text-gray-700 text-base">
          Please{' '}
          <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
            sign in
          </a>{' '}
          to comment.
        </p>
      )}
    </motion.div>
  );
}