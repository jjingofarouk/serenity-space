// app/not-found.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl rounded-2xl">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-3xl font-semibold text-blue-800 tracking-tight">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Sorry, the page you’re looking for doesn’t exist.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-teal-600 hover:text-teal-700 font-medium text-base transition-colors duration-200"
          >
            Return to Home
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}