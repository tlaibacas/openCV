import { langs } from "@/libs/i18n/index";

function LanguageNotFound() {
  return (
    <main>
      <h1>404</h1>
      <h2>Language not found</h2>
      <p>The requested language does not exist.</p>
      <p>Try: {Array.from(langs).join(", ")}</p>
    </main>
  );
}

export default LanguageNotFound;
