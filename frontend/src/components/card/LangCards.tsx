import Image from "next/image";
import { langList } from "@/libs/i18n/logic/langList";
import styles from "@/components/card/LangCards.module.css";

const countries = langList;

export default function LangCards() {
  return (
    <div className={styles.container}>
      {Object.entries(countries).map(([code, country]) => (
        <div key={code} className={styles.card}>
          <Image
            className={styles.flag}
            src={`/assets/${country.code}.svg`}
            alt={`${country.alt} flag`}
            width={120}
            height={80}
          />
          <h2 className={styles.text}>{country.language}</h2>
        </div>
      ))}
    </div>
  );
}
