import { langList } from "@/libs/i18n/logic/langList";
import styles from "@/components/card/LangCards.module.css";
import Image from "next/image";

export default function LangCards() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Select your language</h1>
      <div className={styles.grid}>
        {Object.entries(langList).map(([code, country]) => (
          <a key={code} href={`${country.code}`} className={styles.card}>
            <Image
              className={styles.flag}
              src={country.flagPath}
              alt={`${country.alt} flag`}
              width={120}
              height={80}
            />
            <span className={styles.text}>{country.language}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
