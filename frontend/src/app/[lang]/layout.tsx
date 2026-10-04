export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
