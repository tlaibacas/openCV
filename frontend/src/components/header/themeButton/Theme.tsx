"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Theme.module.css";
import setThemeCookie from "./themeCookie";
import type { ThemeType } from "@/types/types";

type ThemeProps = {
  initialTheme?: ThemeType;
};

export default function Theme({ initialTheme }: ThemeProps) {
  const [isDark, setIsDark] = useState(initialTheme === "dark");
  const manualTheme = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    if (!initialTheme) {
      setIsDark(media.matches);
    }

    function handleChange(event: MediaQueryListEvent) {
      if (!initialTheme && !manualTheme.current) {
        setIsDark(event.matches);
      }
    }

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [initialTheme]);

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="theme"
        checked={!isDark}
        onChange={(event) => {
          const checked = event.currentTarget.checked;
          const theme: ThemeType = checked ? "light" : "dark";

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
