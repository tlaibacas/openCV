import type { Metadata } from "next";
import "./globals.css";
import { metadata as siteMetadata } from "@/app/metadata/metadata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redirectToSavedLanguage } from "@/libs/cookies/cookieHandler";
import type { SavedLanguage } from "@/types/types";

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({ children }: LayoutProps<"/">) {
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
