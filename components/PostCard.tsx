// components/PostCard.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Post } from '@/lib/types';
import { motion } from 'framer-motion';

export default function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-md rounded-2xl transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-blue-800 tracking-tight">
            <Link
              href={`/forum/${post.id}`}
              className="hover:text-teal-600 transition-colors duration-200"
            >
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-base line-clamp-2 leading-relaxed">
            {post.content}
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Posted by User {post.userId} on {post.createdAt.toDateString()}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}