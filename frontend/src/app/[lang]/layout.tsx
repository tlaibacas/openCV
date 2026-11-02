import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { metadata as siteMetadata } from "@/app/metadata/metadata";
import {
  isSupportedLanguage,
  getLanguageLayoutData,
} from "@/libs/cookies/cookieHandler";

import CookieDialog from "@/components/popUp/CookieDialog";
import Header from "@/components/header/Header";

import "@/app/(home)/globals.css";

export const metadata: Metadata = siteMetadata;

type Props = {
  params: Promise<{ lang: string }>;
  children: ReactNode;
};

export default async function Layout({ children, params }: Props) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const preferences = await getLanguageLayoutData(lang);

  return (
    <html lang={lang} data-theme={preferences.theme}>
      <body>
        <Header initialTheme={preferences.theme} />
        {children}
        {preferences.cookieResult && (
          <CookieDialog cookie={preferences.cookieResult} />
        )}
      </body>
    </html>
  );
}
