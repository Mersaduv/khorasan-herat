import type { Metadata } from "next";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import { AnimatedCounter } from "@/components/animated-counter";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/lib/i18n";
import {
  buildLocaleMetadata,
  getLocaleData,
  type LocalePageProps,
} from "@/lib/locale-page";
import {
  buildBreadcrumbStructuredData,
  buildFaqStructuredData,
  getAbsoluteUrl,
  getCanonicalUrl,
  getSiteUrl,
} from "@/lib/seo";

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

type FaqItem = {
  answer: string;
  question: string;
};

type HomeSeoSection = {
  description: string;
  eyebrow: string;
  faqs: FaqItem[];
  faqTitle: string;
  marketCoverage: string[];
  marketCoverageTitle: string;
  paragraphs: string[];
  productDescription: string;
  productHighlights: string[];
  productHighlightsTitle: string;
  productName: string;
  title: string;
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

const homeSeoSections: Record<Locale, HomeSeoSection> = {
  fa: {
    eyebrow: "سئوی محتوایی و معرفی تخصصی",
    title: "تولید میلگرد و تأمین محصولات فولادی برای پروژه‌های ساختمانی، صنعتی و عمرانی افغانستان",
    description:
      "این صفحه به‌صورت هدفمند روی کلمات کلیدی اصلی برند و بازار هدف بازنویسی شده تا کاربر و موتور جستجو هر دو دقیق‌تر بفهمند هرات خراسان چه چیزی تولید می‌کند، چه مزیتی دارد و برای چه نوع پروژه‌هایی مناسب است.",
    paragraphs: [
      "هرات خراسان به‌عنوان یک مجموعه فعال در صنعت فولاد افغانستان، روی تولید میلگرد و سیخ‌گول از سایز ۸ تا ۳۲ میلی‌متر تمرکز دارد. ترکیب این دامنه تولید با فروش مستقیم، کنترل کیفیت، تست لابراتوار و پاسخ‌گویی سریع، تصویری روشن از یک برند پروژه‌محور ارائه می‌دهد.",
      "تمرکز محتوایی این صفحه فقط معرفی ظاهری شرکت نیست. در متن‌ها و ساختار سئو، عباراتی مانند کارخانه میلگرد هرات، فروش میلگرد افغانستان، محصولات فولادی برای پروژه‌های ساختمانی و صدور سریع پیش‌فاکتور به‌شکل طبیعی استفاده شده‌اند تا هم جستجوهای برند و هم جستجوهای محصولی پوشش داده شوند.",
    ],
    productHighlightsTitle: "محورهای کلیدی محصول و مزیت رقابتی",
    productHighlights: [
      "تولید میلگرد و سیخ‌گول از سایز ۸ تا ۳۲ میلی‌متر برای پروژه‌های کوچک تا بزرگ",
      "اشاره مستقیم به استاندارد ASTM و گریدهای 60 و 75 برای افزایش اعتماد فنی خریدار",
      "کنترل کیفیت، وزن دقیق، تست لابراتوار و آمادگی برای تحویل پروژه‌ای",
      "فروش مستقیم، پیش‌فاکتور سریع و هماهنگی برای خریداران عمده و پروژه‌ای",
    ],
    marketCoverageTitle: "بازار هدف و جستجوهای پوشش‌داده‌شده",
    marketCoverage: [
      "خرید میلگرد در هرات و افغانستان",
      "تامین آهن آلات و محصولات فولادی برای پروژه‌های ساختمانی و عمرانی",
      "فروش عمده میلگرد برای پیمانکاران، مجریان و خریداران پروژه‌ای",
      "استعلام قیمت، ثبت سفارش و دریافت پیش‌فاکتور از تولیدکننده فولاد در هرات",
    ],
    faqTitle: "پرسش‌های پرتکرار خریداران",
    faqs: [
      {
        question: "هرات خراسان چه محصولاتی را بیشتر عرضه می‌کند؟",
        answer:
          "تمرکز اصلی شرکت روی تولید و عرضه میلگرد و سیخ‌گول در بازه ۸ تا ۳۲ میلی‌متر و همچنین تأمین محصولات فولادی برای پروژه‌های ساختمانی، صنعتی و عمرانی است.",
      },
      {
        question: "آیا این شرکت برای خریدهای عمده و پروژه‌ای مناسب است؟",
        answer:
          "بله. محتوای سایت و مسیرهای ارتباطی شرکت نشان می‌دهند که فروش مستقیم، صدور سریع پیش‌فاکتور، هماهنگی سفارش و پیگیری برای مشتریان پروژه‌ای و خریداران عمده از اولویت‌های مجموعه است.",
      },
      {
        question: "چه مزیت‌هایی برای اعتماد به کیفیت محصول مطرح شده است؟",
        answer:
          "در معرفی برند روی کنترل کیفیت، استاندارد ASTM، گریدهای 60 و 75، وزن دقیق و تست لابراتوار تاکید شده تا خریدار پیش از سفارش شناخت فنی روشن‌تری داشته باشد.",
      },
      {
        question: "چطور می‌توان برای استعلام یا سفارش با هرات خراسان ارتباط گرفت؟",
        answer:
          "کاربر می‌تواند از طریق شماره‌های تماس، واتساپ، ایمیل رسمی و کانال تلگرام شرکت برای استعلام قیمت، دریافت پیش‌فاکتور و هماهنگی فروش اقدام کند.",
      },
    ],
    productName: "میلگرد و سیخ‌گول هرات خراسان",
    productDescription:
      "میلگرد و محصولات فولادی پروژه‌محور در سایز ۸ تا ۳۲ میلی‌متر با تمرکز بر کیفیت، فروش مستقیم و تأمین قابل اتکا برای پروژه‌های افغانستان.",
  },
  ps: {
    eyebrow: "سيويي محتوا او تخصصي پېژندنه",
    title: "د افغانستان د ساختماني، صنعتي او عمراني پروژو لپاره د میلګرد او فولادي محصولاتو تامين",
    description:
      "دا پاڼه داسې جوړه شوې چې هم کاروونکي او هم د لټون ماشينونه په روښانه ډول درک کړي چې خراسان هرات څه توليدوي، څه ډول پېرودونکو ته خدمت کوي او اصلي رقابتي ګټه يې څه ده.",
    paragraphs: [
      "خراسان هرات د افغانستان د فولادو په بازار کې د میلګرد او سيخ ګول د توليد پر محور ولاړ برانډ دی. د ۸ تر ۳۲ ملي متره توليدي لړۍ، د کیفیت کنټرول، د لابراتوار ازموينه او د پلور مستقيمه همغږي دا برانډ د پروژو لپاره لا باوري کوي.",
      "په دې پاڼه کې د هرات د میلګرد فابریکه، د افغانستان د فولادي محصولاتو پلور، د پروژو لپاره د اوسپنې تامين او چټک پیش‌فاکتور غوندې مهمې کليدي جملې په طبيعي ډول ځای پر ځای شوې دي څو برانډي او محصولي لټونونه دواړه پیاوړي شي.",
    ],
    productHighlightsTitle: "د محصول او سیالۍ اصلي ټکي",
    productHighlights: [
      "له ۸ تر ۳۲ ملي متره میلګرد او سيخ ګول د بېلابېلو پروژو لپاره",
      "د ASTM معیار او 60 او 75 ګریډونو یادونه د تخنیکي باور د زیاتولو لپاره",
      "کیفیت کنټرول، دقیق وزن، لابراتواري ازموینه او د پروژې لپاره چمتو تحویل",
      "مستقيم پلور، چټک پیش‌فاکتور او د عمده او پروژوي پېرودونکو لپاره همغږي",
    ],
    marketCoverageTitle: "هدف بازار او پوښل شوې لټونونه",
    marketCoverage: [
      "په هرات او افغانستان کې د میلګرد پېرود",
      "د ساختماني او عمراني پروژو لپاره د فولادي محصولاتو تامين",
      "د قرارداديانو او عمده خریدارانو لپاره د میلګرد عمده پلور",
      "د قیمت استعلام، سفارش ثبت او د پیش‌فاکتور ترلاسه کول",
    ],
    faqTitle: "د پېرودونکو ډېر تکرارېدونکي پوښتنې",
    faqs: [
      {
        question: "خراسان هرات تر ټولو ډېر کوم محصولات وړاندې کوي؟",
        answer:
          "د شرکت اصلي تمرکز د ۸ تر ۳۲ ملي متره میلګرد او سيخ ګول په توليد او همدارنګه د ساختماني او صنعتي پروژو لپاره د فولادي محصولاتو پر تامين دی.",
      },
      {
        question: "ایا دا شرکت د عمده او پروژوي پېر لپاره مناسب دی؟",
        answer:
          "هو. د ويب پاڼې محتوا ښيي چې مستقيم پلور، چټک پیش‌فاکتور، د سفارش همغږي او تعقيب د پروژوي او عمده خریدارانو لپاره د شرکت له مهمو خدمتونو څخه دي.",
      },
      {
        question: "د محصول د کیفیت لپاره کوم باور ورکوونکي ټکي یاد شوي؟",
        answer:
          "په برانډ معرفي کې د کیفیت کنټرول، ASTM معیار، 60 او 75 ګریډونه، دقیق وزن او لابراتواري ازموینه په واضح ډول یاد شوي دي.",
      },
      {
        question: "د استعلام یا سفارش لپاره څنګه اړیکه نیول کېدای شي؟",
        answer:
          "کاروونکي کولای شي د شرکت له ټیلیفون، واتساپ، رسمي برېښنالیک او ټیلیګرامي چینل څخه د قیمت، پیش‌فاکتور او همغږۍ لپاره ګټه واخلي.",
      },
    ],
    productName: "د خراسان هرات میلګرد او فولادي محصولات",
    productDescription:
      "د ۸ تر ۳۲ ملي متره میلګرد او فولادي محصولاتو تامين د افغانستان د پروژو لپاره، له کیفیت کنټرول او چټک پلور همغږۍ سره.",
  },
  en: {
    eyebrow: "Search-focused company positioning",
    title: "Rebar manufacturing and steel product supply for construction projects in Herat and across Afghanistan",
    description:
      "This page is written to clarify the company’s real commercial focus for both users and search engines: rebar manufacturing, steel product supply, direct sales coordination, and project-ready support.",
    paragraphs: [
      "Khorasan Herat positions itself as a steel manufacturer and supplier serving construction, industrial, and infrastructure projects. Its strongest product signal is rebar and steel bars from 8 mm to 32 mm, supported by quality control, laboratory testing, and responsive sales coordination.",
      "The homepage copy now naturally targets high-intent searches such as Herat rebar manufacturer, Afghanistan steel supplier, project steel supply, wholesale rebar sales, and fast proforma issuance. That helps the site compete not only for brand searches but also for product and procurement queries.",
    ],
    productHighlightsTitle: "Core product and commercial strengths",
    productHighlights: [
      "Rebar and steel bar production from 8 mm to 32 mm for a wide range of project types",
      "Clear references to ASTM and grade 60 and 75 production to strengthen technical trust",
      "Quality control, accurate weight, laboratory testing, and dispatch readiness",
      "Direct sales, fast proforma issuance, and smoother coordination for wholesale buyers",
    ],
    marketCoverageTitle: "Target market and search intent coverage",
    marketCoverage: [
      "Buying rebar in Herat and across Afghanistan",
      "Steel products for construction, industrial, and infrastructure projects",
      "Wholesale rebar supply for contractors, project buyers, and commercial procurement teams",
      "Price inquiry, order preparation, and proforma requests from a Herat steel company",
    ],
    faqTitle: "Frequently asked buyer questions",
    faqs: [
      {
        question: "What does Khorasan Herat primarily sell?",
        answer:
          "The strongest product focus is rebar and steel bars in the 8 mm to 32 mm range, along with project-oriented steel supply for construction and industrial demand.",
      },
      {
        question: "Is the company suitable for wholesale and project buyers?",
        answer:
          "Yes. The site content clearly emphasizes direct sales coordination, proforma issuance, project-ready communication, and support for repeat and large-volume buyers.",
      },
      {
        question: "What quality signals are highlighted on the website?",
        answer:
          "The brand messaging repeatedly points to quality control, ASTM references, grade 60 and 75 positioning, accurate weight, and laboratory-backed testing.",
      },
      {
        question: "How can a buyer request pricing or a proforma?",
        answer:
          "Buyers can use the company phone numbers, WhatsApp, official email addresses, and Telegram channel to request pricing, send order details, and coordinate a proforma.",
      },
    ],
    productName: "Khorasan Herat rebar and steel products",
    productDescription:
      "Rebar and project steel supply from 8 mm to 32 mm with quality control, direct sales coordination, and wholesale readiness for Afghanistan.",
  },
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
  const { locale: activeLocale } = await getLocaleData(locale);

  return buildLocaleMetadata(activeLocale, "", {
    title:
      activeLocale === "en"
        ? "Khorasan Herat | Rebar and Steel Products Supplier in Herat, Afghanistan"
        : activeLocale === "ps"
          ? "خراسان هرات | په هرات کې د میلګرد او فولادي محصولاتو عرضه کوونکی"
          : "هرات خراسان | تولید میلگرد و محصولات فولادی در هرات برای پروژه‌های افغانستان",
    description:
      activeLocale === "en"
        ? "Official multilingual website of Khorasan Herat for rebar manufacturing, steel products, wholesale supply, quality control, and fast project sales coordination in Afghanistan."
        : activeLocale === "ps"
          ? "د خراسان هرات رسمي وېب‌پاڼه د میلګرد توليد، فولادي محصولاتو، عمده پلور، کیفیت کنټرول او د افغانستان د پروژو لپاره د چټک پلور همغږۍ لپاره."
          : "وب‌سایت رسمی هرات خراسان برای تولید میلگرد، فروش محصولات فولادی، تامین عمده پروژه‌ها، کنترل کیفیت و صدور سریع پیش‌فاکتور در افغانستان.",
    imagePath: "/company/company-projects.jpeg",
    keywords:
      activeLocale === "en"
        ? [
            "rebar manufacturer Herat",
            "steel supplier Afghanistan",
            "wholesale steel products Herat",
            "project steel coordination",
          ]
        : activeLocale === "ps"
          ? [
              "د هرات میلګرد فابریکه",
              "د افغانستان فولادي محصولات",
              "د پروژو لپاره د اوسپنې تامين",
              "چټک پیش فاکتور",
            ]
          : [
              "کارخانه میلگرد هرات",
              "فروش محصولات فولادی افغانستان",
              "تامین فولاد پروژه‌های ساختمانی",
              "پیش فاکتور سریع میلگرد",
            ],
  });
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);
  const isEnglish = activeLocale === "en";
  const productDetails = productDetailSections[activeLocale];
  const seoContent = homeSeoSections[activeLocale];
  const companyProfile = dictionary.companyProfile;
  const canonicalUrl = getCanonicalUrl(activeLocale);
  const breadcrumbData = buildBreadcrumbStructuredData(activeLocale, [
    {
      name: activeLocale === "en" ? "Home" : activeLocale === "ps" ? "کور" : "خانه",
      path: "",
    },
  ]);
  const faqData = buildFaqStructuredData(seoContent.faqs);
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name:
          activeLocale === "en"
            ? "Khorasan Herat Home"
            : activeLocale === "ps"
              ? "د خراسان هرات کور"
              : "خانه هرات خراسان",
        description: seoContent.description,
        inLanguage: activeLocale,
        isPartOf: {
          "@id": `${getSiteUrl()}/#website`,
        },
        about: {
          "@id": `${getSiteUrl()}/#organization`,
        },
      },
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#main-product`,
        name: seoContent.productName,
        description: seoContent.productDescription,
        brand: {
          "@type": "Brand",
          name: dictionary.brand.name,
        },
        category: activeLocale === "en" ? "Steel Rebar" : "میلگرد و محصولات فولادی",
        material: "Steel",
        image: getAbsoluteUrl("/company/company-projects.jpeg"),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: activeLocale === "en" ? "Production range" : "بازه تولید",
            value: activeLocale === "en" ? "8 mm to 32 mm" : "۸ تا ۳۲ میلی‌متر",
          },
          {
            "@type": "PropertyValue",
            name: "Standard",
            value: "ASTM",
          },
          {
            "@type": "PropertyValue",
            name: activeLocale === "en" ? "Grades" : "گریدها",
            value: "60, 75",
          },
        ],
      },
      ...dictionary.products.items.map((item, index) => ({
        "@type": "Service",
        "@id": `${canonicalUrl}#service-${index + 1}`,
        name: item.title,
        description: item.description,
        provider: {
          "@id": `${getSiteUrl()}/#organization`,
        },
        areaServed: "Afghanistan",
      })),
    ],
  };

  return (
    <SiteShell dictionary={dictionary} locale={activeLocale}>
      <main
        className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-0 pb-14 pt-0"
        id="home"
      >
        <JsonLd data={breadcrumbData} />
        <JsonLd data={pageStructuredData} />
        <JsonLd data={faqData} />

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

        <section className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="section-label">{seoContent.eyebrow}</span>
                <h2 className="section-title">{seoContent.title}</h2>
                <p className="section-copy">{seoContent.description}</p>
                <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                  {seoContent.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <article className="rounded-[1.5rem] border border-[var(--color-line)] bg-[#f8faff] p-5">
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                    {seoContent.productHighlightsTitle}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {seoContent.productHighlights.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-[1.5rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff,#f8faff)] p-5">
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                    {seoContent.marketCoverageTitle}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {seoContent.marketCoverage.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
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

        <section className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:p-8">
            <h2 className="section-title">{seoContent.faqTitle}</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {seoContent.faqs.map((item) => (
                <article
                  className="rounded-[1.45rem] border border-[var(--color-line)] bg-[#f8faff] p-5"
                  key={item.question}
                >
                  <h3 className="text-lg font-semibold leading-8 text-[var(--color-ink)]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
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
