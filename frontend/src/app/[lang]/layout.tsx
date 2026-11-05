export default async function Layout({ children, params }: Props) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const cookieStore = await cookies();
  const langLayoutData = getLanguageLayoutData(cookieStore, lang);
  const theme = getTheme(cookieStore);
  const cookieResult = langLayoutData.cookieResult;

  return (
    <html lang={lang} data-theme={theme}>
      <body>
        {cookieResult.showPage ? (
          <>
            <Header initialTheme={theme} langProp={lang} />
            {children}
            <Footer langProp={lang} />
          </>
        ) : (
          <CookieDialog cookie={cookieResult} />
        )}
      </body>
    </html>
  );
}