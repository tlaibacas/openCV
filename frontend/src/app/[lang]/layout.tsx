import { cookies } from "next/headers";
import RecommendLang from "@/components/recommend/Recommend";

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const recommend = !cookieLang ? false : cookieLang !== lang ? true : false;

  return (
    <html lang={lang}>
      <body>
        {children}
        {recommend && <RecommendLang lang={cookieLang!} />}
      </body>
    </html>
  );
}
