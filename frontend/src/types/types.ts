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

type Country = {
  code: "pt" | "en" | "es" | "fr";
  alt: "Portuguese" | "English" | "Spanish" | "French";
  language: "Português" | "English" | "Español" | "Français";
  flagPath: `/assets/${Country["code"]}.svg`;
};

type Countries = Record<Country["code"], Country>;

type CardStyles = {
  container: string;
  card: string;
  flag: string;
  text: string;
};
type Code = "INVALID_LANG" | "LANG_NOT_EQUAL" | "LANGUAGE_COOKIE_VALID";
type CookieCode = {
  status: boolean;
  code?: Code | undefined;
  languageVal?: Country["code"];
  languageName?: Country["language"];
};

type SavedLanguage = {
  status: boolean | undefined;
  val?: Country["code"] | undefined;
};

export type {
  Props,
  Country,
  CardProps,
  Countries,
  CardStyles,
  Param,
  CookieCode,
  SavedLanguage,
};
