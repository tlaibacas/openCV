"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Theme.module.css";
import setThemeCookie from "./themeCookie";

export default function Theme() {
  const [isDark, setIsDark] = useState(false);
  const manualTheme = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDark(media.matches);

    function handleChange(event: MediaQueryListEvent) {
      if (!manualTheme.current) {
        setIsDark(event.matches);
      }
    }

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="theme"
        checked={!isDark}
        onChange={(event) => {
          const checked = event.currentTarget.checked;
          const theme = checked ? "light" : "dark";

          manualTheme.current = true;
          setIsDark(!checked);

          document.documentElement.dataset.theme = theme;
          setThemeCookie(theme);
        }}
      />

      <span className={styles.slider}>
        <span className={styles.sun}></span>
        <span className={styles.moon}></span>
      </span>
    </label>
  );
}
