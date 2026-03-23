import "server-only";

import { localeDetails, locales, type Locale } from "@/lib/locale-config";
export { getLocalizedPath } from "@/lib/localized-path";

export {
  defaultLocale,
  localeDetails,
  locales,
  type Locale,
} from "@/lib/locale-config";

const dictionaries = {
  fa: () => import("../dictionaries/fa.json").then((module) => module.default),
  ps: () => import("../dictionaries/ps.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDirection(locale: Locale) {
  return localeDetails[locale].direction;
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
