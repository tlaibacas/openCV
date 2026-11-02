"use client";

import type { CookieCode } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Remember from "@/components/card/remember/Remember";
import styles from "./CookieDialog.module.css";
import { clearCookies, createCookie } from "@/libs/cookies/cookies";
import { invalid } from "@/libs/cookies/cookieHandler";
type Props = {
  cookie: CookieCode;
};

export default function CookieDialog({ cookie }: Props) {
  const [remember, setRemember] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [cookie.code]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${
        cookie.code === invalid ? styles.invalid : styles.warning
      }`}
    >
      {cookie.code === invalid ? (
        <>
          <p>{cookie.code}</p>
          <p>Your saved language is invalid or the cookie is corrupted.</p>
          <button
            onClick={() => {
              clearCookies("lang", "warn");
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
          <div>
            <button onClick={() => router.push(`/${cookie.languageValue}`)}>
              Go to {cookie.languageName}
            </button>
            <button
              onClick={() => {
                createCookie("warn", String(remember));
                dialogRef.current?.close();
              }}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
