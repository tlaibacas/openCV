"use client";
import Theme from "./themeButton/Theme";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import type { ThemeType } from "@/types/types";
type HeaderProps = {
  initialTheme?: ThemeType;
};

export default function Header({ initialTheme }: HeaderProps) {
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

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      <Theme initialTheme={initialTheme} />

      <button
        className={styles.toggle}
        onClick={() => setHidden(!hidden)}
        aria-label={hidden ? "Mostrar header" : "Esconder header"}
        aria-expanded={!hidden}
      >
        {hidden ? "▼" : "▲"}
      </button>
    </header>
  );
}
