function handleLang(remember: boolean, code: string) {
  if (remember) {
    localStorage.setItem("rememberLanguage", code);
  }
}

export { handleLang };
