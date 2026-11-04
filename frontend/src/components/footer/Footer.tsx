import { Country } from "@/types/types";
import styles from "./Footer.module.css";
import { AllRightsReserved } from "@/libs/i18n/translations/translations";
type FooterProps = {
  langProp: Country["code"];
};
export default function Footer({ langProp }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        {AllRightsReserved[langProp] || "All rights reserved"}
      </p>
      <p>My VirtualCV</p>
    </footer>
  );
}
