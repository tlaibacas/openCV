import type { Metadata } from "next";
import "./globals.css";
import { metadata as siteMetadata } from "@/app/metadata/metadata";

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
