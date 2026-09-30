type Props = {
  params: Promise<{ lang: string }>;
};
type CardProps = {
  countries: Countries;
};
type Country = {
  code: string;
  alt: string;
  language: string;
  flagPath: string;
};
type Countries = Record<string, Country>;

export type { Props, CardProps, Countries };
