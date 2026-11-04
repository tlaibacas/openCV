import { Country } from "@/types/types";
import styles from "./Footer.module.css";
type FooterProps = {
  langProp?: Country["code"] | undefined;
};
export default function Footer({ langProp }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} My VirtualCV. All rights reserved.
      </p>
      <p>My VirtualCV</p>
    </footer>
  );
}
