import "@/app/(home)/globals.css";
import { loading } from "@/libs/i18n/translations/translations";
import { Country } from "@/types/types";

type Props = {
  params: Promise<{ lang: Country["code"] }>;
};

export default async function Page({ params }: Props) {
  const { lang } = await params;

  return (
    <main>
      <h1>{loading[lang]}</h1>
    </main>
  );
}
