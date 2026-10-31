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
  cookieResult: CookieCode;
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
};
