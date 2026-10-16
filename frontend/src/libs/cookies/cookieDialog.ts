function removeCookie() {
  document.cookie = "lang=; path=/; max-age=0; samesite=lax";
  document.cookie = "warn=; path=/; max-age=2592000; samesite=lax";

  window.location.replace("/");
}
function dontWarn(remember: boolean) {
  document.cookie = `warn=${remember}; path=/; max-age=2592000; samesite=lax`;
  window.location.replace("/");
}

export { removeCookie, dontWarn };
