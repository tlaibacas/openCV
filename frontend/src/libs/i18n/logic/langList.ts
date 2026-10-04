import { countries } from "../locales/countries";

export const langList = Object.values(countries).map(
  ({ code, alt, language, flagPath, ...country }) => ({
    code,
    alt,
    language,
    flagPath,
    ...country,
  }),
);
