// app/privacy/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './page.module.css';

export default function PrivacyPolicy() {
  return (
    <motion.div
      className="container flex justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title">🔒 Privacy Policy</CardTitle>
          <p className="text-lg text-center font-medium">
            How SerenitySpace Collects, Uses, and Protects Your Information
          </p>
        </CardHeader>
        <CardContent className="card-content">
          <div className={styles.content}>
            <p className="text-sm leading-relaxed mb-6">
              <strong>Effective Date: May 18, 2025</strong>
              <br />
              SerenitySpace (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile applications, forums, chat features, and other services (collectively, the “Services”). By using the Services, you consent to the practices described in this Privacy Policy and our <a href="/user-agreement" className="text-teal-600 hover:text-teal-400">User Agreement</a>. If you do not agree, please do not use the Services.
            </p>

            <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
            <p className={styles.sectionText}>
              We collect the following types of information:
              <ul className={styles.list}>
                <li><strong>Personal Information:</strong> Information you provide, such as your username, email address, and profile details, when you register or interact with the Services.</li>
                <li><strong>Content You Share:</strong> Posts, comments, messages, and other content you submit to forums, chats, or other features.</li>
                <li><strong>Usage Data:</strong> Information about your interactions with the Services, including IP address, device type, browser, pages visited, and timestamps.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> Data collected via cookies, web beacons, and similar technologies to enhance your experience and analyze usage.</li>
                <li><strong>Third-Party Data:</strong> Information from third-party services (e.g., authentication providers) if you link your account.</li>
              </ul>
            </p>

            <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
            <p className={styles.sectionText}>
              We use your information to:
              <ul className={styles.list}>
                <li>Provide, maintain, and improve the Services.</li>
                <li>Personalize your experience, such as recommending relevant content.</li>
                <li>Communicate with you, including sending service-related notifications and responding to inquiries.</li>
                <li>Monitor and enforce our <a href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</a> and detect fraud or abuse.</li>
                <li>Analyze usage trends to enhance functionality and user experience.</li>
                <li>Comply with legal obligations or protect our legal rights.</li>
              </ul>
            </p>

            <h2 className={styles.sectionTitle}>3. How We Share Your Information</h2>
            <p className={styles.sectionText}>
              We may share your information:
              <ul className={styles.list}>
                <li><strong>With Your Consent:</strong> When you explicitly agree, such as sharing a post publicly.</li>
                <li><strong>Service Providers:</strong> With trusted third parties who assist us in operating the Services (e.g., hosting, analytics), bound by confidentiality agreements.</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, or legal processes, or to respond to lawful requests from authorities.</li>
                <li><strong>Safety and Protection:</strong> To protect the safety, rights, or property of SerenitySpace, our users, or the public, including investigating violations of our Rules.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to users.</li>
              </ul>
              We do not sell your personal information to third parties for marketing purposes.
            </p>

            <h2 className={styles.sectionTitle}>4. Cookies and Tracking Technologies</h2>
            <p className={styles.sectionText}>
              We use cookies and similar technologies to:
              <ul className={styles.list}>
                <li>Authenticate users and maintain session security.</li>
                <li>Analyze usage patterns and improve the Services.</li>
                <li>Deliver personalized content and advertisements.</li>
              </ul>
              You can manage cookie preferences through your browser settings, but disabling cookies may affect the functionality of the Services.
            </p>

            <h2 className={styles.sectionTitle}>5. Data Security</h2>
            <p className={styles.sectionText}>
              We implement industry-standard security measures, including encryption, access controls, and regular audits, to protect your information. However, no system is completely secure, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h2 className={styles.sectionTitle}>6. Your Rights and Choices</h2>
            <p className={styles.sectionText}>
              Depending on your jurisdiction, you may have rights to:
              <ul className={styles.list}>
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of certain data processing, such as targeted advertising.</li>
                <li>Request data portability.</li>
                <li>Withdraw consent for data processing, where applicable.</li>
              </ul>
              To exercise these rights, contact us at <a href="mailto:privacy@serenityspace.com" className="text-teal-600 hover:text-teal-400">privacy@serenityspace.com</a>. We will respond within the timeframes required by law.
            </p>

            <h2 className={styles.sectionTitle}>7. Data Retention</h2>
            <p className={styles.sectionText}>
              We retain your information for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, or enforce our agreements. When information is no longer needed, we securely delete or anonymize it.
            </p>

            <h2 className={styles.sectionTitle}>8. International Data Transfers</h2>
            <p className={styles.sectionText}>
              Your information may be transferred to and processed in countries other than your own, including the United States, where data protection laws may differ. We ensure appropriate safeguards, such as Standard Contractual Clauses, to protect your information during such transfers.
            </p>

            <h2 className={styles.sectionTitle}>9. Children’s Privacy</h2>
            <p className={styles.sectionText}>
              The Services are not intended for users under 13 years of age (or 16 in certain jurisdictions). We do not knowingly collect personal information from children under these ages. If we learn such information has been collected, we will promptly delete it. Contact us if you believe a child has provided us with personal information.
            </p>

            <h2 className={styles.sectionTitle}>10. Third-Party Links</h2>
            <p className={styles.sectionText}>
              The Services may contain links to third-party websites or services. We are not responsible for their privacy practices. Review the privacy policies of any third-party sites you visit.
            </p>

            <h2 className={styles.sectionTitle}>11. Updates to This Privacy Policy</h2>
            <p className={styles.sectionText}>
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of material changes via email, in-app notifications, or by posting the updated policy on our website. Continued use of the Services after such changes constitutes acceptance of the updated policy.
            </p>

            <h2 className={styles.sectionTitle}>12. Contact Us</h2>
            <p className={styles.sectionText}>
              For questions or concerns about this Privacy Policy, contact our Data Protection Officer at <a href="mailto:privacy@serenityspace.com" className="text-teal-600 hover:text-teal-400">privacy@serenityspace.com</a> or write to:
              <br />
              SerenitySpace, Inc.
              <br />
              123 Serenity Lane, Suite 100
              <br />
              San Francisco, CA 94105, USA
            </p>

            <p className="text-sm leading-relaxed mt-6">
              Your trust is paramount to us. We are dedicated to safeguarding your privacy and ensuring a secure experience on SerenitySpace.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}