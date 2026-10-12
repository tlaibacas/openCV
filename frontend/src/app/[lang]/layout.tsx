import { cookies } from "next/headers";
import RecommendLang from "@/components/recommend/Recommend";
import { countryCodes } from "@/libs/i18n/locales/countries";
import type { Code } from "@/types/types";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const wrong = countryCodes.has(cookieLang as Code);

  const validCookieLang = !cookieLang
    ? false
    : cookieLang !== lang
      ? true
      : !wrong
        ? false
        : true;
  console.log(!wrong);
  console.log(validCookieLang);

  const recommend = Boolean(validCookieLang);
  const wrongCookie = Boolean(!wrong);
  console.log(wrongCookie);
  return (
    <html lang={lang}>
      <body>
        {children}
        {recommend && <RecommendLang lang={cookieLang!} />}
      </body>
    </html>
  );
}
