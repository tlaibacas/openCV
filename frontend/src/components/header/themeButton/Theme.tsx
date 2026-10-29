"use client";

import { useState } from "react";
import styles from "./Theme.module.css";
import setThemeCookie from "./themeCookie";

export default function Theme() {
  const [isDark, setIsDark] = useState(false);

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="theme"
        checked={!isDark}
        onChange={(event) => {
          const checked = event.currentTarget.checked;
          setIsDark(!checked);
          setThemeCookie(checked ? "light" : "dark");
        }}
      />

      <span className={styles.slider}>
        <span className={styles.sun}></span>
        <span className={styles.moon}></span>
      </span>
    </label>
  );
}
