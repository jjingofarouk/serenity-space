// app/rules/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './page.module.css';

export default function Rules() {
  return (
    <motion.div
      className="container flex justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title">📜 Community Rules</CardTitle>
          <p className="text-lg text-center font-medium">
            Guidelines for a Safe and Supportive SerenitySpace Community
          </p>
        </CardHeader>
        <CardContent className="card-content">
          <div className={styles.content}>
            <p className="text-sm leading-relaxed mb-6">
              SerenitySpace is committed to fostering a respectful, inclusive, and safe environment for all users. These Community Rules (“Rules”) govern your use of SerenitySpace’s services, including our website, mobile applications, forums, chat features, and any other interactive services (collectively, the “Services”). By accessing or using the Services, you agree to abide by these Rules, our <a href="/user-agreement" className="text-teal-600 hover:text-teal-400">User Agreement</a>, and our <a href="/privacy" className="text-teal-600 hover:text-teal-400">Privacy Policy</a>. Violations of these Rules may result in warnings, content removal, account suspension, or termination, at our sole discretion.
            </p>

            <h2 className={styles.sectionTitle}>1. Respect All Users</h2>
            <p className={styles.sectionText}>
              Treat everyone with kindness and empathy. Do not engage in harassment, bullying, hate speech, or discrimination based on race, ethnicity, gender, sexual orientation, religion, disability, mental health status, or any other protected characteristic. This includes personal attacks, derogatory language, or targeted abuse in posts, comments, chats, or private messages.
            </p>

            <h2 className={styles.sectionTitle}>2. No Illegal or Harmful Content</h2>
            <p className={styles.sectionText}>
              Do not post, share, or promote content that is illegal, encourages illegal activities, or causes harm. This includes, but is not limited to:
              <ul className={styles.list}>
                <li>Content promoting violence, self-harm, or suicide.</li>
                <li>Illegal drug use or distribution.</li>
                <li>Child sexual exploitation or abuse material.</li>
                <li>Non-consensual intimate images or revenge porn.</li>
                <li>Content violating intellectual property rights, including unauthorized sharing of copyrighted material.</li>
              </ul>
            </p>

            <h2 className={styles.sectionTitle}>3. Protect Privacy and Confidentiality</h2>
            <p className={styles.sectionText}>
              Do not share personal or confidential information about yourself or others, including real names, addresses, phone numbers, email addresses, or financial information, without explicit consent. Do not attempt to impersonate others or access accounts that do not belong to you.
            </p>

            <h2 className={styles.sectionTitle}>4. Post Appropriate and Relevant Content</h2>
            <p className={styles.sectionText}>
              Ensure your posts, comments, and messages are relevant to the mental health and support focus of SerenitySpace. Avoid spam, excessive self-promotion, or off-topic content. Do not post graphic, sexually explicit, or otherwise inappropriate content that may distress other users.
            </p>

            <h2 className={styles.sectionTitle}>5. No Misinformation</h2>
            <p className={styles.sectionTitle}>
              Do not spread false or misleading information, especially regarding mental health, medical advice, or treatments. While sharing personal experiences is encouraged, do not present unverified claims as professional advice. Always cite credible sources when sharing factual information.
            </p>

            <h2 className={styles.sectionTitle}>6. Respect Moderation and Reporting</h2>
            <p className={styles.sectionText}>
              Our moderation team works to maintain a safe community. Do not evade bans or suspensions by creating new accounts. If you believe content violates these Rules, use the reporting tools provided. Do not engage in retaliatory actions against users who report content.
            </p>

            <h2 className={styles.sectionTitle}>7. No Commercial Solicitation</h2>
            <p className={styles.sectionText}>
              Do not use SerenitySpace for unauthorized commercial purposes, including selling products, services, or soliciting donations, without prior written approval from SerenitySpace. This includes multi-level marketing, pyramid schemes, or affiliate marketing spam.
            </p>

            <h2 className={styles.sectionTitle}>8. Compliance with Laws</h2>
            <p className={styles.sectionText}>
              You must comply with all applicable local, state, national, and international laws while using the Services. Any conduct that violates laws or regulations may result in immediate account termination and reporting to relevant authorities.
            </p>

            <h2 className={styles.sectionTitle}>9. Updates to These Rules</h2>
            <p className={styles.sectionText}>
              We may update these Rules periodically to reflect changes in our Services or legal requirements. We will notify users of significant changes via email, in-app notifications, or by posting an updated version on our website. Continued use of the Services after such changes constitutes acceptance of the updated Rules.
            </p>

            <h2 className={styles.sectionTitle}>10. Contact Us</h2>
            <p className={styles.sectionText}>
              If you have questions about these Rules or need to report a violation, please contact us at <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a>. For urgent concerns, use our in-app reporting tools.
            </p>

            <p className="text-sm leading-relaxed mt-6">
              SerenitySpace reserves the right to interpret and enforce these Rules at its sole discretion. We are committed to creating a supportive community and appreciate your cooperation in maintaining a safe space for all users.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}