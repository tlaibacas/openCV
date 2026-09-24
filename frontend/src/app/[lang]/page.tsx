import { notFound } from "next/navigation";
import { validLang } from "./page.i18n";
import type { Props } from "@/types/types";

export default async function Page({ params }: Props) {
  const { lang } = await params;

  if (!validLang(lang)) {
    notFound();
  }

  return (
    <main>
      <h1>Language: {lang}</h1>
    </main>
  );
}
