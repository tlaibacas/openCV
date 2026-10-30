"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "./Theme.module.css";
import setThemeCookie from "./themeCookie";
import type { ThemeType } from "@/types/types";

type ThemeProps = {
  initialTheme?: ThemeType;
};

const mediaQuery = "(prefers-color-scheme: dark)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(mediaQuery);

  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(mediaQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export default function Theme({ initialTheme }: ThemeProps) {
  const systemDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [manualTheme, setManualTheme] = useState<ThemeType | null>(null);

  const isDark =
    manualTheme !== null
      ? manualTheme === "dark"
      : initialTheme !== undefined
        ? initialTheme === "dark"
        : systemDark;

  function handleChange(checked: boolean) {
    const theme: ThemeType = checked ? "light" : "dark";

    setManualTheme(theme);

    document.documentElement.dataset.theme = theme;

    setThemeCookie(theme);
  }

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="theme"
        checked={!isDark}
        onChange={(event) => handleChange(event.currentTarget.checked)}
      />

      <span className={styles.slider}>
        <span className={styles.sun}></span>
        <span className={styles.moon}></span>
      </span>
    </label>
  );
}
