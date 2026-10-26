import { cookies } from "next/headers";
import { checkLanguageCookie } from "../../libs/cookies/cookieHandler";
import CookieDialog from "@/components/popUp/CookieDialog";
import type { CookieCode } from "@/types/types";
import "@/app/(home)/globals.css";
import { ReactNode } from "react";
import { metadata as siteMetadata } from "@/app/metadata/metadata";
import { Metadata } from "next/types";
type Props = {
  params: Promise<{ lang: string }>;
  children: ReactNode;
};
export const metadata: Metadata = siteMetadata;
export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieResult: CookieCode = checkLanguageCookie(cookieStore, lang);

  return (
    <html lang={lang}>
      <body>
        {children}
        {cookieResult.status && <CookieDialog cookie={cookieResult} />}
      </body>
    </html>
  );
}
