import styles from "./Remember.module.css";

export default function Remember() {
  return (
    <label className={styles.switch}>
      <input type="checkbox" name="rememberLanguage" />
      <span className={styles.slider}></span>
      Remember language
    </label>
  );
}
