const COOKIE_MAX_AGE: number = 604800;

function createCookie(key: string, value: string) {
  document.cookie = `${key}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}
function clearCookies(...names: string[]) {
  names.forEach((name) => {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
  });
}

export { createCookie, clearCookies };
