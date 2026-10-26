import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { checkLanguageCookie } from "@/libs/cookies/cookieHandler";
import CookieDialog from "@/components/popUp/CookieDialog";
import { metadata as siteMetadata } from "@/app/metadata/metadata";
import { supportedLanguageCodes } from "@/libs/i18n/locales/countries";
import type { CookieCode, Country } from "@/types/types";

import "@/app/(home)/globals.css";

type Props = {
  params: Promise<{ lang: string }>;
  children: ReactNode;
};

export const metadata: Metadata = siteMetadata;

function isSupportedLanguage(lang: string): lang is Country["code"] {
  return supportedLanguageCodes.has(lang as Country["code"]);
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const cookieStore = await cookies();
  const cookieResult: CookieCode = checkLanguageCookie(cookieStore, lang);

  return (
    <html lang={lang}>
      <body>
        {children}
        {cookieResult.status && <CookieDialog cookie={cookieResult} />}
      </body>
    </html>
  );
}
