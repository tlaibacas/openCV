"use client";

import { useRef } from "react";
import styles from "./RecommendLang.module.css";

export default function RecommendLang({ lang, alt }: Param) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        We detected that you previously saved{" "}
        <i>
          <b>{alt}</b>
        </i>{" "}
        as your preferred language.
      </h1>

      <button type="button" onClick={() => alert(`Saved language: ${alt}`)}>
        Test alert
      </button>

      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        Test dialog
      </button>

      <dialog ref={dialogRef}>
        <h2>Language recommendation</h2>
        <p>
          Your saved language is {alt} ({lang}).
        </p>
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Close
        </button>
      </dialog>
    </main>
  );
}
