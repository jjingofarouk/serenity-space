// app/forum/page.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/firestore';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Forum() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-blue-800 tracking-tight">Forum</h1>
        <Link href="/forum/new">
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
            aria-label="Create new post"
          >
            New Post
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <p className="text-gray-700 text-lg text-center">Loading...</p>
      ) : (
        <div className="space-y-6">
          {posts?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}