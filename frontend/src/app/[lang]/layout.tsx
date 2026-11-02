import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadata as siteMetadata } from "@/app/metadata/metadata";
import {
  isSupportedLanguage,
  getLanguageLayoutData,
  getTheme,
} from "@/libs/cookies/cookieHandler";
import CookieDialog from "@/components/popUp/CookieDialog";
import Header from "@/components/header/Header";
import "@/app/(home)/globals.css";
import { cookies } from "next/dist/server/request/cookies";
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

  const langLayoutData = getLanguageLayoutData(await cookies(), lang);
  const theme = getTheme(await cookies());

  return (
    <html lang={lang} data-theme={theme}>
      <body>
        <Header initialTheme={theme} />
        {children}
        {langLayoutData.cookieResult && (
          <CookieDialog cookie={langLayoutData.cookieResult} />
        )}
      </body>
    </html>
  );
}
