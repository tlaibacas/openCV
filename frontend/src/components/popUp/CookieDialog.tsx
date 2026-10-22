"use client";

import type { CookieCode } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Remember from "@/components/card/remember/Remember";
import {
  clearLanguageCookies,
  setLanguageWarningPreference,
} from "@/libs/cookies/cookieHandler";
import styles from "./CookieDialog.module.css";
type Props = {
  cookie: CookieCode;
};

export default function CookieDialog({ cookie }: Props) {
  const [remember, setRemember] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog: HTMLDialogElement | null = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [cookie.code]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      {cookie.code === "INVALID_LANG" ? (
        <>
          <p>{cookie.code}</p>
          <p>Your saved language is invalid or the cookie is corrupted.</p>
          <button
            onClick={() => {
              clearLanguageCookies();
              router.push("/");
            }}
          >
            Go to home
          </button>
        </>
      ) : (
        <>
          <p>
            Your saved language differs from the current page. Would you like to
            continue or go to your preferred language?
          </p>
          <p>Don&apos;t warn me again</p>
          <Remember onChange={setRemember} />
          <button onClick={() => router.push(`/${cookie.languageVal}`)}>
            Go to {cookie.languageName}
          </button>
          <button
            onClick={() => {
              setLanguageWarningPreference(remember);
              dialogRef.current?.close();
            }}
          >
            Continue
          </button>
        </>
      )}
    </dialog>
  );
}
