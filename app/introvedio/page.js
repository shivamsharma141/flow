"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./intro.module.css";

export default function IntroPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 800);
    const t3 = setTimeout(() => setStep(3), 1600);
    const t4 = setTimeout(() => setStep(4), 2400);
    const t5 = setTimeout(() => router.push("/dashboard"), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [router]);

  return (
    <div className={styles.container}>

      <div className={styles.bg} />
      <div className={styles.vignette} />

      <div className={styles.center}>

        <div className={`${styles.studio} ${step >= 1 ? styles.show : ""}`}>
          real · time · messaging
        </div>

        <div className={`${styles.line} ${step >= 2 ? styles.show : ""}`} />

        <div className={`${styles.mainTitle} ${step >= 2 ? styles.show : ""}`}>
          FLOW
        </div>

        <div className={`${styles.line} ${step >= 2 ? styles.show : ""}`} />

        <div className={`${styles.tagline} ${step >= 3 ? styles.show : ""}`}>
          Connect · Chat · Flow
        </div>

        <div className={`${styles.sub} ${step >= 4 ? styles.show : ""}`}>
          Your conversations. Instantly delivered.
        </div>

      </div>

      <button
        className={styles.skipBtn}
        onClick={() => router.push("/signup")}
      >
        Skip ⟶
      </button>

    </div>
  );
}