import { SignIn } from "@clerk/nextjs";
import styles from "./signin.module.css";

export default function SigninPage() {
  return (
    <div className={styles.wrapper}>

      <div className={styles.topLogoContainer}>
        <h1 className={styles.topLogo}>Flow</h1>
      </div>

      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div className={styles.content}>
            <h1>
              Secure Access to <br /> Your Conversations
            </h1>

            <p className={styles.leftpara}>
              Continue your private and real-time messaging experience.
              Flow keeps your communication encrypted and seamless.
            </p>

            <div className={styles.features}>
              <div>🔐 End To End Encryption</div>
              <div>⚡ Real Time Message Sync</div>
             <div>🌍 Fast And Secure Access</div>
             <div>🎯 Clean And Minimal Design</div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <div className={styles.formBox}>
            <SignIn
              routing="hash"
              signUpUrl="/signup"
              
            />
          </div>
        </div>

      </div>
    </div>
  );
}
