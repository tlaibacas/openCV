import { countryCodes } from "@/libs/i18n/locales/countries";

export async function register() {
  console.log("Country codes loaded:", countryCodes.size);
}
