import { Countries } from "@/types/types";

const languages: Countries = {
  pt: {
    code: "pt",
    alt: "Portuguese",
    language: "Português",
    flagPath: "/assets/pt.svg",
  },
  en: {
    code: "en",
    alt: "English",
    language: "English",
    flagPath: "/assets/en.svg",
  },
  es: {
    code: "es",
    alt: "Spanish",
    language: "Español",
    flagPath: "/assets/es.svg",
  },
  fr: {
    code: "fr",
    alt: "French",
    language: "Français",
    flagPath: "/assets/fr.svg",
  },
};

const supportedLanguageCodes = new Set(
  Object.values(languages).map(({ code }) => code),
);

export { languages, supportedLanguageCodes };
