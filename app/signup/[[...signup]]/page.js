import { SignUp } from "@clerk/nextjs";
import styles from "./signup.module.css";

export default function SignupPage() {
  return (
    <div className={styles.wrapper}>

      {/* ===== TOP BRAND LOGO ===== */}
      <div className={styles.topLogoContainer}>
        <h1 className={styles.topLogo}>Flow</h1>
      </div>

      {/* ===== MAIN SECTION ===== */}
      <div className={styles.container}>

        {/* ===== LEFT SIDE (CONTENT) ===== */}
        <div className={styles.left}>
          <div className={styles.content}>
            <h1>
              The Future of <br /> Secure Conversations
            </h1>

            <p>
              Flow is a next-generation chat platform built for speed,
              privacy and simplicity. Experience secure messaging
              designed for modern communication.
            </p>

            <div className={styles.features}>
              <div>🔐 End-to-End Encryption</div>
              <div>⚡ Real-Time Fast Messaging</div>
              <div>🌎 Connect Anywhere</div>
              <div>🎯 Clean & Intuitive UI</div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDE (SIGNUP FORM) ===== */}
        <div className={styles.right}>
          <div className={styles.signupBox}>
            <SignUp routing="hash"
            signInUrl="/signin"
            afterSignUpUrl="/dashboard"
            afterSignInUrl="/dashboard"

             />
          </div>
        </div>

      </div>
    </div>
  );
}
