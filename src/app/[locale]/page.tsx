import type { Metadata } from "next";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import { AnimatedCounter } from "@/components/animated-counter";
import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/lib/i18n";
import {
  buildLocaleMetadata,
  getLocaleData,
  type LocalePageProps,
} from "@/lib/locale-page";

const TELEGRAM_CHANNEL_URL = "https://t.me/khorasanherat";

type ContactType = "phone" | "email" | "telegram";

type ArticleContact = {
  href: string;
  label: string;
  value: string;
  type: ContactType;
};

type ArticleCta = {
  href: string;
  label: string;
  type: "telegram" | "phone";
};

type ProductDetailSection = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  body: string[];
  bullets: string[];
  contacts?: ArticleContact[];
  ctas?: ArticleCta[];
};

const productDetailSections: Record<Locale, ProductDetailSection[]> = {
  fa: [
    {
      id: "credit-sales",
      eyebrow: "فروش و هماهنگی",
      title: "فروش اعتباری برای مشتریان ثابت و پروژه‌ای",
      summary:
        "برای مشتریانی که خریدهای تکراری یا پروژه‌های در حال اجرا دارند، مسیر فروش باید روشن، سریع و قابل پیگیری باشد.",
      body: [
        "این بخش برای معرفی مسیر همکاری با خریداران پروژه‌ای و مشتریان ثابت طراحی شده است تا اطلاعات سفارش، شرایط فروش و هماهنگی اولیه به شکلی شفاف‌تر ارائه شود.",
        "دفتر مرکزی در هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان ۹ قرار دارد و از همین مسیر می‌توان هماهنگی سفارش، دریافت اطلاعات و ارتباط مستقیم را انجام داد.",
      ],
      bullets: [
        "پاسخ‌گویی اولیه برای استعلام و شرایط فروش",
        "هماهنگی با مشتریان ثابت و سفارش‌های پروژه‌ای",
        "جمع‌آوری مشخصات سفارش پیش از صدور پیش‌فاکتور",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "تماس مستقیم", value: "0790165008", type: "phone" },
        { href: "tel:+93799800454", label: "شماره دوم", value: "0799800454", type: "phone" },
        { href: "mailto:khorasanherat@gmail.com", label: "ایمیل", value: "khorasanherat@gmail.com", type: "email" },
      ],
    },
    {
      id: "quality-assurance",
      eyebrow: "کیفیت و استاندارد",
      title: "کنترل کیفیت و اطمینان از مشخصات محصول",
      summary:
        "اطلاعات عمومی شرکت نشان می‌دهد که تمرکز مجموعه بر تولید میلگرد و محصولات فولادی با کنترل مرحله‌ای و بررسی دقیق است.",
      body: [
        "در این بخش روی اصالت کالا، کنترل کیفیت و معرفی روشن مشخصات محصول تمرکز شده تا خریدار پیش از ثبت سفارش، شناخت دقیق‌تری از کالا داشته باشد.",
        "کارخانه در هرات، سرک اسلام‌قلعه، زیر سرک بایپاس قرار دارد و همین اشاره مکانی، معرفی محصول را از یک متن تبلیغاتی ساده به محتوایی قابل اتکا تبدیل می‌کند.",
      ],
      bullets: [
        "کنترل مرحله‌ای کیفیت در روند تولید",
        "بررسی سفارش پیش از بارگیری و ارسال",
        "تاکید بر انطباق محصول با نیاز پروژه",
      ],
    },
    {
      id: "proforma",
      eyebrow: "فرآیند اداری",
      title: "صدور سریع پیش‌فاکتور و آماده‌سازی سفارش",
      summary:
        "برای خرید عمده، سرعت در تهیه پیش‌فاکتور و جمع‌بندی مشخصات سفارش یکی از مهم‌ترین بخش‌های تجربه مشتری است.",
      body: [
        "این بخش برای خریدارانی طراحی شده که می‌خواهند بدون اتلاف وقت، نوع کالا، مقدار، مقصد و نیاز سفارش خود را جمع‌بندی کرده و سریع‌تر به مرحله پیش‌فاکتور برسند.",
        "اطلاعات تماس این بخش جداگانه و قابل کلیک قرار گرفته تا کاربر برای ارسال مشخصات، پیگیری یا هماهنگی رسمی، مستقیماً اقدام کند.",
      ],
      bullets: [
        "ثبت سریع درخواست خریدار",
        "جمع‌بندی مقدار، نوع کالا و مقصد",
        "صدور پیش‌فاکتور در کوتاه‌ترین زمان ممکن",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "تماس برای پیش‌فاکتور", value: "0790165008", type: "phone" },
        { href: "mailto:khorasanherat@gmail.com", label: "ارسال مشخصات", value: "khorasanherat@gmail.com", type: "email" },
      ],
    },
    {
      id: "support",
      eyebrow: "پشتیبانی و پیگیری",
      title: "پشتیبانی مستمر برای ارتباط، پیگیری و راهنمایی",
      summary:
        "وجود راه‌های ارتباطی عمومی باعث می‌شود کاربر پس از ورود به این بخش، مسیر بعدی ارتباط با مجموعه را روشن‌تر ببیند.",
      body: [
        "کاربری که روی این کارت کلیک می‌کند معمولاً به دنبال پاسخ مشخص است: سفارش در چه وضعیتی است، از چه راهی پیگیری کند و با کدام بخش صحبت کند.",
        "در کنار مسیرهای تماس، اشاره به نشانی کارخانه و دفتر مرکزی هم به کاربر اطمینان می‌دهد که با یک مجموعه قابل دسترس و پاسخ‌گو طرف است.",
      ],
      bullets: [
        "راهنمایی پیش و پس از خرید",
        "پیگیری سفارش و پاسخ‌گویی مستقیم",
        "اتصال سریع به راه‌های ارتباطی شرکت",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "تماس پشتیبانی", value: "0790165008", type: "phone" },
        { href: "tel:+93799800454", label: "شماره دوم", value: "0799800454", type: "phone" },
        { href: "mailto:info@khorasanherat.com", label: "ایمیل رسمی", value: "info@khorasanherat.com", type: "email" },
        { href: "mailto:khorasanherat@gmail.com", label: "ایمیل پشتیبانی", value: "khorasanherat@gmail.com", type: "email" },
      ],
      ctas: [
        { href: TELEGRAM_CHANNEL_URL, label: "ورود به کانال تلگرام", type: "telegram" },
        { href: "tel:+93790165008", label: "تماس فوری با فروش", type: "phone" },
      ],
    },
  ],
  ps: [
    {
      id: "credit-sales",
      eyebrow: "پلور او همغږي",
      title: "د ثابتو او پروژوي پېرودونکو لپاره اعتباري پلور",
      summary:
        "هغه پېرودونکي چې تکراري اخېستنه یا روانې پروژې لري، روښانه او چټک بهیر ته اړتیا لري.",
      body: [
        "دا برخه د هغو پېرودونکو لپاره ده چې غواړي د پلور شرطونه، د پروژې اړتیاوې او د سفارش لومړنی تنظیم په روښانه ډول وویني.",
        "مرکزي دفتر په هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان ۹ کې دی او د همدې لارې د سفارش همغږي او مستقیم تماس ترسره کېږي.",
      ],
      bullets: [
        "د پلور شرطونو او همغږۍ لومړنی ځواب",
        "له ثابتو او پروژوي پېرودونکو سره همغږي",
        "د پیش فاکتور له مخه د سفارش معلومات راټولول",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "مستقیم تماس", value: "0790165008", type: "phone" },
        { href: "tel:+93799800454", label: "دوهمه شمېره", value: "0799800454", type: "phone" },
        { href: "mailto:khorasanherat@gmail.com", label: "برېښنالیک", value: "khorasanherat@gmail.com", type: "email" },
      ],
    },
    {
      id: "quality-assurance",
      eyebrow: "کیفیت او معیار",
      title: "د محصول مشخصات، کیفیت او ډاډ",
      summary:
        "د شرکت عامه معلومات ښيي چې اصلي تمرکز پر میلګرد او فولادي محصولاتو دی او کیفیت یې په جدي ډول څارل کېږي.",
      body: [
        "دا محتوا د هغو پېرودونکو لپاره برابره شوې چې د تخنیکي مشخصاتو، کیفیت او د محصول د اصالت په برخه کې جدي حساسیت لري.",
        "فابریکه په هرات، سرک اسلام‌قلعه، زیر سرک بایپاس کې موقعیت لري او همدا واقعي جغرافیایي اشاره دا برخه لا باوري کوي.",
      ],
      bullets: [
        "په تولید کې پړاوییز کیفیت کنټرول",
        "له بارولو مخکې د سفارش ارزونه",
        "د پروژې له اړتیا سره د محصول برابرول",
      ],
    },
    {
      id: "proforma",
      eyebrow: "اداري بهیر",
      title: "چټک پیش‌فاکتور او د سفارش منظمول",
      summary:
        "په عمده پېر کې د پیش‌فاکتور چټکتیا او د سفارش د معلوماتو سم تنظیم ډېر مهم وي.",
      body: [
        "دا برخه د هغو خریدارانو لپاره ده چې غواړي د محصول ډول، مقدار او مقصد ژر تنظیم کړي او په کم وخت کې پیش‌فاکتور ترلاسه کړي.",
        "د تماس لارې په جلا او کلیک کېدونکي ډول وړاندې شوې دي څو کاروونکی د مشخصاتو د لېږلو او رسمي همغږۍ لپاره مستقیم اقدام وکړي.",
      ],
      bullets: [
        "د خریدار د غوښتنې چټک ثبت",
        "د مقدار، ډول او مقصد روښانه کول",
        "په لنډ وخت کې د پیش‌فاکتور صادرول",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "د پیش‌فاکتور تماس", value: "0790165008", type: "phone" },
        { href: "mailto:khorasanherat@gmail.com", label: "مشخصات ولېږئ", value: "khorasanherat@gmail.com", type: "email" },
      ],
    },
    {
      id: "support",
      eyebrow: "ملاتړ او تعقیب",
      title: "دوامدار ملاتړ د اړیکې، لارښوونې او پیگیری لپاره",
      summary:
        "کله چې کاروونکی دې برخې ته راځي، معمولاً د واضح ځواب او مناسبې اړیکې په لټه کې وي.",
      body: [
        "په دې برخه کې کاروونکی پوهېږي چې له کومې لارې د سفارش وضعیت تعقیب کړي، له کومې شمېره اړیکه ونیسي او کومه لاره چټکه ده.",
        "د دفتر او فابریکې د پتې یادونه دا برخه لا باوري کوي او د راتلونکي ګام لپاره واضح مسیر ورکوي.",
      ],
      bullets: [
        "له پېر مخکې او وروسته لارښوونه",
        "مستقیم تعقیب او ځواب‌ویینه",
        "د شرکت له ارتباطي لارو سره چټکه نښلېدنه",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "د ملاتړ تماس", value: "0790165008", type: "phone" },
        { href: "tel:+93799800454", label: "دوهمه شمېره", value: "0799800454", type: "phone" },
        { href: "mailto:info@khorasanherat.com", label: "رسمي برېښنالیک", value: "info@khorasanherat.com", type: "email" },
        { href: "mailto:khorasanherat@gmail.com", label: "د ملاتړ برېښنالیک", value: "khorasanherat@gmail.com", type: "email" },
      ],
      ctas: [
        { href: TELEGRAM_CHANNEL_URL, label: "د ټیلیګرام کانال ته لاړ شئ", type: "telegram" },
        { href: "tel:+93790165008", label: "له پلور سره سملاسي اړیکه", type: "phone" },
      ],
    },
  ],
  en: [
    {
      id: "credit-sales",
      eyebrow: "Sales Coordination",
      title: "Credit-ready sales support for repeat and project buyers",
      summary:
        "Customers handling recurring purchases or active construction projects need a sales flow that is clear, responsive, and easy to follow.",
      body: [
        "This section is written for buyers who need a clearer start to the purchasing process. It explains how sales terms, project requirements, and early order preparation can be handled in a more structured and buyer-friendly way.",
        "The head office is located at Darb Malik, Sarak Manaraha, beside Shahzadegan 9 in Herat, while the clickable contact cards below keep the communication options easy to use without repeating them throughout the article.",
      ],
      bullets: [
        "Initial response for sales conditions",
        "Coordination for repeat customers and project orders",
        "Collection of order details before proforma issuance",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "Direct line", value: "0790165008", type: "phone" },
        { href: "tel:+93799800454", label: "Second line", value: "0799800454", type: "phone" },
        { href: "mailto:khorasanherat@gmail.com", label: "Email", value: "khorasanherat@gmail.com", type: "email" },
      ],
    },
    {
      id: "quality-assurance",
      eyebrow: "Quality Assurance",
      title: "Clear product quality messaging and specification confidence",
      summary:
        "Public product information on the company website highlights steel bars and a production process backed by quality control and technical review.",
      body: [
        "This article focuses on confidence. It frames the product range, including 8 mm to 32 mm rebar, as part of a controlled process where review and preparation matter before dispatch.",
        "The factory location, listed on Islam Qala Road under the bypass road in Herat, helps ground the message in something real and verifiable. The purpose here is not just to promote the product, but to present quality as part of a visible operating process.",
      ],
      bullets: [
        "Step-by-step quality control in production",
        "Order review before loading and dispatch",
        "Closer alignment between product specs and project needs",
      ],
    },
    {
      id: "proforma",
      eyebrow: "Order Processing",
      title: "Fast proforma issuance and structured order preparation",
      summary:
        "For wholesale purchasing, buyers expect speed when requesting a proforma and clarity when confirming the order scope.",
      body: [
        "For many wholesale buyers, the real decision point begins when the proforma is requested. This section turns that moment into a clearer user journey built around speed, order clarity, and readiness for dispatch.",
        "It presents a clean sequence: submit the request, confirm product type and quantity, receive the proforma, and move toward payment or dispatch readiness. The contact options are separated below so the content stays focused and easier to scan.",
      ],
      bullets: [
        "Rapid intake of customer requests",
        "Clear confirmation of quantity, product, and destination",
        "Proforma issuance in the shortest possible time",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "Proforma line", value: "0790165008", type: "phone" },
        { href: "mailto:khorasanherat@gmail.com", label: "Send request", value: "khorasanherat@gmail.com", type: "email" },
      ],
    },
    {
      id: "support",
      eyebrow: "Support and Follow-up",
      title: "Continuous support for guidance, contact, and order follow-up",
      summary:
        "Support matters most when a buyer needs a direct answer and a clear path to the right communication channel.",
      body: [
        "That is why this section is built around practical support, order follow-up, and a clear next step rather than abstract marketing copy.",
        "It also brings together the factory address on Herat's Islam Qala road under the bypass road and the head office address at Darb Malik, Sarak Manaraha, beside Shahzadegan 9. The result is a more useful article, one that helps the user decide what to do next instead of just reading another introduction.",
      ],
      bullets: [
        "Guidance before and after purchase",
        "Direct order follow-up and response flow",
        "Fast handoff to company communication channels",
      ],
      contacts: [
        { href: "tel:+93790165008", label: "Support line", value: "0790165008", type: "phone" },
        { href: "tel:+93799800454", label: "Second line", value: "0799800454", type: "phone" },
        { href: "mailto:info@khorasanherat.com", label: "Official email", value: "info@khorasanherat.com", type: "email" },
        { href: "mailto:khorasanherat@gmail.com", label: "Support email", value: "khorasanherat@gmail.com", type: "email" },
      ],
      ctas: [
        { href: TELEGRAM_CHANNEL_URL, label: "Open Telegram channel", type: "telegram" },
        { href: "tel:+93790165008", label: "Call sales now", type: "phone" },
      ],
    },
  ],
};

