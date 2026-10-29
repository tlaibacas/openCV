import type { Metadata, Viewport } from "next";
import { config } from "@/cfg/site.config";
import { languages } from "@/libs/i18n/locales/countries";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),

  title: {
    default: config.title,
    template: `%s | ${config.siteName}`,
  },
  description: config.description,
  applicationName: config.siteName,
  authors: [{ name: config.authorName }],
  creator: config.authorName,
  category: "technology",

  alternates: {
    canonical: "/",
    languages: Object.fromEntries(
      Object.keys(languages).map((code) => [code, `/${code}`]),
    ),
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: config.siteName,
    title: config.title,
    description: config.description,
    locale: "en_US",
    images: [
      {
        url: config.ogImg,
        width: 1200,
        height: 630,
        alt: `${config.siteName} — ${config.fullstack} Portfolio`,
        type: config.img,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description,
    images: [config.ogImg],
  },

  icons: {
    icon: [{ url: config.ogImg, type: config.img }],
    apple: [{ url: config.ogImg }],
  },

  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#111" },
  ],
};
