import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";

export type LocalePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function getLocaleData(locale: string) {
  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return {
    dictionary,
    locale: locale as Locale,
  };
}

export function buildAlternates(path = "") {
  return {
    languages: {
      fa: `/fa${path}`,
      ps: `/ps${path}`,
      en: `/en${path}`,
    },
  };
}

export async function buildLocaleMetadata(
  locale: string,
  path = "",
  overrides?: { title?: string; description?: string },
): Promise<Metadata> {
  const { dictionary } = await getLocaleData(locale);

  return {
    title: overrides?.title ?? dictionary.meta.title,
    description: overrides?.description ?? dictionary.meta.description,
    alternates: buildAlternates(path),
  };
}
