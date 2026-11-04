import "@/app/(home)/globals.css";
import { loading } from "@/libs/i18n/translations/translations";
import { Country } from "@/types/types";
import Image from "next/image";
import styles from "./page.module.css";
import Loading from "@/components/main/loading/Loading";
type Props = {
  params: Promise<{ lang: Country["code"] }>;
};

export default async function Page({ params }: Props) {
  const { lang } = await params;

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
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
