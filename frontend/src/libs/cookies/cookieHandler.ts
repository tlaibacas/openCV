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

type CookieStore = {
  get(name: string): { value: string } | undefined;
  has(name: string): boolean;
};

const invalid = "INVALID";
const notEqual = "NOT_EQUAL";

function isSupportedLanguage(value: string): value is Country["code"] {
  return supportedLanguageCodes.has(value as Country["code"]);
}

function redirectToSavedLanguage(
  cookieStore: CookieStore,
): SavedLanguage | undefined {
  const savedLanguage = cookieStore.get("lang")?.value;

  if (!savedLanguage || !isSupportedLanguage(savedLanguage)) return;

  return { value: savedLanguage };
}

function checkLanguageCookie(
  cookieStore: CookieStore,
  currentLanguage?: string | undefined,
): CookieCode | undefined {
  const savedLanguage = cookieStore.get("lang")?.value;
  const hasDisabledLanguageWarning = cookieStore.get("warn")?.value === "true";

  if (!savedLanguage) return;

  if (!isSupportedLanguage(savedLanguage)) {
    return { code: invalid };
  }

  if (savedLanguage !== currentLanguage && !hasDisabledLanguageWarning) {
    return {
      code: notEqual,
      languageValue: savedLanguage,
      languageName: languages[savedLanguage].language,
    };
  }
}

function getTheme(cookieStore: CookieStore): ThemeType | undefined {
  const theme = cookieStore.get("theme")?.value;

  return theme === "light" || theme === "dark" ? theme : undefined;
}

function getInitialPreferences(cookieStore: CookieStore): {
  theme: ThemeType | undefined;
  savedLanguage: SavedLanguage | undefined;
} {
  return {
    theme: getTheme(cookieStore),
    savedLanguage: redirectToSavedLanguage(cookieStore),
  };
}

function getLanguageLayoutData(
  cookieStore: CookieStore,
  lang: string,
): { cookieResult: CookieCode | undefined; showPage: boolean } {
  return {
    cookieResult: checkLanguageCookie(cookieStore, lang),
    showPage:
  cookieStore.has("warn") &&
  cookieStore.get("warn")?.value !== "false",
  };
}

export {
  redirectToSavedLanguage,
  checkLanguageCookie,
  getInitialPreferences,
  isSupportedLanguage,
  getLanguageLayoutData,
  getTheme,
  invalid,
};
