"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { HeaderSearch } from "@/components/header-search";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/localized-path";
import type { Locale } from "@/lib/locale-config";

type SiteHeaderProps = Readonly<{
  dictionary: Dictionary;
  locale: Locale;
  pathSuffix?: string;
}>;

const WHATSAPP_NUMBER = "93791954490";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function SiteHeader({
  dictionary,
  locale,
  pathSuffix = "",
}: SiteHeaderProps) {
  const [isCondensed, setIsCondensed] = useState(false);
  const isRtl = locale !== "en";

  useEffect(() => {
    function handleScroll() {
      setIsCondensed(window.scrollY > 28);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const primaryNav = [
    {
      href: getLocalizedPath(locale, "/"),
      isActive: false,
      label: locale === "en" ? "Categories" : locale === "ps" ? "دسته بندي" : "دسته بندی",
    },
    {
      href: getLocalizedPath(locale, "/about"),
      isActive: pathSuffix === "/about",
      label: locale === "en" ? "About Us" : locale === "ps" ? "زموږ په اړه" : "درباره ما",
    },
    {
      href: getLocalizedPath(locale, "/contact"),
      isActive: pathSuffix === "/contact",
      label: locale === "en" ? "Contact Us" : locale === "ps" ? "اړيکه" : "تماس با ما",
    },
  ];

  const searchArticles =
    locale === "en"
      ? [
          { href: getLocalizedPath(locale, "/about"), title: "Steel price buying guide" },
          { href: getLocalizedPath(locale, "/"), title: "Rebar price checklist" },
          { href: getLocalizedPath(locale, "/"), title: "Beam weight calculation basics" },
          { href: getLocalizedPath(locale, "/contact"), title: "How to request a quotation" },
        ]
      : locale === "ps"
        ? [
            { href: getLocalizedPath(locale, "/about"), title: "د فولادو د پېرود لارښود" },
            { href: getLocalizedPath(locale, "/"), title: "د ميلګرد د بیې چک ليست" },
            { href: getLocalizedPath(locale, "/"), title: "د تيرآهن وزن محاسبه" },
            { href: getLocalizedPath(locale, "/contact"), title: "د نرخ غوښتنې طریقه" },
          ]
        : [
            { href: getLocalizedPath(locale, "/about"), title: "راهنمای خرید آهن و فولاد" },
            { href: getLocalizedPath(locale, "/"), title: "چک‌لیست بررسی قیمت میلگرد" },
            { href: getLocalizedPath(locale, "/"), title: "نحوه محاسبه وزن تیرآهن" },
            { href: getLocalizedPath(locale, "/contact"), title: "چطور سریع استعلام قیمت بگیریم" },
          ];

  const searchPlaceholder =
    locale === "en"
      ? "Search articles..."
      : locale === "ps"
        ? "مقالې ولټوئ..."
        : "جستجو...";

  return (
    <header
      className={`sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/96 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-md transition-all duration-300 ${
        isCondensed ? "shadow-[0_10px_24px_rgba(15,23,42,0.08)]" : ""
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6">
        <div
          className={`hidden border-b border-[var(--color-line)] transition-all duration-300 lg:block ${
            isCondensed ? "py-2.5" : "py-3"
          }`}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex gap-6">
              <Link
                className={`flex items-center gap-4 ${
                  isRtl ? "flex-row-reverse" : "flex-row"
                }`}
                href={`/${locale}`}
              >
                <Image
                  alt={dictionary.brand.name}
                  height={96}
                  priority
                  src="/images/logo.png"
                  style={{ height: "auto", width: isCondensed ? 78 : 96 }}
                  width={96}
                />
                <div className={isRtl ? "text-right" : "text-left"}>
                  <div
                    className={`font-bold leading-none text-[var(--color-ink)] transition-all duration-300 ${
                      isCondensed ? "text-[1.55rem]" : "text-[1.95rem]"
                    }`}
                  >
                    {dictionary.brand.name}
                  </div>
                  <div
                    className={`mt-1 font-medium text-[var(--color-muted)] transition-all duration-300 ${
                      isCondensed ? "text-xs" : "text-sm"
                    }`}
                  >
                    {dictionary.brand.tagline}
                  </div>
                </div>
              </Link>

              <nav className="flex items-center gap-6 text-[1.05rem] font-semibold text-[var(--color-ink)]">
                {primaryNav.map((item) => (
                  <Link
                    className={`rounded-md px-3 py-3 transition-colors hover:bg-blue-50 hover:text-[var(--color-accent)] ${
                      item.isActive ? "text-[var(--color-accent)]" : ""
                    }`}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher
                currentLocale={locale}
                key={`desktop-${locale}-${pathSuffix}`}
                languageLabel={dictionary.header.languageLabel}
                pathSuffix={pathSuffix}
              />
            </div>
          </div>
        </div>

        <div
          className={`hidden items-center justify-between gap-6 transition-all duration-300 lg:flex ${
            isCondensed ? "py-2.5" : "py-4"
          }`}
        >
          <div className={`w-full transition-all duration-300 ${isCondensed ? "max-w-[600px]" : "max-w-[680px]"}`}>
            <HeaderSearch
              articles={searchArticles}
              direction={isRtl ? "rtl" : "ltr"}
              placeholder={searchPlaceholder}
            />
          </div>

          <a
            className={`flex shrink-0 items-center gap-3 rounded-[1rem] border border-[#cce7d8] bg-[linear-gradient(135deg,#f3fff8,#ffffff)] shadow-[0_12px_24px_rgba(14,122,67,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(14,122,67,0.14)] ${
              isCondensed ? "px-4 py-2.5" : "px-5 py-3"
            }`}
            href={WHATSAPP_URL}
            rel="noreferrer"
            target="_blank"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(37,211,102,0.16)]">
              <Image alt="WhatsApp" height={22} src="/icons/whatsapp.svg" width={22} />
            </span>
            <span className="flex items-center gap-2 text-base font-semibold text-[#0e7a43]">
              <span>{locale === "en" ? "Inquiry:" : "استعلام:"}</span>
              <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
                +93791954490
              </span>
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-4 py-4 lg:hidden">
          <div className="flex items-center justify-between gap-3" dir={isRtl ? "rtl" : "ltr"}>
            <Link
              className={`flex items-center gap-3 ${
                isRtl ? "flex-row-reverse" : "flex-row"
              }`}
              href={`/${locale}`}
            >
              <div className={isRtl ? "text-right" : "text-left"}>
                <div className="text-base font-bold text-[var(--color-ink)]">
                  {dictionary.brand.name}
                </div>
              </div>
              <Image
                alt={dictionary.brand.name}
                height={72}
                priority
                src="/images/logo.png"
                style={{ height: "auto", width: 72 }}
                width={72}
              />
            </Link>

            <LanguageSwitcher
              currentLocale={locale}
              key={`mobile-${locale}-${pathSuffix}`}
              languageLabel={dictionary.header.languageLabel}
              pathSuffix={pathSuffix}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1" dir={isRtl ? "rtl" : "ltr"}>
            {primaryNav.map((item) => (
              <Link
                className={`shrink-0 rounded-[0.7rem] px-3.5 py-2.5 text-sm font-semibold transition-all ${
                  item.isActive
                    ? "bg-[var(--color-accent)] text-white shadow-[0_12px_24px_rgba(51,102,255,0.18)]"
                    : "border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <HeaderSearch
            articles={searchArticles}
            direction={isRtl ? "rtl" : "ltr"}
            placeholder={searchPlaceholder}
          />

          <a
            className="flex items-center justify-between gap-3 rounded-[0.95rem] bg-[linear-gradient(135deg,#25d366,#15b956)] px-3.5 py-3.5 text-white shadow-[0_14px_26px_rgba(37,211,102,0.2)]"
            href={WHATSAPP_URL}
            rel="noreferrer"
            target="_blank"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18">
              <Image alt="WhatsApp" height={21} src="/icons/whatsapp.svg" width={21} />
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-medium text-white/85">
                {locale === "en" ? "Price inquiry" : "استعلام قیمت"}
              </span>
              <span
                className="text-base font-extrabold"
                dir="ltr"
                style={{ unicodeBidi: "isolate" }}
              >
                +93791954490
              </span>
            </span>
            <span className="rounded-[0.65rem] bg-white/18 px-3 py-2 text-xs font-semibold">
              WhatsApp
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
