import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { checkLanguageCookie } from "@/libs/cookies/cookieHandler";
import CookieDialog from "@/components/popUp/CookieDialog";
import { metadata as siteMetadata } from "@/app/metadata/metadata";
import { supportedLanguageCodes } from "@/libs/i18n/locales/countries";
import type { CookieCode, Country, ThemeType } from "@/types/types";

import "@/app/(home)/globals.css";
import Header from "@/components/header/Header";
export const metadata: Metadata = siteMetadata;
type Props = {
  params: Promise<{ lang: string }>;
  children: ReactNode;
};

function isSupportedLanguage(lang: string): lang is Country["code"] {
  return supportedLanguageCodes.has(lang as Country["code"]);
}

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const cookieStore = await cookies();
  const cookieResult: CookieCode = checkLanguageCookie(cookieStore, lang);
  const cookieTheme = cookieStore.get("theme")?.value as ThemeType;
  const theme: ThemeType | undefined =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;

  return (
    <html lang={lang} data-theme={theme}>
      <body>
        <Header initialTheme={theme} />
        {children}
        {cookieResult.status && <CookieDialog cookie={cookieResult} />}
      </body>
    </html>
  );
}
