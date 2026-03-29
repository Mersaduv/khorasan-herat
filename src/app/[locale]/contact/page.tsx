import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import {
  buildLocaleMetadata,
  getLocaleData,
  type LocalePageProps,
} from "@/lib/locale-page";
import { buildBreadcrumbStructuredData, getCanonicalUrl, getSiteUrl } from "@/lib/seo";

const WHATSAPP_URL = "https://wa.me/93790691000";
const TELEGRAM_CHANNEL_URL = "https://t.me/khorasanherat";
const MAP_LOCATION = "هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان، هرات";
const MAP_SEARCH_URL =
  "https://maps.google.com/?q=%D9%87%D8%B1%D8%A7%D8%AA%D8%8C%20%D8%AF%D8%B1%D8%A8%20%D9%85%D9%84%DA%A9%D8%8C%20%D8%B3%D8%B1%DA%A9%20%D9%85%D9%86%D8%A7%D8%B1%D9%87%E2%80%8C%D9%87%D8%A7%D8%8C%20%D8%AC%D9%86%D8%A8%20%D8%B4%D9%87%D8%B2%D8%A7%D8%AF%DA%AF%D8%A7%D9%86%D8%8C%20%D9%87%D8%B1%D8%A7%D8%AA";
const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=%D9%87%D8%B1%D8%A7%D8%AA%D8%8C%20%D8%AF%D8%B1%D8%A8%20%D9%85%D9%84%DA%A9%D8%8C%20%D8%B3%D8%B1%DA%A9%20%D9%85%D9%86%D8%A7%D8%B1%D9%87%E2%80%8C%D9%87%D8%A7%D8%8C%20%D8%AC%D9%86%D8%A8%20%D8%B4%D9%87%D8%B2%D8%A7%D8%AF%DA%AF%D8%A7%D9%86%D8%8C%20%D9%87%D8%B1%D8%A7%D8%AA&t=&z=17&ie=UTF8&iwloc=B&output=embed";

function MapPinIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: activeLocale } = await getLocaleData(locale);

  return buildLocaleMetadata(activeLocale, "/contact", {
    title:
      activeLocale === "en"
        ? "Contact Khorasan Herat | Steel Sales Inquiry, Office Address, and WhatsApp"
        : activeLocale === "ps"
          ? "له خراسان هرات سره اړیکه | د پلور استعلام، پته او واتساپ"
          : "تماس با خراسان هرات | استعلام فروش، آدرس دفتر و واتساپ",
    description:
      activeLocale === "en"
        ? "Contact Khorasan Herat for rebar pricing, steel product inquiries, office directions in Herat, proforma requests, and wholesale project coordination."
        : activeLocale === "ps"
          ? "له خراسان هرات سره د میلګرد بیې، فولادي محصولاتو، د دفتر پتې، پیش‌فاکتور او د پروژې د پلور همغږۍ لپاره اړیکه ونیسئ."
          : "برای استعلام قیمت میلگرد، محصولات فولادی، آدرس دفتر در هرات، درخواست پیش‌فاکتور و هماهنگی فروش پروژه‌ای با خراسان هرات تماس بگیرید.",
    imagePath: "/company/company-sales.jpeg",
    keywords:
      activeLocale === "en"
        ? [
            "contact Khorasan Herat",
            "Herat steel company phone number",
            "rebar inquiry Herat",
            "steel supplier WhatsApp Afghanistan",
          ]
        : activeLocale === "ps"
          ? [
              "د خراسان هرات اړیکه",
              "د هرات فولادي شرکت شمېره",
              "د میلګرد استعلام هرات",
              "د واتساپ له لارې فولادي پلور",
            ]
          : [
              "تماس با خراسان هرات",
              "شماره شرکت فولاد هرات",
              "استعلام میلگرد هرات",
              "واتساپ فروش محصولات فولادی",
            ],
  });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);
  const canonicalUrl = getCanonicalUrl(activeLocale, "/contact");

  const contactCards = [
    {
      href: `tel:${dictionary.footer.phone.replace(/[^0-9+]/g, "")}`,
      label: dictionary.footer.phoneLabel,
      value: dictionary.footer.phones.join(" | "),
    },
    {
      href: `mailto:${dictionary.footer.email}`,
      label: dictionary.footer.emailLabel,
      value: dictionary.footer.emails.join(" | "),
    },
    {
      href: "#map-section",
      label: dictionary.footer.addressLabel,
      value: dictionary.footer.address,
    },
    {
      href: WHATSAPP_URL,
      label: dictionary.footer.hoursLabel,
      value: dictionary.footer.hoursValue,
    },
  ];

  const introText =
    activeLocale === "en"
      ? "Our team is available for inquiries, sales coordination, order follow-up, and direct communication through the channels below."
      : activeLocale === "ps"
        ? "زموږ ټيم د استعلام، د پلور د همغږۍ، د سفارش د تعقيب او مستقيم ارتباط لپاره له لاندې لارو چمتو دی."
        : "تیم خراسان هرات برای استعلام، هماهنگی فروش، پیگیری سفارش و ارتباط مستقیم از مسیرهای زیر در دسترس شماست.";

  const mapTitle =
    activeLocale === "en"
      ? "Office Location"
      : activeLocale === "ps"
        ? "د دفتر موقعيت"
        : "موقعیت دفتر مرکزی";

  const mapDescription =
    activeLocale === "en"
      ? "Use the map below to locate the central office and plan your direct visit or coordination."
      : activeLocale === "ps"
        ? "لاندې نقشه د مرکزي دفتر د موندلو او د مستقيمې همغږۍ يا ليدنې لپاره وکاروئ."
        : "از نقشه زیر برای پیدا کردن دفتر مرکزی و هماهنگی مراجعه یا ارتباط مستقیم استفاده کنید.";

  const ctaDescription =
    activeLocale === "en"
      ? "For faster coordination, you can continue through WhatsApp or follow the company channel on Telegram."
      : activeLocale === "ps"
        ? "د لا چټکې همغږۍ لپاره کولای شئ د واتساپ له لارې اړيکه ونيسئ يا د شرکت ټيليګرامي چينل وګورئ."
        : "برای هماهنگی سریع‌تر، می‌توانید از طریق واتساپ اقدام کنید یا کانال رسمی شرکت را دنبال کنید.";

  const locationCardTitle =
    activeLocale === "en"
      ? "Herat Main Office"
      : activeLocale === "ps"
        ? "د هرات مرکزي دفتر"
        : "دفتر مرکزی هرات";

  const locationCardText =
    activeLocale === "en"
      ? "Darb Malik, Sarak Manaraha, beside Shahzadegan, Herat"
      : activeLocale === "ps"
        ? "هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان"
        : "هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان";

  const locationCardAction =
    activeLocale === "en"
      ? "Open in map"
      : activeLocale === "ps"
        ? "په نقشه کې يې خلاص کړه"
        : "باز کردن در نقشه";
  const breadcrumbData = buildBreadcrumbStructuredData(activeLocale, [
    {
      name: activeLocale === "en" ? "Home" : activeLocale === "ps" ? "کور" : "خانه",
      path: "",
    },
    {
      name: dictionary.header.quickTabs[2].label,
      path: "/contact",
    },
  ]);
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: dictionary.header.quickTabs[2].label,
        description: introText,
        inLanguage: activeLocale,
        isPartOf: {
          "@id": `${getSiteUrl()}/#website`,
        },
        about: {
          "@id": `${getSiteUrl()}/#organization`,
        },
      },
      {
        "@type": "ContactPoint",
        "@id": `${canonicalUrl}#sales-contact`,
        contactType: "sales",
        telephone: "+93 790 165 008",
        email: "info@khorasanherat.com",
        areaServed: "AF",
        availableLanguage: ["fa", "ps", "en"],
      },
      {
        "@type": "Place",
        "@id": `${canonicalUrl}#head-office`,
        name: locationCardTitle,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Darb Malik, Sarak Manaraha, beside Shahzadegan",
          addressLocality: "Herat",
          addressCountry: "AF",
        },
      },
    ],
  };

  return (
    <SiteShell
      dictionary={dictionary}
      locale={activeLocale}
      pathSuffix="/contact"
    >
      <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-0 pb-14 pt-0">
        <JsonLd data={breadcrumbData} />
        <JsonLd data={contactStructuredData} />

        <section
          className="overflow-hidden border-y border-[var(--color-line)] bg-white shadow-[0_20px_45px_rgba(15,23,42,0.04)]"
          id="map-section"
        >
          <div className="relative h-[340px] w-full sm:h-[410px] lg:h-[460px]">
            <iframe
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={MAP_EMBED_URL}
              title={mapTitle}
            />

            <div className="pointer-events-none absolute inset-x-5 bottom-5 sm:inset-x-auto sm:end-8 sm:w-[360px]">
              <div className="pointer-events-auto rounded-[1.6rem] border border-white/35 bg-white/92 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.18)] backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <MapPinIcon />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-accent)]">
                      {locationCardTitle}
                    </div>
                    <div className="mt-2 text-base font-semibold leading-7 text-[var(--color-ink)]">
                      {locationCardText}
                    </div>
                    <div className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {MAP_LOCATION}
                    </div>
                  </div>
                </div>

                <Link
                  className="mt-4 inline-flex items-center justify-center rounded-[1rem] bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(51,102,255,0.2)]"
                  href={MAP_SEARCH_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  {locationCardAction}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-10 shadow-[0_20px_45px_rgba(15,23,42,0.04)] sm:px-8 lg:px-10">
            <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-accent)]">
              {dictionary.footer.quickLinksTitle}
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
              {dictionary.header.quickTabs[2].label}
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              {introText}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-6 shadow-[0_20px_45px_rgba(15,23,42,0.04)] sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
                {mapTitle}
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                {mapDescription}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f8faff] p-5">
              <div className="text-sm text-[var(--color-muted)]">
                {dictionary.footer.addressLabel}
              </div>
              <div className="mt-3 text-lg font-semibold leading-8 text-[var(--color-ink)]">
                {dictionary.footer.address}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1500px] gap-5 px-5 sm:px-8 md:grid-cols-2 lg:px-10">
          {contactCards.map((item) => (
            <Link
              className="rounded-[1.8rem] border border-[var(--color-line)] bg-[#f8faff] p-6 shadow-[0_16px_35px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(15,23,42,0.07)]"
              href={item.href}
              key={item.label}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              target={item.href.startsWith("http") ? "_blank" : undefined}
            >
              <div className="text-sm text-[var(--color-muted)]">{item.label}</div>
              <div className="mt-3 text-xl font-semibold leading-8 text-[var(--color-ink)]">
                {item.value}
              </div>
            </Link>
          ))}
        </section>

        <section className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(51,102,255,0.98),rgba(20,54,194,0.92))] px-6 py-8 text-white shadow-[0_22px_60px_rgba(51,102,255,0.24)] sm:px-8 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {dictionary.footer.cta}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-white/88">
                  {ctaDescription}
                </p>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap lg:justify-end">
                <Link
                  className="inline-flex items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#25d366,#15b956)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,211,102,0.22)]"
                  href={WHATSAPP_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  {dictionary.footer.cta}
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white"
                  href={TELEGRAM_CHANNEL_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  {dictionary.footer.telegramCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
