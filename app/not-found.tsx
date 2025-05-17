// app/not-found.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="bg-white/90 backdrop-blur-md border-none shadow-soft rounded-3xl overflow-hidden">
          <CardHeader className="pb-6 pt-8 px-8 bg-gradient-to-r from-teal-50 to-blue-50">
            <CardTitle className="text-3xl font-serif font-medium text-teal-900 flex items-center gap-2">
              <Home className="h-6 w-6 text-teal-600" />
              Page Not Found
            </CardTitle>
            <p className="text-base text-teal-700 mt-2 font-sans font-light">
              The page you’re looking for doesn’t exist.
            </p>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans">
              It seems you’ve wandered off the path. Let’s get you back to SerenitySpace.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-300 text-base font-medium shadow-sm"
            >
              Return to Home
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
