const COOKIE_MAX_AGE = 604800;

function createCookie(
  key: string,
  value: string,
  maxAge: number = COOKIE_MAX_AGE,
) {
  document.cookie = `${key}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}
function clearCookies(...names: string[]) {
  names.forEach((name) => {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
  });
}

export { createCookie, clearCookies };
