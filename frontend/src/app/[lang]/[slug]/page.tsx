export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;

  return (
    <main>
      <h1>
        Page: {slug}, with lang: {lang}
      </h1>
    </main>
  );
}
