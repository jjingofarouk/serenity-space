// app/page.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <motion.div
      className="container flex justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title">
            <Leaf className="h-8 w-8" />
            Welcome to SerenitySpace
          </CardTitle>
          <p className="text-lg text-center font-medium">
            A warm, safe haven to share and find support.
          </p>
        </CardHeader>
        <CardContent className="card-content">
          <p className="text-sm leading-relaxed">
            Connect with others, share your thoughts, and discover a community that cares.
          </p>
          <div className="flex gap-4 mt-6">
            <Link href="/forum" className="button button-primary">
              Explore Forum
            </Link>
            <Link href="/chat" className="button button-secondary">
              Join Chat
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}