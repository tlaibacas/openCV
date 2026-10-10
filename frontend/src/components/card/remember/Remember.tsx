import styles from "./Remember.module.css";

export default function Remember() {
  return (
    <label className={styles.switch}>
      <input type="checkbox" name="rememberLanguage" />
      <span className={styles.slider}>
        <span className={styles.yes}>YES</span>
        <span className={styles.no}>NO</span>
      </span>
    </label>
  );
}
