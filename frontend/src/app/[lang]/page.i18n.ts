import { langs } from "@/libs/i18n/index";

export function validLang(lang: string): boolean {
  return langs.has(lang);
}
