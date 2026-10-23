import { cookies } from "next/headers";
import { checkLanguageCookie } from "../../libs/cookies/cookieHandler";
import CookieDialog from "@/components/popUp/CookieDialog";
import type { CookieCode } from "@/types/types";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
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
