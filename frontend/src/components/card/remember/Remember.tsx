"use client";
import styles from "./Remember.module.css";

export default function Remember({
  onChange,
}: {
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="rememberLanguage"
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      <span className={styles.slider}>
        <span className={styles.yes}>YES</span>
        <span className={styles.no}>NO</span>
      </span>
    </label>
  );
}
