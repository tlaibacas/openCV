"use client";
import styles from "./LangCards.module.css";
import Image from "next/image";
import { languages } from "@/libs/i18n/locales/countries";
import Remember from "@/components/card/remember/Remember";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCookie } from "@/libs/cookies/cookies";

export default function LangCards() {
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Select your language</h1>
      <div className={styles.grid}>
        {Object.values(languages).map((country) => (
          <a
            key={country.code}
            className={styles.card}
            onClick={() => {
              if (remember) {
                createCookie("lang", country.code);
              }

              createCookie("warn", "");

  router.push(`/${country.code}`);
            }}
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
