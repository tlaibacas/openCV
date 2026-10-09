export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <main>
      <h1>Language</h1>
      <p>{lang}</p>
    </main>
  );
}