function ContactIcon({ type }: { type: ContactType }) {
  if (type === "phone") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M7.5 4.5h2l1 4-2 1.5a14 14 0 0 0 5 5L15 13l4 1v2a2 2 0 0 1-2 2h-1C10.477 18 6 13.523 6 8V7A2 2 0 0 1 7.5 4.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M4 7.5 12 13l8-5.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.04 15.55 8.66 20.9c.54 0 .77-.23 1.05-.5l2.53-2.42 5.24 3.84c.96.53 1.64.25 1.9-.9l3.44-16.12.01-.01c.31-1.46-.53-2.03-1.46-1.68L1.18 10.86c-1.37.53-1.35 1.3-.23 1.65l5.16 1.61L18.1 6.6c.56-.37 1.07-.16.65.21" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLocaleMetadata(locale);
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);
  const isEnglish = activeLocale === "en";
  const productDetails = productDetailSections[activeLocale];
  const companyProfile = dictionary.companyProfile;

  return (
    <SiteShell dictionary={dictionary} locale={activeLocale}>
      <main
        className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-0 pb-14 pt-0"
        id="home"
      >
        <section
          className="overflow-hidden bg-[var(--color-accent)] shadow-[0_30px_70px_rgba(51,102,255,0.25)]"
          id="products"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/slider_bg.webp')" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,rgba(10,26,94,0.45),rgba(24,57,198,0.72)_42%,rgba(51,102,255,0.88))]" />
            <div className="absolute inset-x-[8%] top-6 hidden h-24 rounded-full bg-white/10 blur-3xl lg:block" />

            <div className="relative px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
              <div className="mx-auto max-w-4xl text-center">
                <h1
                  className={`text-4xl font-semibold leading-tight sm:text-5xl lg:text-[4.4rem] ${
                    isEnglish ? "font-latin" : "font-display"
                  }`}
                >
                  {dictionary.hero.title}
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-white/90 sm:text-[1.1rem]">
                  {dictionary.hero.description}
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-[1380px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dictionary.products.items.map((item, index) => {
                  const detailSection = productDetails[index];

                  return (
                    <article
                      className="overflow-hidden rounded-[0.95rem] border border-white/25 bg-[#f3f4ff] shadow-[0_16px_28px_rgba(16,24,40,0.14)]"
                      key={item.title}
                    >
                      <div className="relative h-44 overflow-hidden bg-[#edf2ff]">
                        <Image
                          alt={item.alt}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                          src={item.image}
                        />
                      </div>

                      <div className="space-y-3 p-4 text-[var(--color-ink)]">
                        <h2 className="text-base font-bold leading-7">{item.title}</h2>
                        {"description" in item ? (
                          <p className="text-sm leading-7 text-[var(--color-muted)]">
                            {item.description}
                          </p>
                        ) : null}
                        <a
                          className="inline-flex w-full items-center justify-center gap-3 rounded-[0.75rem] bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white"
                          href={`#${detailSection.id}`}
                        >
                          {activeLocale === "en" ? (
                            <HiArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                          ) : (
                            <HiArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0" />
                          )}
                          {item.cta}
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-[1500px] rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:px-8 lg:px-10"
          id="company-profile"
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <span className="section-label">{companyProfile.eyebrow}</span>
              <h2 className="section-title">{companyProfile.title}</h2>
              <p className="section-copy">{companyProfile.description}</p>
            </div>

            <div className="grid gap-4">
              {companyProfile.highlights.map((item: string) => (
                <article
                  className="rounded-[1.35rem] border border-[var(--color-line)] bg-[#f8faff] px-5 py-4"
                  key={item}
                >
                  <p className="text-sm leading-8 text-[var(--color-ink)] sm:text-base">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companyProfile.counters.map(
              (item: { label: string; value: number; prefix?: string; suffix?: string }) => (
                <article
                  className="rounded-[1.5rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff,#f6f9ff)] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                  key={item.label}
                >
                  <div className="text-sm font-medium text-[var(--color-muted)]">
                    {item.label}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-[var(--color-accent)] sm:text-4xl">
                    <AnimatedCounter
                      locale={activeLocale}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      value={item.value}
                    />
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section
          className="mx-auto grid w-full max-w-[1500px] gap-5 px-5 sm:px-8 lg:grid-cols-2 lg:px-10"
          id="featured-articles"
        >
          {productDetails.map((section) => (
            <article
              className="rounded-[1.9rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-7"
              id={section.id}
              key={section.id}
            >
              <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-accent)]">
                {section.eyebrow}
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-9 text-[var(--color-ink)]">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {section.summary}
              </p>
              <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--color-ink)] sm:text-[0.98rem]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {section.contacts?.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {section.contacts.map((contact) => (
                    <a
                      className={`rounded-[1rem] border px-4 py-3 transition-all hover:-translate-y-0.5 ${
                        contact.type === "telegram"
                          ? "border-[#b7ddff] bg-[linear-gradient(135deg,#eff8ff,#ffffff)] text-[#0f5ea8] shadow-[0_12px_24px_rgba(14,116,204,0.12)]"
                          : "border-[var(--color-line)] bg-[#f8faff] text-[var(--color-ink)]"
                      }`}
                      href={contact.href}
                      key={`${section.id}-${contact.href}`}
                      rel={contact.type === "telegram" ? "noreferrer" : undefined}
                      target={contact.type === "telegram" ? "_blank" : undefined}
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <ContactIcon type={contact.type} />
                        {contact.label}
                      </span>
                      <span className="mt-2 block break-all text-sm opacity-85">
                        {contact.value}
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}

              {section.ctas?.length ? (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  {section.ctas.map((cta) => (
                    <a
                      className={`inline-flex items-center justify-center gap-3 rounded-[1rem] px-5 py-3 text-sm font-semibold transition-all ${
                        cta.type === "telegram"
                          ? "bg-[linear-gradient(135deg,#2aabee,#0f7fe5)] text-white shadow-[0_14px_28px_rgba(15,127,229,0.22)]"
                          : "border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
                      }`}
                      href={cta.href}
                      key={`${section.id}-${cta.href}`}
                      rel={cta.type === "telegram" ? "noreferrer" : undefined}
                      target={cta.type === "telegram" ? "_blank" : undefined}
                    >
                      <ContactIcon type={cta.type === "telegram" ? "telegram" : "phone"} />
                      <span>{cta.label}</span>
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 rounded-[1.25rem] bg-[#f8faff] p-5">
                <h3 className="text-sm font-bold text-[var(--color-ink)]">
                  {activeLocale === "en"
                    ? "Key points"
                    : activeLocale === "ps"
                      ? "مهم ټکي"
                      : "نکات کلیدی"}
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm leading-7 text-[var(--color-muted)]">
                  {section.bullets.map((bullet) => (
                    <li className="flex gap-3" key={bullet}>
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
