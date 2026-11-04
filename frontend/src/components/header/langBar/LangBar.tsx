"use client";

import { useState } from "react";
import { languages } from "@/libs/i18n/locales/countries";
import { useRouter } from "next/navigation";
import styles from "./LangBar.module.css";
import Image from "next/image";

function LangBar(langProp?: { langProp: string | undefined }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(langProp?.langProp || "en");
  const router = useRouter();
  const current = languages[selected as keyof typeof languages];

  return (
    <nav className={styles.langBar} aria-label="Language selection">
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Image
          className={styles.flag}
          src={current.flagPath}
          alt={`${current.language} flag`}
          width={120}
          height={80}
          loading="eager"
        />
        {current.language}
        <span aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>

      <ul
        className={`${styles.dropdown} ${open ? styles.open : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        {Object.values(languages).map(({ code, language, flagPath }) => (
          <li key={code}>
            <button
              type="button"
              onClick={() => {
                setSelected(code);
                setOpen(false);
                router.push(`/${code}`);
              }}
              aria-current={selected === code ? "true" : undefined}
            >
              <Image
                className={styles.flag}
                src={flagPath}
                alt={`${language} flag`}
                width={120}
                height={80}
                loading="eager"
              />
              {language}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LangBar;
