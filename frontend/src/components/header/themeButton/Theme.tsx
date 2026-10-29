"use client";

import styles from "./Theme.module.css";

export default function Theme({
  onChange,
}: {
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="theme"
        onChange={(event) => onChange(event.currentTarget.checked)}
      />

      <span className={styles.slider}>
        <span className={styles.sun}></span>
        <span className={styles.moon}></span>
      </span>
    </label>
  );
}
