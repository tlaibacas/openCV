export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <main>
      <h1>Home: {lang}</h1>
    </main>
  );
}
