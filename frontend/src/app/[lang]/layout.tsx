import { cookies } from "next/headers";
import RecommendLang from "@/components/popUps/RecommendLang/RecommendLang";
import RevokeCookie from "@/components/popUps/RevokeCookie";
import { countryCodes } from "@/libs/i18n/locales/countries";
import type { Country } from "@/types/types";
import style from "./layout.module.css";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieLang: string | undefined = cookieStore.get("lang")?.value;
  const cookieAlt: string | undefined = cookieStore.get("alt")?.value;
  const wrong: boolean = Boolean(
    countryCodes.has(cookieLang as Country["code"]) || undefined,
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
        <div className={validCookie ? style.opaque : undefined}>{children}</div>
        {validCookie && (
          <RecommendLang
            lang={cookieLang! as Country["code"]}
            alt={cookieAlt! as Country["alt"]}
          />
        )}
        {revokeWrong && <RevokeCookie />}
      </body>
    </html>
  );
}
