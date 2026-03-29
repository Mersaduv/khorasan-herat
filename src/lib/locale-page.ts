import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { buildLanguageAlternates, buildPageMetadata } from "@/lib/seo";

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
    languages: buildLanguageAlternates(path),
  };
}

export async function buildLocaleMetadata(
  locale: string,
  path = "",
  overrides?: { title?: string; description?: string; imagePath?: string; keywords?: string[] },
): Promise<Metadata> {
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);

  return buildPageMetadata({
    locale: activeLocale,
    path,
    title: overrides?.title ?? dictionary.meta.title,
    description: overrides?.description ?? dictionary.meta.description,
    imagePath: overrides?.imagePath,
    keywords: overrides?.keywords,
  });
}
