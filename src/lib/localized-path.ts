import type { Locale } from "@/lib/locale-config";

export function getLocalizedPath(locale: Locale, href: string) {
  if (!href || href === "/") {
    return `/${locale}`;
  }

  if (href.startsWith("#")) {
    return `/${locale}${href}`;
  }

  if (href.startsWith("/")) {
    return href === `/${locale}` || href.startsWith(`/${locale}/`)
      ? href
      : `/${locale}${href}`;
  }

  return `/${locale}/${href}`;
}
