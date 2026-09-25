import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenCV",
  description: "Página CV",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
