const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path with the deploy base (e.g. /Samatvam). */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** True when `href` is the current page (or a parent section of it). */
export function isActive(href: string, pathname: string): boolean {
  const strip = (p: string) => p.replace(/\/+$/, '') || '/';
  const current = strip(pathname.slice(base.length) || '/');
  const target = strip(href);
  return target === '/' ? current === '/' : current === target || current.startsWith(`${target}/`);
}
