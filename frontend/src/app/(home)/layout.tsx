import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from "@/app/metadata/metadata";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInitialPreferences } from "@/libs/cookies/cookieHandler";
import Header from "@/components/header/Header";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const preferences = getInitialPreferences(await cookies());

  if (preferences.savedLanguage) {
    redirect(`/${preferences.savedLanguage.value}`);
  }

  return (
    <html lang="en" data-theme={preferences.theme}>
      <body>
        <Header initialTheme={preferences.theme} />
        {children}
      </body>
    </html>
  );
}
