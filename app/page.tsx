// app/page.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        className="space-y-8 max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="pb-6 pt-8 px-8 bg-gradient-to-r from-teal-50 to-blue-50">
            <CardTitle className="text-4xl font-serif font-medium text-teal-900 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-teal-600" />
              SerenitySpace
            </CardTitle>
            <p className="text-lg text-teal-700 mt-2 font-light">
              A warm, safe haven to share and find support.
            </p>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <p className="text-gray-600 text-base leading-relaxed mb-6 font-sans">
              Connect with others, share your thoughts, and discover a community that cares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/forum"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 text-base font-medium shadow-sm"
              >
                Explore Forum
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300 text-base font-medium shadow-sm"
              >
                Join Chat
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}