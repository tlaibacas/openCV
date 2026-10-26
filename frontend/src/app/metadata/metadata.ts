import type { Metadata, Viewport } from "next";

const siteUrl = "https://your-domain.com";
const siteName = "OpenCV";
const title = "OpenCV | Full-Stack Developer Portfolio";
const description =
  "Explore my web development portfolio, projects, technical skills, and experience building modern web applications.";
const name = "Tiago";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s | OpenCV",
  },
  description,
  applicationName: siteName,
  authors: [{ name: name }],
  creator: name,
  publisher: name,
  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      pt: "/pt",
      es: "/es",
      fr: "/fr",
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenCV — Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },

  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "Web Development",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML",
    "CSS",
  ],

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
