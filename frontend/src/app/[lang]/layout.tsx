import { cookies } from "next/headers";
import { cookieChecker } from "../../libs/cookies/cookie";
import CookieDialog from "@/components/popUp/CookieDialog";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { CookieCode } from "@/types/types";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const cookieResult: CookieCode = cookieChecker(cookieStore, lang);
  return (
    <html lang={lang}>
      <body>
        {children}
        {cookieResult.status && <CookieDialog cookie={cookieResult} />}
      </body>
    </html>
  );
}
