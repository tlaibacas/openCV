import { cookies } from "next/headers";
import { cookieChecker } from "./cookie";
import CookieDialog from "@/components/popUp/cookieDialog";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieResult = cookieChecker(cookieStore, lang);

  return (
    <html lang={lang}>
      <body>
        {children}

        {cookieResult.code === "LANG_DIFFERENT" && (
          <CookieDialog message={cookieResult.message} />
        )}

        {cookieResult.code === "COOKIE_INVALID" && (
          <CookieDialog message={cookieResult.message} />
        )}
      </body>
    </html>
  );
}
