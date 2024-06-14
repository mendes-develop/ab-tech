export function trimString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
}

export function parseCookieString(cookie?: string) {
  const match = cookie?.match(/(?:^|;\s*)user_id=([^;]*)/);
  return match ? match[1] : null;
}
