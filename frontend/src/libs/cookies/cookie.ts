import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { countryCodes } from "@/libs/i18n/locales/countries";
import { countries } from "@/libs/i18n/locales/countries";
import type { Country, CookieCode } from "@/types/types";

export function cookieChecker(
  value: ReadonlyRequestCookies,
  lang: string,
): CookieCode {
  const languageVal = value.get("lang")?.value as Country["code"];
  const languageName = countries[languageVal as keyof typeof countries]
    ?.alt as Country["alt"];

  if (!languageVal) {
    return {
      status: false,
    };
  }
  if (!countryCodes.has(languageVal as Country["code"])) {
    return {
      status: true,
      code: "INVALID_LANG",
      languageVal: languageVal,
      languageName: languageName,
    };
  }
  if (languageVal !== lang) {
    return {
      status: true,
      code: "INVALID_SAVED_LANG",
      languageVal: languageVal,
      languageName: languageName,
    };
  }
  return { status: false };
}
