type Props = {
  params: Promise<{ lang: string; slug: string }>;
};
export default async function Page({ params }: Props) {
  const { lang, slug } = await params;

  return (
    <main>
      <h1>
        Page: {slug}, with lang: {lang}
      </h1>
    </main>
  );
}
