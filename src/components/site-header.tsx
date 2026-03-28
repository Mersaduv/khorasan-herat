"use client";

import { useEffect, useRef, useState } from "react";
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
const TELEGRAM_CHANNEL_URL = "https://t.me/khorasanherat";

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.04 15.55 8.66 20.9c.54 0 .77-.23 1.05-.5l2.53-2.42 5.24 3.84c.96.53 1.64.25 1.9-.9l3.44-16.12.01-.01c.31-1.46-.53-2.03-1.46-1.68L1.18 10.86c-1.37.53-1.35 1.3-.23 1.65l5.16 1.61L18.1 6.6c.56-.37 1.07-.16.65.21" />
    </svg>
  );
}

export function SiteHeader({
  dictionary,
  locale,
  pathSuffix = "",
}: SiteHeaderProps) {
  const [isCondensed, setIsCondensed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    function updateHeaderHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }

    updateHeaderHeight();

    const observer = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    observer.observe(headerRef.current);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [isCondensed, locale, pathSuffix]);

  const primaryNav = [
    {
      href: getLocalizedPath(locale, "/"),
      isActive: pathSuffix === "",
      label: locale === "en" ? "Home" : locale === "ps" ? "کور" : "خانه",
    },
    {
      href: getLocalizedPath(locale, "/about"),
      isActive: pathSuffix === "/about",
      label: locale === "en" ? "About Us" : locale === "ps" ? "زموږ په اړه" : "درباره ما",
    },
    {
      href: getLocalizedPath(locale, "/contact"),
      isActive: pathSuffix === "/contact",
      label: locale === "en" ? "Contact Us" : locale === "ps" ? "اړیکه" : "تماس با ما",
    },
  ];

  const searchArticles =
    locale === "en"
      ? [
          {
            href: TELEGRAM_CHANNEL_URL,
            title: "Steel bars from 8 mm to 32 mm",
            excerpt:
              "Channel content introduces the company’s rebar production range and supply capacity for construction projects.",
            source: "Telegram",
          },
          {
            href: TELEGRAM_CHANNEL_URL,
            title: "Factory location on Islam Qala Road",
            excerpt: "The factory is introduced on Islam Qala Road under the bypass road in Herat.",
            source: "Telegram",
          },
          {
            href: TELEGRAM_CHANNEL_URL,
            title: "Head office in Darb Malik",
            excerpt: "The central office address is listed for customer coordination and direct follow-up.",
            source: "Telegram",
          },
          {
            href: TELEGRAM_CHANNEL_URL,
            title: "Inquiry routes and company email",
            excerpt: "Official contact routes include mobile lines and khorasanherat@gmail.com.",
            source: "Telegram",
          },
        ]
      : locale === "ps"
        ? [
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "د ۸ تر ۳۲ ملي‌متره میلګردونو تولید",
              excerpt: "د کانال په محتوا کې د میلګرد تولید او د پروژو لپاره د تامین ظرفیت یاد شوی دی.",
              source: "Telegram",
            },
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "په اسلام‌قلعه سړک کې د فابریکې موقعیت",
              excerpt: "فابریکه د هرات په اسلام‌قلعه سړک، د بایپاس لاندې مسیر کې معرفي شوې ده.",
              source: "Telegram",
            },
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "د درب ملک مرکزي دفتر",
              excerpt: "د مرکزي دفتر پته د مستقیمې همغږۍ او د پېرودونکو د اړیکې لپاره کارول کېږي.",
              source: "Telegram",
            },
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "د اړیکې او استعلام لارې",
              excerpt: "رسمي اړیکې د موبایل شمیرو او khorasanherat@gmail.com له لارې ترسره کېږي.",
              source: "Telegram",
            },
          ]
        : [
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "تولید میلگرد از سایز ۸ تا ۳۲ میلی‌متر",
              excerpt: "در محتوای کانال، ظرفیت تولید میلگرد و تامین پروژه‌های ساختمانی معرفی شده است.",
              source: "Telegram",
            },
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "موقعیت کارخانه در سرک اسلام‌قلعه",
              excerpt: "کارخانه در هرات، سرک اسلام‌قلعه و مسیر زیر بایپاس معرفی شده است.",
              source: "Telegram",
            },
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "دفتر مرکزی در درب ملک",
              excerpt: "آدرس دفتر مرکزی برای هماهنگی مستقیم و پیگیری سفارش‌ها درج شده است.",
              source: "Telegram",
            },
            {
              href: TELEGRAM_CHANNEL_URL,
              title: "راه‌های تماس و ایمیل شرکت",
              excerpt: "شماره‌های ارتباطی و ایمیل khorasanherat@gmail.com در محتوای معرفی شرکت آمده‌اند.",
              source: "Telegram",
            },
          ];

  const searchPlaceholder =
    locale === "en"
      ? "Search channel content..."
      : locale === "ps"
        ? "د کانال محتوا ولټوئ..."
        : "جستجو در محتوای کانال...";

  return (
    <>
      <div aria-hidden="true" style={{ height: headerHeight }} />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-white/96 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-md supports-[backdrop-filter]:bg-white/88 transition-all duration-300 ${
          isCondensed ? "shadow-[0_10px_24px_rgba(15,23,42,0.08)]" : ""
        }`}
        dir={isRtl ? "rtl" : "ltr"}
        ref={headerRef}
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6">
          <div
            className={`hidden border-b border-[var(--color-line)] transition-all duration-300 lg:block ${
              isCondensed ? "py-2.5" : "py-3"
            }`}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex gap-6">
                <Link className="flex items-center gap-4" href={`/${locale}`}>
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
            <div
              className={`w-full transition-all duration-300 ${
                isCondensed ? "max-w-[600px]" : "max-w-[680px]"
              }`}
            >
              <HeaderSearch
                articles={searchArticles}
                direction={isRtl ? "rtl" : "ltr"}
                placeholder={searchPlaceholder}
              />
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <a
                className={`flex items-center gap-3 rounded-[1rem] border border-[#cce7d8] bg-[linear-gradient(135deg,#f3fff8,#ffffff)] shadow-[0_12px_24px_rgba(14,122,67,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(14,122,67,0.14)] ${
                  isCondensed ? "px-4 py-2.5" : "px-5 py-3"
                }`}
                href={WHATSAPP_URL}
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(37,211,102,0.16)]">
                  <Image alt="WhatsApp" height={26} src="/icons/whatsapp.svg" width={26} />
                </span>
                <span className="flex items-center gap-2 text-base font-semibold text-[#0e7a43]">
                  <span>{locale === "en" ? "Inquiry:" : locale === "ps" ? "استعلام:" : "استعلام:"}</span>
                  <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
                    +93791954490
                  </span>
                </span>
              </a>

              <a
                className={`flex items-center gap-3 rounded-[1rem] bg-[linear-gradient(135deg,#2aabee,#0f7fe5)] text-white shadow-[0_12px_24px_rgba(15,127,229,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,127,229,0.24)] ${
                  isCondensed ? "px-4 py-2.5" : "px-5 py-3"
                }`}
                href={TELEGRAM_CHANNEL_URL}
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/18">
                  <TelegramIcon />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-medium text-white/80">
                    {locale === "en"
                      ? "Telegram channel"
                      : locale === "ps"
                        ? "د ټیلیګرام کانال"
                        : "کانال تلگرام"}
                  </span>
                  <span className="text-sm font-bold">@khorasanherat</span>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-3" dir={isRtl ? "rtl" : "ltr"}>
              <Link
                className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}
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

            <div className="flex flex-col gap-3 sm:flex-row">
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
                    {locale === "en" ? "Quick inquiry" : locale === "ps" ? "چټک استعلام" : "استعلام سریع"}
                  </span>
                  <span className="text-base font-extrabold" dir="ltr" style={{ unicodeBidi: "isolate" }}>
                    +93791954490
                  </span>
                </span>
                <span className="rounded-[0.65rem] bg-white/18 px-3 py-2 text-xs font-semibold">
                  WhatsApp
                </span>
              </a>

              <a
                className="flex items-center justify-between gap-3 rounded-[0.95rem] bg-[linear-gradient(135deg,#2aabee,#0f7fe5)] px-3.5 py-3.5 text-white shadow-[0_14px_26px_rgba(15,127,229,0.22)]"
                href={TELEGRAM_CHANNEL_URL}
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18">
                  <TelegramIcon />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-medium text-white/85">
                    {locale === "en"
                      ? "Telegram channel"
                      : locale === "ps"
                        ? "د ټیلیګرام کانال"
                        : "کانال تلگرام"}
                  </span>
                  <span className="text-base font-extrabold">@khorasanherat</span>
                </span>
                <span className="rounded-[0.65rem] bg-white/18 px-3 py-2 text-xs font-semibold">
                  Telegram
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
