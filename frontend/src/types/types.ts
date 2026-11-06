import { ReactNode } from "react";

type LanguageCode = "pt" | "en" | "es" | "fr";

type ThemeType = "light" | "dark";

type Country = {
  code: LanguageCode;
  alt: "Portuguese" | "English" | "Spanish" | "French";
  language: "Português" | "English" | "Español" | "Français";
  flagPath: `/assets/${LanguageCode}.svg`;
};

type ChildrenProps = {
  children: ReactNode;
};
type PropsCode = {
  params: Promise<{ lang: Country["code"] }>;
};

type LangProps = ChildrenProps & {
  params: Promise<{ lang: string }>;
};

type CardProps = {
  countries: Countries;
};

type Countries = Record<Country["code"], Country>;

type CardStyles = {
  container: string;
  card: string;
  flag: string;
  text: string;
};

type CookieCode =
  | {
      code: "INVALID";
      showPage: false;
    }
  | {
      code: "NOT_EQUAL";
      languageValue: Country["code"];
      languageName: Country["language"];
      showPage: false;
    }
  | {
      showPage: true;
    };

type SavedLanguage = {
  value?: Country["code"] | undefined;
};

type Translations = Record<Country["code"], string>;

export type {
  Translations,
  ChildrenProps,
  Country,
  CardProps,
  Countries,
  CardStyles,
  CookieCode,
  SavedLanguage,
  ThemeType,
  LangProps,
  PropsCode,
};
