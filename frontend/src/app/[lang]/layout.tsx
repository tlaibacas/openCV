
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { metadata as siteMetadata } from "@/app/metadata/metadata";
import {
  isSupportedLanguage,
  getLanguageLayoutData,
  getTheme,
} from "@/libs/cookies/cookieHandler";

import CookieDialog from "@/components/popUp/CookieDialog";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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

  const cookieStore = await cookies();
  const langLayoutData = getLanguageLayoutData(cookieStore, lang);
  const theme = getTheme(cookieStore);
  const cookieResult = langLayoutData.cookieResult;

  return (
    <html lang={lang} data-theme={theme}>
      <body>
        {cookieResult.showPage ? (
          <>
            <Header initialTheme={theme} langProp={lang} />
            {children}
            <Footer langProp={lang} />
          </>
        ) : (
          <CookieDialog cookie={cookieResult} />
        )}
      </body>
    </html>
  );
}
