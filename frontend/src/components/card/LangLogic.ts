function handleLang(remember: boolean) {
  if (remember) {
    localStorage.setItem("rememberLanguage", "true");
  }
}

export { handleLang };
