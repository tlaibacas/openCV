"use client";
import Theme from "./themeButton/Theme";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [, setTheme] = useState(false);
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
      {/* <nav>
        <a href="/">Início</a>
        <a href="/about">Sobre</a>
      </nav> */}
      <Theme />
    </header>
  );
}
