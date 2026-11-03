"use client";

import { remember } from "@/libs/i18n/translations/translations";
import type { Country } from "@/types/types";
import styles from "./Remember.module.css";

type Props = {
  onChange: (checked: boolean) => void;
  langProp?: Country["code"];
};

export default function Remember({ onChange, langProp }: Props) {
  return (
    <label className={`${styles.switch} switch`}>
      <input
        type="checkbox"
        name="rememberLanguage"
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      <span className={`${styles.slider} slider`}>
        <span className={styles.yes}>
          {langProp ? remember.first[langProp] : "Yes"}
        </span>
        <span className={styles.no}>
          {langProp ? remember.second[langProp] : "No"}
        </span>
      </span>
    </label>
  );
}
