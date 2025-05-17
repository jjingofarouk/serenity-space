// app/user-agreement/page.tsx
'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './page.module.css';

export default function UserAgreement() {
  return (
    <motion.div
      className="container flex justify-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title">🤝 User Agreement</CardTitle>
          <p className="text-lg text-center font-medium">
            Terms Governing Your Use of SerenitySpace
          </p>
        </CardHeader>
        <CardContent className="card-content">
          <div className={styles.content}>
            <p className="text-sm leading-relaxed mb-6">
              <strong>Effective Date: May 18, 2025</strong>
              <br />
              This User Agreement (“Agreement”) is a legally binding contract between you (“User,” “you,” or “your”) and SerenitySpace, Inc. (“SerenitySpace,” “we,” “us,” or “our”) governing your access to and use of our website, mobile applications, forums, chat features, and other services (collectively, the “Services”). By accessing or using the Services, you agree to be bound by this Agreement, our <a href="/rules" className="text-teal-600 hover:text-teal-400">Community Rules</a>, and our <a href="/privacy" className="text-teal-600 hover:text-teal-400">Privacy Policy</a>. If you do not agree to these terms, do not use the Services.
            </p>

            <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p className={styles.sectionText}>
              By registering an account, posting content, or otherwise using the Services, you represent that you are at least 13 years of age (or 16 in certain jurisdictions) and have the legal capacity to enter into this Agreement. If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to this Agreement.
            </p>

            <h2 className={styles.sectionTitle}>2. Account Responsibilities</h2>
            <p className={styles.sectionText}>
              You are responsible for:
              <ul className={styles.list}>
                <li>Maintaining the confidentiality of your account credentials.</li>
                <li>All activities conducted under yourでお, whether authorized or not.</li>
                <li>Notifying us immediately of any unauthorized access or security breaches at <a href="mailto:security@serenityspace.com" className="text-teal-600 hover:text-teal-400">security@serenityspace.com</a>.</li>
              </ul>
              We reserve the right to suspend or terminate your account for violations of this Agreement or our Community Rules.
            </p>

            <h2 className={styles.sectionTitle}>3. User Content</h2>
            <p className={styles.sectionText}>
              You retain ownership of content you submit to the Services (“User Content”), but you grant SerenitySpace a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, modify, display, and perform your User Content in connection with operating and promoting the Services. You represent that:
              <ul className={styles.list}>
                <li>You have all necessary rights to submit your User Content.</li>
                <li>Your User Content does not infringe on the rights of any third party, including intellectual property, privacy, or publicity rights.</li>
                <li>Your User Content complies with our Community Rules and applicable laws.</li>
              </ul>
              We may remove or modify User Content at our discretion, with or without notice.
            </p>

            <h2 className={styles.sectionTitle}>4. Intellectual Property</h2>
            <p className={styles.sectionText}>
              The Services, including all text, graphics, logos, software, and other materials (excluding User Content), are owned by SerenitySpace or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works of our materials without prior written permission.
            </p>

            <h2 className={styles.sectionTitle}>5. Prohibited Conduct</h2>
            <p className={styles.sectionText}>
              You agree not to:
              <ul className={styles.list}>
                <li>Use the Services for any unlawful purpose or in violation of our Community Rules.</li>
                <li>Interfere with or disrupt the Services, including through hacking, malware, or denial-of-service attacks.</li>
                <li>Attempt to gain unauthorized access to our systems or other users’ accounts.</li>
                <li>Use automated tools (e.g., bots, scrapers) to access or collect data from the Services without permission.</li>
                <li>Engage in any activity that imposes an unreasonable burden on our infrastructure.</li>
              </ul>
            </p>

            <h2 className={styles.sectionTitle}>6. Disclaimers</h2>
            <p className={styles.sectionText}>
              The Services are provided “as is” and “as available” without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. SerenitySpace does not guarantee:
              <ul className={styles.list}>
                <li>The accuracy, completeness, or reliability of any content on the Services.</li>
                <li>That the Services will be uninterrupted, error-free, or secure.</li>
                <li>That any mental health advice or support provided by users is professional or accurate.</li>
              </ul>
              You use the Services at your own risk.
            </p>

            <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p className={styles.sectionText}>
              To the fullest extent permitted by law, SerenitySpace, its affiliates, officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from or related to your use of the Services, even if advised of the possibility of such damages. Our total liability to you for any claim will not exceed $100 USD or the amount you paid us in the past 12 months, whichever is greater. Some jurisdictions do not allow certain limitations, so these restrictions may not apply to you.
            </p>

            <h2 className={styles.sectionTitle}>8. Indemnification</h2>
            <p className={styles.sectionText}>
              You agree to indemnify, defend, and hold harmless SerenitySpace, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable attorneys’ fees) arising from:
              <ul className={styles.list}>
                <li>Your use of the Services.</li>
                <li>Your User Content.</li>
                <li>Your violation of this Agreement, our Community Rules, or applicable laws.</li>
              </ul>
            </p>

            <h2 className={styles.sectionTitle}>9. Termination</h2>
            <p className={styles.sectionText}>
              We may suspend or terminate your access to the Services at any time, with or without cause, and with or without notice, including for violations of this Agreement or our Community Rules. Upon termination, your right to use the Services ceases, but provisions of this Agreement that by their nature should survive (e.g., intellectual property, limitation of liability, indemnification) will remain in effect.
            </p>

            <h2 className={styles.sectionTitle}>10. Governing Law and Dispute Resolution</h2>
            <p className={styles.sectionText}>
              This Agreement is governed by the laws of the State of California, USA, without regard to its conflict of laws principles. Any disputes arising from or related to this Agreement or the Services will be resolved through binding arbitration in San Francisco, California, under the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction. You waive any right to participate in a class action or representative proceeding.
            </p>

            <h2 className={styles.sectionTitle}>11. Updates to This Agreement</h2>
            <p className={styles.sectionText}>
              We may update this Agreement periodically to reflect changes in our Services or legal requirements. We will notify you of material changes via email, in-app notifications, or by posting the updated Agreement on our website. Continued use of the Services after such changes constitutes acceptance of the updated Agreement.
            </p>

            <h2 className={styles.sectionTitle}>12. Miscellaneous</h2>
            <p className={styles.sectionText}>
              <ul className={styles.list}>
                <li><strong>Entire Agreement:</strong> This Agreement, together with our Community Rules and Privacy Policy, constitutes the entire agreement between you and SerenitySpace regarding the Services.</li>
                <li><strong>Severability:</strong> If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</li>
                <li><strong>Waiver:</strong> Our failure to enforce any right or provision will not constitute a waiver of that right or provision.</li>
                <li><strong>Assignment:</strong> You may not assign your rights or obligations under this Agreement without our prior written consent. We may assign this Agreement without restriction.</li>
              </ul>
            </p>

            <h2 className={styles.sectionTitle}>13. Contact Us</h2>
            <p className={styles.sectionText}>
              For questions about this Agreement, contact us at <a href="mailto:support@serenityspace.com" className="text-teal-600 hover:text-teal-400">support@serenityspace.com</a> or write to:
              <br />
              SerenitySpace, Inc.
              <br />
              123 Serenity Lane, Suite 100
              <br />
              San Francisco, CA 94105, USA
            </p>

            <p className="text-sm leading-relaxed mt-6">
              Thank you for being part of the SerenitySpace community. We look forward to providing you with a safe and supportive experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}