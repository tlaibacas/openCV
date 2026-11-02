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
import { cookies } from "next/headers";

const invalid = "INVALID";
const notEqual = "NOT_EQUAL";

function isSupportedLanguage(value: string): value is Country["code"] {
  return supportedLanguageCodes.has(value as Country["code"]);
}

function redirectToSavedLanguage(
  cookies: ReadonlyRequestCookies,
): SavedLanguage {
  const savedLanguage: string | undefined = cookies.get("lang")?.value;

  if (!savedLanguage || !isSupportedLanguage(savedLanguage)) {
    return;
  }

  return { value: savedLanguage };
}

function checkLanguageCookie(
  cookies: ReadonlyRequestCookies,
  currentLanguage?: string,
): CookieCode | undefined {
  const savedLanguage: string | undefined = cookies.get("lang")?.value;
  const hasDisabledLanguageWarning: boolean =
    cookies.get("warn")?.value === "true";

  if (!savedLanguage) {
    return;
  }

  if (!supportedLanguageCodes.has(savedLanguage as Country["code"])) {
    return {
      code: invalid,
    };
  }

  if (savedLanguage !== currentLanguage && !hasDisabledLanguageWarning) {
    return {
      code: notEqual,
      languageVal: savedLanguage as Country["code"],
      languageName: languages[savedLanguage as keyof typeof languages].language,
    };
  }

  return;
}

function getTheme(cookieStore: ReadonlyRequestCookies): ThemeType | undefined {
  const theme = cookieStore.get("theme")?.value;

  return theme === "light" || theme === "dark" ? theme : undefined;
}

function getInitialPreferences(cookieStore: ReadonlyRequestCookies): {
  theme: ThemeType | undefined;
  savedLanguage: SavedLanguage;
} {
  return {
    theme: getTheme(cookieStore),
    savedLanguage: redirectToSavedLanguage(cookieStore),
  };
}

async function getLanguageLayoutData(lang: string): Promise<{
  theme: ThemeType | undefined;
  cookieResult: CookieCode | undefined;
}> {
  const cookieStore = await cookies();

  return {
    theme: getTheme(cookieStore),
    cookieResult: checkLanguageCookie(cookieStore, lang),
  };
}

export {
  redirectToSavedLanguage,
  checkLanguageCookie,
  getInitialPreferences,
  isSupportedLanguage,
  getLanguageLayoutData,
  invalid,
};
