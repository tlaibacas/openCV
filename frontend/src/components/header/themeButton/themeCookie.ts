export default function setThemeCookie(theme: "light" | "dark") {
  document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;

  console.log("Cookie definida:", document.cookie);
}
