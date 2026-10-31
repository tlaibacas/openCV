import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type {
  Country,
  CookieCode,
  SavedLanguage,
  ThemeType,
} from "@/types/types";
import {
  supportedLanguageCodes,
  languages,
} from "@/libs/i18n/locales/countries";

type InitialPreferences = {
  theme: ThemeType | undefined;
  savedLanguage: SavedLanguage;
};

function isSupportedLanguage(value: string): value is Country["code"] {
  return supportedLanguageCodes.has(value as Country["code"]);
}

function redirectToSavedLanguage(
  cookies: ReadonlyRequestCookies,
): SavedLanguage {
  const savedLanguage: string | undefined = cookies.get("lang")?.value;

  if (!savedLanguage || !isSupportedLanguage(savedLanguage)) {
    return { status: false };
  }

  return { status: true, val: savedLanguage };
}

function checkLanguageCookie(
  cookies: ReadonlyRequestCookies,
  currentLanguage?: string,
): CookieCode {
  const savedLanguage: string | undefined = cookies.get("lang")?.value;
  const hasDisabledLanguageWarning: boolean =
    cookies.get("warn")?.value === "true";

  if (!savedLanguage) {
    return { status: false };
  }

  if (!supportedLanguageCodes.has(savedLanguage as Country["code"])) {
    return {
      status: true,
      code: "INVALID_LANG",
    };
  }

  if (savedLanguage !== currentLanguage && !hasDisabledLanguageWarning) {
    return {
      status: true,
      code: "LANG_NOT_EQUAL",
      languageVal: savedLanguage as Country["code"],
      languageName: languages[savedLanguage as keyof typeof languages].language,
    };
  }

  return {
    status: false,
    code: "LANGUAGE_COOKIE_VALID",
  };
}

function getInitialPreferences(
  cookieStore: ReadonlyRequestCookies,
): InitialPreferences {
  const cookieTheme = cookieStore.get("theme")?.value;

  const theme: ThemeType | undefined =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;

  const savedLanguage = redirectToSavedLanguage(cookieStore);

  return { theme, savedLanguage };
}

export { redirectToSavedLanguage, checkLanguageCookie, getInitialPreferences };
