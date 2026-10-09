import { langList } from "@/libs/i18n/logic/langList";
import styles from "@/components/card/LangCards.module.css";
import Image from "next/image";

export default function LangCards() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Select your language</h1>
      <div className={styles.grid}>
        {Object.entries(langList).map(([code, country]) => (
          <button key={code} type="button" lang={code} className={styles.card}>
            <Image
              className={styles.flag}
              src={`/assets/${country.code}.svg`}
              alt={`${country.alt} flag`}
              width={120}
              height={80}
              unoptimized
            />
            <span className={styles.text}>{country.language}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
