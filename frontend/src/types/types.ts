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

export type { Props, Country, CardProps, Countries, CardStyles, Param };
