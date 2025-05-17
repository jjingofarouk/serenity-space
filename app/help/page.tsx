// app/help/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import styles from './page.module.css';

export default function Help() {
  return (
    <motion.div
      className="container flex justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title">❓ Help Center</CardTitle>
          <p className="text-lg text-center font-medium">
            Support and Resources for Using SerenitySpace
          </p>
        </CardHeader>
        <CardContent className="card-content">
          <div className={styles.content}>
            <p className="text-sm leading-relaxed mb-6">
              Welcome to the SerenitySpace Help Center. Here, you’ll find answers to common questions, guidance on using our features, and resources to ensure a safe and supportive experience. If you need further assistance, contact us at <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a>.
            </p>

            <h2 className={styles.sectionTitle}>1. Getting Started</h2>
            <p className={styles.sectionText}>
              <strong>How do I create an account?</strong><br />
              Visit the <Link href="/login" className="text-teal-600 hover:text-teal-400">Sign Up</Link> page, enter your email and password, and follow the prompts. You’ll need to agree to our <Link href="/user-agreement" className="text-teal-600 hover:text-teal-400">User Agreement</Link>, <Link href="/privacy" className="text-teal-600 hover:text-teal-400">Privacy Policy</Link>, and <Link href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</Link>.
            </p>
            <p className={styles.sectionText}>
              <strong>How do I sign in?</strong><br />
              Go to the <Link href="/login" className="text-teal-600 hover:text-teal-400">Sign In</Link> page and enter your email and password. If you’ve forgotten your password, use the “Forgot Password” link to reset it.
            </p>

            <h2 className={styles.sectionTitle}>2. Using SerenitySpace</h2>
            <p className={styles.sectionText}>
              <strong>How do I join the forum?</strong><br />
              Navigate to the <Link href="/forum" className="text-teal-600 hover:text-teal-400">Forum</Link> page to browse or create posts. You must be signed in to participate. Follow our <Link href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</Link> to ensure respectful interactions.
            </p>
            <p className={styles.sectionText}>
              <strong>How does the chat feature work?</strong><br />
              Access the <Link href="/chat" className="text-teal-600 hover:text-teal-400">Chat</Link> page to join real-time conversations. Messages are public within the chat room, so avoid sharing personal information. Report any violations using the in-app reporting tools.
            </p>
            <p className={styles.sectionText}>
              <strong>What are topics?</strong><br />
              The <Link href="/topics" className="text-teal-600 hover:text-teal-400">Topics</Link> page organizes discussions by categories like anxiety, mindfulness, or support groups. Browse or contribute to relevant threads.
            </p>

            <h2 className={styles.sectionTitle}>3. Account Management</h2>
            <p className={styles.sectionText}>
              <strong>How do I update my profile?</strong><br />
              After signing in, go to your account settings to update your username, email, or password. Ensure your information complies with our <Link href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</Link>.
            </p>
            <p className={styles.sectionText}>
              <strong>How do I delete my account?</strong><br />
              Contact <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a> to request account deletion. We’ll process your request in accordance with our <Link href="/privacy" className="text-teal-600 hover:text-teal-400">Privacy Policy</Link>.
            </p>

            <h2 className={styles.sectionTitle}>4. Safety and Moderation</h2>
            <p className={styles.sectionText}>
              <strong>How do I report inappropriate content?</strong><br />
              Use the “Report” button next to posts, comments, or messages that violate our <Link href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</Link>. Our moderation team will review and take action as needed.
            </p>
            <p className={styles.sectionText}>
              <strong>What happens if my account is suspended?</strong><br />
              If your account is suspended, you’ll receive a notification explaining the reason and duration. To appeal, contact <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a>. Do not create new accounts to evade suspensions.
            </p>

            <h2 className={styles.sectionTitle}>5. Technical Support</h2>
            <p className={styles.sectionText}>
              <strong>I’m experiencing a bug or error. What should I do?</strong><br />
              Clear your browser cache, ensure you’re using the latest app version, and try again. If the issue persists, email <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a> with details (e.g., device, browser, error message).
            </p>
            <p className={styles.sectionText}>
              <strong>Why can’t I access certain features?</strong><br />
              Some features require you to be signed in or may be restricted due to account status. Check your account settings or contact support for assistance.
            </p>

            <h2 className={styles.sectionTitle}>6. Community Guidelines</h2>
            <p className={styles.sectionText}>
              <strong>How can I ensure my posts are appropriate?</strong><br />
              Review our <Link href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</Link> before posting. Focus on respectful, relevant, and supportive content. Avoid sharing personal information or unverified medical advice.
            </p>
            <p className={styles.sectionText}>
              <strong>Can I promote my services or products?</strong><br />
              Unauthorized commercial activity is prohibited. Contact <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a> for approval before promoting any products or services.
            </p>

            <h2 className={styles.sectionTitle}>7. Contact Us</h2>
            <p className={styles.sectionText}>
              For additional help, reach out to our support team at <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a> or write to:
              <br />
              SerenitySpace, Inc.
              <br />
              123 Serenity Lane, Suite 100
              <br />
              San Francisco, CA 94105, USA
            </p>

            <p className="text-sm leading-relaxed mt-6">
              We’re here to help you navigate SerenitySpace and make the most of our community. Thank you for being part of our supportive space!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}