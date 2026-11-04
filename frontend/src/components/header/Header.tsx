"use client";
import Theme from "./themeButton/Theme";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import type { ThemeType } from "@/types/types";
import LangBar from "./langBar/LangBar";
type HeaderProps = {
  initialTheme?: ThemeType;
  langProp?: string | undefined;
  pathProp?: string | undefined;
};

export default function Header({
  initialTheme,
  langProp,
  pathProp,
}: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      if (event.deltaY > 0) {
        setHidden(true);
      } else if (event.deltaY < 0) {
        setHidden(false);
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!langProp) return;

    const timeout = setTimeout(() => {
      setHidden(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [langProp]);

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      {pathProp !== "/" && <LangBar langProp={langProp} />}
      <Theme initialTheme={initialTheme} />

      <button
        className={styles.toggle}
        onClick={() => setHidden(!hidden)}
        aria-label={hidden ? "Show header" : "Hide header"}
        aria-expanded={!hidden}
      >
        {hidden ? "▼" : "▲"}
      </button>
    </header>
  );
}
