export function handleLang(remember: boolean, code: string) {
  if (remember) {
    document.cookie = `lang=${code}; path=/; max-age=2592000; samesite=lax`;
  }

  window.location.href = code;
}
