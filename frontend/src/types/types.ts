type Props = {
  params: Promise<{ lang: string }>;
};
type CardProps = {
  countries: Countries;
};
type Code = "pt" | "en" | "es" | "fr";
type Country = {
  code: Code;
  alt: "Portuguese" | "English" | "Spanish" | "French";
  language: "Português" | "English" | "Español" | "Français";
  flagPath: `/assets/${Code}.svg`;
};
type Countries = Record<Code, Country>;

type CardStyles = {
  container: string;
  card: string;
  flag: string;
  text: string;
};

export type { Props, CardProps, Countries, Code, CardStyles };
