"use client";

import { useState } from "react";
import { languages } from "@/libs/i18n/locales/countries";

import styles from "./LangBar.module.css";

function LangBar(langProp?: { langProp: string | undefined }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(langProp?.langProp || "en");

  const current = languages[selected as keyof typeof languages];

  return (
    <nav className={styles.langBar} aria-label="Language selection">
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <img src={current.flagPath} alt="" />
        {current.language}
        <span aria-hidden="true">⌄</span>
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {Object.values(languages).map(({ code, language, flagPath }) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => {
                  setSelected(code);
                  setOpen(false);
                }}
                aria-current={selected === code ? "true" : undefined}
              >
                <img src={flagPath} alt="" />
                {language}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default LangBar;
