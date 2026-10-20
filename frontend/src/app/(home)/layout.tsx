import type { Metadata } from "next";
import "./globals.css";
import { metadata as siteMetadata } from "@/app/metadata/metadata";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { redirectToSavedLanguage } from "@/libs/cookies/cookieHandler";

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const rendirect: void = redirectToSavedLanguage(cookieStore);
  console.log(rendirect);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
