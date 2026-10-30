import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from "@/app/metadata/metadata";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redirectToSavedLanguage } from "@/libs/cookies/cookieHandler";
import type { SavedLanguage, ThemeType } from "@/types/types";
import Header from "@/components/header/Header";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value as ThemeType;
  const theme: ThemeType | undefined =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;
  const savedLanguage: SavedLanguage = redirectToSavedLanguage(cookieStore);

  if (savedLanguage.status) {
    redirect(`/${savedLanguage.val}`);
  }

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <Header initialTheme={theme} />
        {children}
      </body>
    </html>
  );
}
