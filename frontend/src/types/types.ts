type Props = {
  params: Promise<{ lang: string }> | { lang: string };
};

type Param = {
  lang: Country["code"];
  alt: Country["alt"];
};

type CardProps = {
  countries: Countries;
};
type LanguageCode = "pt" | "en" | "es" | "fr";

type Country = {
  code: LanguageCode;
  alt: "Portuguese" | "English" | "Spanish" | "French";
  language: "Português" | "English" | "Español" | "Français";
  flagPath: `/assets/${LanguageCode}.svg`;
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
    }
  | {
      code: "NOT_EQUAL";
      languageValue: Country["code"];
      languageName: Country["language"];
    };

type SavedLanguage = {
  value?: Country["code"] | undefined;
};

type Translations = Record<Country["code"], string>;

type ThemeType = "light" | "dark";

export type {
  Translations,
  Props,
  Country,
  CardProps,
  Countries,
  CardStyles,
  Param,
  CookieCode,
  SavedLanguage,
  ThemeType,
};
