import { cookies } from "next/headers";
import RecommendLang from "@/components/popUps/RecommendLang";
import RevokeCookie from "@/components/popUps/RevokeCookie";
import { countryCodes } from "@/libs/i18n/locales/countries";
import type { Code } from "@/types/types";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieLang: string | undefined = cookieStore.get("lang")?.value;
  const wrong: boolean = Boolean(
    countryCodes.has(cookieLang as Code) || undefined,
  );

  const validCookieLang: boolean = !cookieLang
    ? false
    : cookieLang !== lang
      ? wrong
      : false;

  const validCookie = Boolean(validCookieLang);
  const revokeWrong: boolean = !wrong;

  return (
    <html lang={lang}>
      <body>
        {children}
        {validCookie && <RecommendLang lang={cookieLang!} />}
        {revokeWrong && <RevokeCookie />}
      </body>
    </html>
  );
}
