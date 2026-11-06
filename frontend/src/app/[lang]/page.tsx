import "@/app/(home)/globals.css";
import { loading } from "@/libs/i18n/translations/translations";
import { PropsCode } from "@/types/types";
import Image from "next/image";
import styles from "./page.module.css";
import Loading from "@/components/main/loading/Loading";

export default async function Page({ params }: PropsCode) {
  const { lang } = await params;

  return (
    <main className={styles.main}>
      <div>
        <div className={styles.brand}>
          <div className={styles.name}>
            <span className={styles.My}>My</span>
            <Image src="/assets/icon.svg" alt="Icon" width={65} height={50} />
          </div>

          <div className={styles.title}>
            <span className={styles.Virtual}>Virtual</span>
            <span className={styles.CV}>CV</span>
          </div>
        </div>

        <div className={styles.loading}>
          <span>{loading[lang] || "Loading..."}</span>
          <Loading />
        </div>
      </div>
    </main>
  );
}
