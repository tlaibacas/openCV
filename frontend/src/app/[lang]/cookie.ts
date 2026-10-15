import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { countryCodes } from "@/libs/i18n/locales/countries";
import type { Country, CookieCode } from "@/types/types";

export function cookieChecker(
  value: ReadonlyRequestCookies,
  lang: string,
): CookieCode {
  const cookieLang = value.get("lang")?.value;
  console.log("value", cookieLang, "lang", lang);
  if (!cookieLang) {
    return {
      code: "COOKIE_MISSING",
    };
  }
  if (!countryCodes.has(cookieLang as Country["code"])) {
    return { code: "COOKIE_INVALID", message: "A lingua é invalida" };
  }
  if (cookieLang !== lang) {
    return {
      code: "LANG_DIFFERENT",
      message: "A língua guardada é diferente da língua atual.",
    };
  }
  return { code: "LANG_MATCH" };
}
