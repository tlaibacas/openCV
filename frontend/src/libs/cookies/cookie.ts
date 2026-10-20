import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { countryCodes, countries } from "@/libs/i18n/locales/countries";
import type { Country, CookieCode } from "@/types/types";

export function cookieChecker(
  value: ReadonlyRequestCookies,
  lang: string,
): CookieCode {
  const languageVal: string | undefined = value.get("lang")?.value;
  const warn: boolean | undefined = value.get("warn")?.value === "true";

  if (!languageVal) {
    return { status: false };
  }

  if (!countryCodes.has(languageVal as Country["code"])) {
    return {
      status: true,
      code: "INVALID_LANG",
    };
  }

  if (languageVal !== lang && !warn) {
    return {
      status: true,
      code: "LANG_NOT_EQUAL",
      languageVal: languageVal as Country["code"],
      languageName: countries[languageVal as keyof typeof countries].language,
    };
  }

  return { status: false };
}
