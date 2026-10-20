function clearLanguageCookies() {
  document.cookie = "lang=; path=/; max-age=0; samesite=lax";
  document.cookie = "warn=; path=/; max-age=0; samesite=lax";
}
function setLanguageWarningPreference(remember: boolean) {
  document.cookie = `warn=${remember}; path=/; max-age=2592000; samesite=lax`;
}

function saveLanguagePreference(remember: boolean, code: string) {
  if (remember) {
    document.cookie = `lang=${code}; path=/; max-age=2592000; samesite=lax`;
  }
}

export {
  clearLanguageCookies,
  setLanguageWarningPreference,
  saveLanguagePreference,
};
