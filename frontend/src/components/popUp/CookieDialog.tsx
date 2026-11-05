"use client";

import type { CookieCode } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Remember from "@/components/card/remember/Remember";
import styles from "./CookieDialog.module.css";
import { clearCookies, createCookie } from "@/libs/cookies/cookies";
import { invalid } from "@/libs/cookies/cookieHandler";
import {
  dialog,
  dontWarn,
  goTo,
  continueText,
} from "@/libs/i18n/translations/translations";
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
          <p>Your saved language is invalid or the cookie is corrupted.</p>
          <button
            onClick={() => {
              clearCookies("lang", "warn");
              router.refresh();
              router.push("/");
            }}
          >
            Go to home
          </button>
        </>
      ) : (
        <>
          <p>
            {dialog.first[cookie.languageValue] ||
              "Your saved language differs from the current page language."}
          </p>
          <p>
            {dialog.second[cookie.languageValue] ||
              "Would you like to continue or go to your preferred language?"}
          </p>
          <p>{dontWarn[cookie.languageValue] || "Don&apos;t warn me again"}</p>
          <Remember langProp={cookie.languageValue} onChange={setRemember} />
          <div>
            <button onClick={() => router.push(`/${cookie.languageValue}`)}>
              {goTo[cookie.languageValue] || "Go to"} {cookie.languageName}
            </button>
            <button
              onClick={() => {
                createCookie("warn", "true", 300);

                dialogRef.current?.close();
                router.refresh();
              }}
            >
              {continueText[cookie.languageValue] || "Continue"}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
