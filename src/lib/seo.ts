import type { Metadata } from "next";

import { defaultLocale, locales, type Dictionary, type Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/localized-path";

const FALLBACK_SITE_URL = "https://khorasan-herat.com";

const SITE_URL_CANDIDATES = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
];

const localeMetadata = {
  fa: {
    localeTag: "fa_AF",
    organizationName: "شرکت صنعتی ذوب آهن خراسان هرات",
    keywords: [
      "خراسان هرات",
      "ذوب آهن خراسان هرات",
      "کارخانه میلگرد هرات",
      "میلگرد هرات",
      "سیخ گول هرات",
      "محصولات فولادی افغانستان",
      "فروش میلگرد افغانستان",
      "قیمت میلگرد هرات",
      "خرید میلگرد 8 تا 32",
      "میلگرد ASTM افغانستان",
      "میلگرد گرید 60",
      "میلگرد گرید 75",
      "تامین آهن آلات پروژه",
      "پیش فاکتور میلگرد",
      "فروش عمده میلگرد",
      "فولاد ساختمانی افغانستان",
    ],
  },
  ps: {
    localeTag: "ps_AF",
    organizationName: "د خراسان هرات د فولادو صنعتي شرکت",
    keywords: [
      "خراسان هرات",
      "د هرات د میلګرد فابریکه",
      "میلګرد هرات",
      "سیخ ګول هرات",
      "د افغانستان فولادي محصولات",
      "د میلګرد پلور افغانستان",
      "د هرات د میلګرد بیه",
      "له 8 تر 32 ملي متره میلګرد",
      "ASTM میلګرد افغانستان",
      "60 ګریډ میلګرد",
      "75 ګریډ میلګرد",
      "د پروژو لپاره د اوسپنې تامين",
      "چټک پیش فاکتور",
      "عمده پلور میلګرد",
      "ساختماني فولاد افغانستان",
    ],
  },
  en: {
    localeTag: "en",
    organizationName: "Khorasan Herat Iron and Steel Company",
    keywords: [
      "Khorasan Herat",
      "Khorasan Herat steel company",
      "Herat rebar manufacturer",
      "Afghanistan steel supplier",
      "Herat steel products",
      "rebar 8mm to 32mm Afghanistan",
      "ASTM rebar Herat",
      "grade 60 rebar Afghanistan",
      "grade 75 rebar Afghanistan",
      "project steel supply Afghanistan",
      "bulk rebar supplier Herat",
      "proforma invoice steel supplier",
      "construction steel Afghanistan",
      "Herat iron company",
      "industrial steel company Afghanistan",
    ],
  },
} as const satisfies Record<
  Locale,
  { keywords: string[]; localeTag: string; organizationName: string }
>;

function normalizeSiteUrl(value?: string | null) {
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  const trimmed = value.trim();
  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrl() {
  const firstAvailable = SITE_URL_CANDIDATES.find(Boolean);
  return normalizeSiteUrl(firstAvailable);
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function getLocaleSeoProfile(locale: Locale) {
  return localeMetadata[locale];
}

export function getCanonicalUrl(locale: Locale, path = "") {
  return getAbsoluteUrl(getLocalizedPath(locale, path || "/"));
}

export function buildLanguageAlternates(path = "") {
  const normalizedPath = path || "/";

  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, getAbsoluteUrl(getLocalizedPath(locale, normalizedPath))]),
    ),
    "x-default": getAbsoluteUrl(getLocalizedPath(defaultLocale, normalizedPath)),
  };
}

type PageMetadataOptions = {
  description: string;
  imagePath?: string;
  keywords?: string[];
  locale: Locale;
  openGraphType?: "article" | "website";
  path?: string;
  title: string;
};

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords = [],
  imagePath = "/company/company-projects.jpeg",
  openGraphType = "website",
}: PageMetadataOptions): Metadata {
  const profile = getLocaleSeoProfile(locale);
  const canonical = getCanonicalUrl(locale, path);
  const imageUrl = getAbsoluteUrl(imagePath);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords: [...profile.keywords, ...keywords],
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    authors: [{ name: profile.organizationName, url: getSiteUrl() }],
    creator: profile.organizationName,
    publisher: profile.organizationName,
    category: "Steel Manufacturing and Project Supply",
    classification: "Industrial Materials and Steel Products",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: openGraphType,
      url: canonical,
      title,
      description,
      siteName: profile.organizationName,
      locale: profile.localeTag,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeMetadata[item].localeTag),
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 900,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "geo.region": "AF-HER",
      "geo.placename": "Herat, Afghanistan",
      "theme-color": "#3366ff",
    },
  };
}

export function buildOrganizationStructuredData(locale: Locale, dictionary: Dictionary) {
  const siteUrl = getSiteUrl();
  const profile = getLocaleSeoProfile(locale);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: profile.organizationName,
        alternateName: ["خراسان هرات", "Khorasan Herat", dictionary.brand.name],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: getAbsoluteUrl("/images/logo.png"),
        },
        image: getAbsoluteUrl("/company/company-projects.jpeg"),
        description: dictionary.footer.aboutText,
        email: "info@khorasanherat.com",
        telephone: "+93 790 165 008",
        sameAs: [
          "https://www.instagram.com/khorasan_herat_iron_compani",
          "https://www.facebook.com/share/16MXcQSssK",
          "https://t.me/khorasanherat",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Darb Malik, Sarak Manaraha, beside Shahzadegan 9",
          addressLocality: "Herat",
          addressCountry: "AF",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Afghanistan",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+93 790 165 008",
            email: "info@khorasanherat.com",
            areaServed: "AF",
            availableLanguage: ["fa", "ps", "en"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+93 799 800 454",
            email: "khorasanherat@gmail.com",
            areaServed: "AF",
            availableLanguage: ["fa", "ps", "en"],
          },
        ],
        location: [
          {
            "@type": "Place",
            name: "Khorasan Herat Head Office",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Darb Malik, Sarak Manaraha, beside Shahzadegan 9",
              addressLocality: "Herat",
              addressCountry: "AF",
            },
          },
          {
            "@type": "Place",
            name: "Khorasan Herat Factory",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Islam Qala Road, under the bypass road",
              addressLocality: "Herat",
              addressCountry: "AF",
            },
          },
        ],
        knowsAbout: profile.keywords,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: profile.organizationName,
        inLanguage: profile.localeTag,
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbStructuredData(locale: Locale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(locale, item.path),
    })),
  };
}

type FaqItem = {
  answer: string;
  question: string;
};

export function buildFaqStructuredData(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
