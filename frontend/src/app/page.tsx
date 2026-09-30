import "./page.css";
import { countries } from "@/libs/i18n/locates/countries";
import Card from "@/components/card";

export default function Home() {
  return (
    <main>
      <Card countries={countries} />
    </main>
  );
}
