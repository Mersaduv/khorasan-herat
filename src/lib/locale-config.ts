export const locales = ["fa", "ps", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const localeDetails: Record<
  Locale,
  { direction: "rtl" | "ltr"; label: string }
> = {
  fa: {
    direction: "rtl",
    label: "دری | فارسی",
  },
  ps: {
    direction: "rtl",
    label: "پښتو",
  },
  en: {
    direction: "ltr",
    label: "English",
  },
};
