import type { Metadata, Viewport } from "next";
import type { ChildrenProps } from "@/types/types";
import "./globals.css";
import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from "@/app/metadata/metadata";
import { redirect } from "next/navigation";
import { getInitialPreferences } from "@/libs/cookies/cookieHandler";
import Header from "@/components/header/Header";
import { cookies } from "next/headers";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default async function RootLayout({ children }: ChildrenProps) {
  const preferences = getInitialPreferences(await cookies());

  if (preferences.savedLanguage) {
    redirect(`/${preferences.savedLanguage.value}`);
  }

  return (
    <html lang="en" data-theme={preferences.theme}>
      <body>
        <Header
          initialTheme={preferences.theme}
          langProp={undefined}
          pathProp="/"
        />
        {children}
      </body>
    </html>
  );
}
