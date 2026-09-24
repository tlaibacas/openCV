import flag from "@/libs/i18n/flags/flag.json";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Select your language</h1>

      <div className={styles.countries}>
        {Object.entries(flag).map(([code, data]) => (
          <a key={code} href={`/${code}`} className={styles.country}>
            <Image
              src={data.flag}
              alt={`${data.nationality} flag`}
              width={120}
              height={80}
              loading="eager"
              className={styles.flag}
            />

            <span className={styles.countryName}>{data.language}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
