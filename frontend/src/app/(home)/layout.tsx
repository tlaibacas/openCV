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
import type { SavedLanguage } from "@/types/types";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const cookieStore = await cookies();
  const savedLanguage: SavedLanguage = redirectToSavedLanguage(cookieStore);

  if (savedLanguage.status) {
    redirect(`/${savedLanguage.val}`);
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
