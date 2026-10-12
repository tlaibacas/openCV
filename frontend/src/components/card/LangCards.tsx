"use client";
import styles from "@/components/card/LangCards.module.css";
import Image from "next/image";
import { countries } from "@/libs/i18n/locales/countries";
import Remember from "@/components/card/remember/Remember";
import { handleLang } from "@/components/card/LangLogic";
import { useState } from "react";

export default function LangCards() {
  const [remember, setRemember] = useState(false);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Select your language</h1>
      <div className={styles.grid}>
        {Object.values(countries).map((country) => (
          <a
            key={country.code}
            className={styles.card}
            onClick={() => handleLang(remember, country.code)}
          >
            <Image
              className={styles.flag}
              src={country.flagPath}
              alt={`${country.alt} flag`}
              width={120}
              height={80}
              loading="eager"
            />
            <span className={styles.text}>{country.language}</span>
          </a>
        ))}
      </div>
      <span className={styles.remember}>Remember language</span>
      <Remember onChange={setRemember} />
    </main>
  );
}
