"use client";
import styles from "./intro.module.css";

export default function IntroductionPage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.badge}>🔒 100% Secure & Private</div>
          <h1 className={styles.heroTitle}>
            Chat Privately.<br />
            <span className={styles.accent}>No Download.</span><br />
            No Trace.
          </h1>
          <p className={styles.heroDesc}>
            Flow is a real-time, browser-based chat application.
            Connect with anyone privately — just search by their exact
            username and start chatting instantly. No app needed.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Private</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>0</span>
              <span className={styles.statLabel}>Downloads</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>∞</span>
              <span className={styles.statLabel}>Connections</span>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <img
            src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80"
            alt="chat"
            className={styles.heroBgImg}
          />
          <div className={styles.chatMock}>
            <div className={styles.mockHeader}>
              <div className={styles.mockAvatar} />
              <div>
                <div className={styles.mockName}>Shivam</div>
                <div className={styles.mockStatus}>● online</div>
              </div>
            </div>
            <div className={styles.mockMessages}>
              <div className={styles.msgThem}>Hey! Is this private? 👀</div>
              <div className={styles.msgMe}>100% — only we can see this 🔐</div>
              <div className={styles.msgThem}>No app download needed?</div>
              <div className={styles.msgMe}>Nope. Just open Flow in browser 🚀</div>
              <div className={styles.msgThem}>That's actually insane 🔥</div>
            </div>
            <div className={styles.mockInput}>
              <span>Type a message...</span>
              <span className={styles.sendIcon}>➤</span>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className={styles.sectionDivider} />

      {/* HOW IT WORKS */}
      <section className={styles.section}>
        <p className={styles.sectionTag}>── How it works ──</p>
        <h2 className={styles.sectionTitle}>Simple. Private. Instant.</h2>
        <div className={styles.stepsGrid}>

          <div className={styles.stepCard}>
            <img
              src="https://images.unsplash.com/photo-1633265486064-086b219458ec?w=400&q=80"
              alt="signup"
              className={styles.stepImg}
            />
            <span className={styles.stepNum}>01</span>
            <h3>Create Your Account</h3>
            <p>Sign up and get a unique username. Share it only with people you trust.</p>
          </div>

          <div className={styles.stepCard}>
            <img
              src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&q=80"
              alt="search"
              className={styles.stepImg}
            />
            <span className={styles.stepNum}>02</span>
            <h3>Go to People</h3>
            <p>Head to the People section and search any user by their exact full username.</p>
          </div>

          <div className={styles.stepCard}>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
              alt="chat"
              className={styles.stepImg}
            />
            <span className={styles.stepNum}>03</span>
            <h3>Add & Start Chatting</h3>
            <p>Add the user directly and send messages instantly — completely private.</p>
          </div>

        </div>
      </section>

      {/* DIVIDER */}
      <div className={styles.sectionDivider} />

      {/* WHY FLOW */}
      <section className={styles.section}>
        <p className={styles.sectionTag}>── Why Flow ──</p>
        <h2 className={styles.sectionTitle}>Built for Privacy</h2>
        <div className={styles.featuresGrid}>

          <div className={styles.featureCard}>
            <img
              src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&q=80"
              alt="secure"
              className={styles.featureImg}
            />
            <div className={styles.featureBody}>
              <span className={styles.featureIcon}>🔒</span>
              <h3>Secret by Default</h3>
              <p>Nobody can find you unless they know your exact username. Your identity stays hidden.</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <img
              src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80"
              alt="realtime"
              className={styles.featureImg}
            />
            <div className={styles.featureBody}>
              <span className={styles.featureIcon}>⚡</span>
              <h3>Real-Time Messages</h3>
              <p>Powered by Socket.io — messages delivered instantly with zero delay.</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
              alt="browser"
              className={styles.featureImg}
            />
            <div className={styles.featureBody}>
              <span className={styles.featureIcon}>🌐</span>
              <h3>No App Needed</h3>
              <p>Just open your browser and go. Works on every device — no installation ever.</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
              alt="anonymous"
              className={styles.featureImg}
            />
            <div className={styles.featureBody}>
              <span className={styles.featureIcon}>🕵️</span>
              <h3>Stay Anonymous</h3>
              <p>No phone number. No location. No personal info ever required.</p>
            </div>
          </div>

        </div>
      </section>

      {/* DIVIDER */}
      <div className={styles.sectionDivider} />

      {/* COMING SOON */}
      <section className={styles.comingSoon}>
        <p className={styles.sectionTag}>── Coming Soon ──</p>
        <h2 className={styles.sectionTitle}>We Are Working On It 🛠️</h2>
        <p className={styles.comingDesc}>
          We are actively building new features. Here's what's dropping next —
        </p>
        <div className={styles.upcomingGrid}>

          <div className={styles.upcomingCard}>
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80"
              alt="video"
              className={styles.upcomingImg}
            />
            <div className={styles.upcomingBody}>
              <span>📹</span>
              <h3>Video Calls</h3>
              <p>Face-to-face, privately.</p>
              <span className={styles.wip}>In Progress</span>
            </div>
          </div>

          <div className={styles.upcomingCard}>
            <img
              src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&q=80"
              alt="voice"
              className={styles.upcomingImg}
            />
            <div className={styles.upcomingBody}>
              <span>📞</span>
              <h3>Voice Calls</h3>
              <p>Crystal clear audio.</p>
              <span className={styles.wip}>In Progress</span>
            </div>
          </div>

          <div className={styles.upcomingCard}>
            <img
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80"
              alt="posts"
              className={styles.upcomingImg}
            />
            <div className={styles.upcomingBody}>
              <span>📸</span>
              <h3>Posts & Feed</h3>
              <p>Share moments publicly.</p>
              <span className={styles.wip}>Coming Soon</span>
            </div>
          </div>

        </div>
        <p className={styles.stayTuned}>Stay tuned — the best is yet to come 🚀</p>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span>FLOW © 2025</span>
        <span>Built with ❤️ for privacy</span>
      </footer>

    </div>
  );
}