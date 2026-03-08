"use client";
import styles from "./help.module.css";

export default function HelpPage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.badge}>💬 Help & Support</div>
        <h1 className={styles.heroTitle}>
          How can we <span className={styles.accent}>help you?</span>
        </h1>
        <p className={styles.heroDesc}>
          We're here for you. Browse common questions below or reach out
          directly — we'll get back to you as soon as possible.
        </p>
      </section>

      <div className={styles.sectionDivider} />

      {/* FAQ */}
      <section className={styles.section}>
        <p className={styles.sectionTag}>── Common Questions ──</p>
        <h2 className={styles.sectionTitle}>Frequently Asked</h2>

        <div className={styles.faqGrid}>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>🔍</span>
            <h3>How do I find someone?</h3>
            <p>Go to the <strong>People</strong> section from the sidebar and search the user by their exact full username. Username must be 100% correct.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>💬</span>
            <h3>How do I start chatting?</h3>
            <p>Once you find the user in People section, click the <strong>Message</strong> button. You'll be taken directly to the chat screen.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>🔒</span>
            <h3>Is my chat private?</h3>
            <p>Yes. Your conversation is completely private. Nobody can find or read your messages unless they know your exact username.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>📱</span>
            <h3>Do I need to download anything?</h3>
            <p>No. Flow runs entirely in your web browser. No installation, no app store. Just open and chat from any device.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>👤</span>
            <h3>Can someone find me randomly?</h3>
            <p>No. You are invisible to others unless they type your exact username. Your account is secret by default.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>⚡</span>
            <h3>Why are messages delayed?</h3>
            <p>Flow uses real-time Socket.io. If messages are delayed, check your internet connection or try refreshing the page.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>🖼️</span>
            <h3>Can I send images or files?</h3>
            <p>Currently Flow supports text messages only. Media sharing and file uploads are coming in a future update.</p>
          </div>

          <div className={styles.faqCard}>
            <span className={styles.faqIcon}>🔄</span>
            <h3>My messages disappeared?</h3>
            <p>All messages are saved in the database. Try refreshing the page. If the issue persists, contact us directly.</p>
          </div>

        </div>
      </section>

      <div className={styles.sectionDivider} />

      {/* COMING SOON FEATURES */}
      <section className={styles.section}>
        <p className={styles.sectionTag}>── What's Next ──</p>
        <h2 className={styles.sectionTitle}>Features We're Building</h2>
        <div className={styles.featuresRow}>

          <div className={styles.featureChip}>
            <span>📹</span> Video Calls
            <span className={styles.wip}>Soon</span>
          </div>
          <div className={styles.featureChip}>
            <span>📞</span> Voice Calls
            <span className={styles.wip}>Soon</span>
          </div>
          <div className={styles.featureChip}>
            <span>📸</span> Posts & Feed
            <span className={styles.wip}>Soon</span>
          </div>
          <div className={styles.featureChip}>
            <span>🖼️</span> Media Sharing
            <span className={styles.wip}>Soon</span>
          </div>
          <div className={styles.featureChip}>
            <span>🔔</span> Notifications
            <span className={styles.wip}>Soon</span>
          </div>

        </div>
      </section>

      <div className={styles.sectionDivider} />

      {/* CONTACT */}
      <section className={styles.contactSection}>
        <p className={styles.sectionTag}>── Still need help? ──</p>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <p className={styles.contactDesc}>
          Can't find what you're looking for? Send us an email and
          we'll respond as soon as possible.
        </p>

        <div className={styles.contactCards}>

          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>📧</span>
            <h3>Email Support</h3>
            <p>For any issues, bugs, or general questions</p>
            <a className={styles.mailBtn} href="mailto:support@flowapp.com">
              support@flowapp.com
            </a>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>🐛</span>
            <h3>Report a Bug</h3>
            <p>Found something broken? Let us know immediately</p>
            <a className={styles.mailBtn} href="mailto:bugs@flowapp.com">
              bugs@flowapp.com
            </a>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>💡</span>
            <h3>Suggest a Feature</h3>
            <p>Have an idea that would make Flow better?</p>
            <a className={styles.mailBtn} href="mailto:ideas@flowapp.com">
              ideas@flowapp.com
            </a>
          </div>

        </div>

        <div className={styles.responseTime}>
          <span>⏱️</span>
          <span>We typically respond within <strong>24–48 hours</strong></span>
        </div>

      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span>FLOW © 2025</span>
        <span>Built with ❤️ for privacy</span>
      </footer>

    </div>
  );
}