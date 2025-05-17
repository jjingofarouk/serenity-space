// components/PostCard.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Post } from '@/lib/types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">
          <Link href={`/forum/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 line-clamp-2">{post.content}</p>
        <p className="text-sm text-gray-500 mt-2">
          Posted by User {post.userId} on {post.createdAt.toDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
