import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { getCanonicalUrl } from "@/lib/seo";

const localizedRoutes = ["", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    localizedRoutes.map((route) => ({
      url: getCanonicalUrl(locale, route),
      lastModified: now,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/contact" ? 0.85 : 0.8,
    })),
  );
}
