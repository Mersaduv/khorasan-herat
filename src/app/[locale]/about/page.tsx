import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import type { Locale } from "@/lib/i18n";
import {
  buildLocaleMetadata,
  getLocaleData,
  type LocalePageProps,
} from "@/lib/locale-page";
import { buildBreadcrumbStructuredData, getCanonicalUrl, getSiteUrl } from "@/lib/seo";

const WHATSAPP_URL = "https://wa.me/93790691000";

type AboutContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroStats: Array<{ label: string; value: string }>;
  storyEyebrow: string;
  storyTitle: string;
  storyParagraphs: string[];
  capabilityEyebrow: string;
  capabilityTitle: string;
  capabilityDescription: string;
  capabilities: Array<{ title: string; text: string }>;
  valuesEyebrow: string;
  valuesTitle: string;
  values: string[];
  coverageEyebrow: string;
  coverageTitle: string;
  coverageDescription: string;
  coverageCards: Array<{ title: string; text: string }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const aboutContent: Record<Locale, AboutContent> = {
  fa: {
    heroEyebrow: "درباره هرات خراسان",
    heroTitle: "روایت روشن از تولید فولاد، اعتماد بازار و پشتیبانی حرفه‌ای از همه پروژه‌ها",
    heroDescription:
      "هرات خراسان یکی از مجموعه‌های اثرگذار صنعت فولاد افغانستان است؛ برندی که با تمرکز بر تولید سیخ‌گول، کیفیت پایدار، فروش پاسخ‌گو و همراهی حرفه‌ای با پروژه‌های کوچک و بزرگ، جایگاه قابل اتکایی در بازار به دست آورده است.",
    heroStats: [
      { label: "دامنه تولید", value: "۸ تا ۳۲ میلی‌متر" },
      { label: "استاندارد مطرح‌شده", value: "ASTM" },
      { label: "گریدهای معرفی‌شده", value: "60 و 75" },
      { label: "تمرکز خدمات", value: "پروژه‌های سراسر افغانستان" },
    ],
    storyEyebrow: "روایت برند",
    storyTitle: "از خط تولید تا مرحله تأمین، هویت برند بر استحکام، اعتماد و تداوم همکاری بنا شده است",
    storyParagraphs: [
      "شرکت صنعتی ذوب‌آهن خراسان هرات خود را مجموعه‌ای معرفی می‌کند که نقش آن فراتر از تولید محصول است. این برند تلاش کرده با تکیه بر استحکام، اعتماد و کیفیت ثابت، به عنوان نامی قابل اتکا در زنجیره تأمین فولاد افغانستان شناخته شود.",
      "محور اصلی معرفی شرکت، تولید سیخ‌گول از سایز ۸ تا ۳۲ میلی‌متر، کیفیت استاندارد، وزن دقیق، قیمت رقابتی و کنترل لابراتواری است. این ترکیب، تصویری روشن از مجموعه‌ای ارائه می‌دهد که هم توان تولید دارد و هم نظم لازم برای پاسخ‌گویی به نیاز بازار را حفظ کرده است.",
      "در کنار توان تولید، هرات خراسان بر دسترس‌پذیری، فروش مستقیم، هماهنگی سریع و حضور عملیاتی در هرات نیز تاکید دارد؛ موضوعی که ارتباط با شرکت را برای خریداران، مجریان و مجموعه‌های همکار ساده‌تر و مطمئن‌تر می‌کند.",
    ],
    capabilityEyebrow: "توانمندی‌ها",
    capabilityTitle: "نمایی روشن از توان تولید، کیفیت محصول و سازوکار همکاری",
    capabilityDescription:
      "چکیده زیر، معرفی ساختاریافته‌ای از مهم‌ترین ظرفیت‌های هرات خراسان است تا کاربر در زمان کوتاه‌تر، تصویر دقیق‌تری از توان فنی و خدماتی شرکت به دست آورد.",
    capabilities: [
      {
        title: "تولید میلگرد برای بازه گسترده پروژه‌ها",
        text: "محصولات از سایز ۸ تا ۳۲ میلی‌متر معرفی شده‌اند؛ بازه‌ای که نیاز طیف وسیعی از پروژه‌های تولیدی، عمرانی، صنعتی، تجارتی و اجرایی را پوشش می‌دهد.",
      },
      {
        title: "تاکید بر استاندارد و گرید تولید",
        text: "در معرفی‌ها به استاندارد ASTM و همچنین گریدهای 60 و 75 اشاره شده است تا کیفیت فنی محصول برای خریدار شفاف‌تر باشد.",
      },
      {
        title: "کنترل کیفیت و تست لابراتوار",
        text: "چندین پست روی دوام بالا، وزن دقیق، استحکام و ضمانت تست لابراتوار تاکید دارند؛ یعنی کیفیت تنها یک شعار تبلیغاتی نمایش داده نشده است.",
      },
      {
        title: "فروش مستقیم و پاسخ‌گویی سریع",
        text: "بخش فروش در پیام‌ها با ادبیاتی مبتنی بر صداقت، پاسخ سریع، مشاوره تخصصی و قیمت مناسب معرفی شده و مسیر همکاری را ساده‌تر نشان می‌دهد.",
      },
    ],
    valuesEyebrow: "مزیت همکاری",
    valuesTitle: "چه چیز این برند را برای خریداران و مجموعه‌های همکار قابل اتکا نشان می‌دهد",
    values: [
      "معرفی شرکت به‌عنوان مجموعه‌ای فراتر از یک کارخانه و به‌عنوان بخشی فعال از زنجیره تأمین فولاد افغانستان.",
      "تکرار منظم پیام کیفیت پایدار، وزن دقیق، قیمت رقابتی و تحویل قابل اعتماد در پست‌های مختلف.",
      "تمرکز روشن بر پاسخ‌گویی به نیاز پروژه‌های مختلف، از سفارش‌های کوچک تا همکاری‌های گسترده و مستمر.",
      "ارائه مسیرهای تماس، واتساپ، تلگرام و ایمیل در اغلب معرفی‌ها که حس دسترس‌پذیری برند را تقویت می‌کند.",
    ],
    coverageEyebrow: "موقعیت و دسترسی",
    coverageTitle: "شبکه ارتباطی شرکت به‌گونه‌ای معرفی شده که کاربر برای اقدام بعدی سرگردان نماند",
    coverageDescription:
      "آدرس‌ها و راه‌های ارتباطی شرکت به‌صورت روشن معرفی شده‌اند تا کاربر برای استعلام، هماهنگی فروش، پیگیری یا شروع همکاری، مسیر مشخص و بدون ابهامی پیش‌رو داشته باشد.",
    coverageCards: [
      {
        title: "کارخانه",
        text: "هرات، سرک اسلام‌قلعه، زیر سرک بایپاس. این نشانی در پست‌های معرفی تولید و ظرفیت کارخانه تکرار شده است.",
      },
      {
        title: "دفتر مرکزی",
        text: "هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان ۹. این آدرس به‌عنوان مسیر هماهنگی فروش و پیگیری سفارش معرفی شده است.",
      },
      {
        title: "ارتباط فروش",
        text: "شماره‌های تماس و واتساپ در بیشتر پست‌ها درج شده‌اند تا مشتری برای استعلام، پیش‌فاکتور و هماهنگی مستقیم اقدام کند.",
      },
    ],
    ctaTitle: "برای استعلام، هماهنگی فروش یا دنبال‌کردن تازه‌ترین معرفی‌ها، مسیر بعدی روشن است",
    ctaDescription:
      "این صفحه با تمرکز بر معرفی دقیق شرکت، توان تولید، کیفیت محصول و مسیرهای همکاری بازنویسی شده است تا کاربر بتواند با شناخت بهتر، سریع‌تر برای ارتباط یا استعلام اقدام کند.",
    ctaPrimary: "ارتباط با ما",
    ctaSecondary: "استعلام در واتساپ",
  },
  ps: {
    heroEyebrow: "د خراسان هرات په اړه",
    heroTitle: "د فولادو توليد، د بازار باور او د ټولو پروژو د ملاتړ روښانه پېژندنه",
    heroDescription:
      "خراسان هرات د افغانستان د فولادو د صنعت له مهمو نومونو څخه دی؛ داسې مجموعه چې د سيخ ګول په توليد، ثابت کيفيت، ځواب ويونکي پلور او د لويو او کوچنيو پروژو په مسلکي ملاتړ تمرکز لري.",
    heroStats: [
      { label: "د توليد لړۍ", value: "۸ تر ۳۲ ملي متر" },
      { label: "ياد شوی معيار", value: "ASTM" },
      { label: "ياد شوي ګريډونه", value: "60 او 75" },
      { label: "د خدمت تمرکز", value: "د افغانستان پروژې" },
    ],
    storyEyebrow: "د برانډ کيسه",
    storyTitle: "له توليدي کرښې تر پروژې پورې، اصلي پيغام په استحکام او باور ولاړ دی",
    storyParagraphs: [
      "په ټيليګرامي محتوا کې شرکت څو ځله ځان د لويو پروژو تکيه‌ګاه او د افغانستان د فولادو د صنعت زړه معرفي کوي. دا ژبه ښيي چې برانډ يوازې د محصول په پلور بسنه نه کوي، بلکې غواړي د ساختماني پروژو د باور وړ همکار په توګه وپېژندل شي.",
      "په پوسټونو کې د ۸ تر ۳۲ ملي متره سيخ ګول، ثابت کيفيت، دقيق وزن، رقابتي نرخ او لابراتواري ازموينو يادونه تکرار شوې ده. همدا تکرار د برانډ پيغام روښانه کوي: مشتري بايد وپوهېږي چې د عملي باور وړ يوې مجموعې سره مخ دی.",
      "د فابريکې د اسلام قلعه سړک او د هرات د مرکزي دفتر د درب ملک پته هم بيا بيا ياده شوې چې د شرکت حضور لا واقعي او تماس لا اسانه کوي.",
    ],
    capabilityEyebrow: "وړتياوې",
    capabilityTitle: "د توليد، کيفيت او همکارۍ د څرنګوالي روښانه انځور",
    capabilityDescription:
      "لاندې لنډيز د خراسان هرات د مهمو وړتياوو منظم معرفي ده څو کاروونکی په لږ وخت کې ښه انځور تر لاسه کړي.",
    capabilities: [
      {
        title: "د بېلابېلو پروژو لپاره د ميلګرد توليد",
        text: "محصولات له ۸ تر ۳۲ ملي متره پورې معرفي شوي دي او دا لړۍ د توليدي، عمراني، صنعتي، تجارتي او نورو پروژو اړتيا پوره کوي.",
      },
      {
        title: "پر معيار او ګريډ تاکيد",
        text: "په محتوا کې ASTM او 60 و 75 ګريډونه ياد شوي څو تخنيکي اعتماد زيات شي.",
      },
      {
        title: "کيفيت کنټرول او لابراتوار",
        text: "په پوسټونو کې د دوام، دقيق وزن، استحکام او لابراتواري ازموينو پر موضوع ټينګار شوی دی.",
      },
      {
        title: "مستقيم پلور او چټک ځواب",
        text: "د پلور څانګه د صداقت، چټک ځواب، مسلکي مشورې او مناسب قيمت له ادبياتو سره معرفي شوې ده.",
      },
    ],
    valuesEyebrow: "د همکارۍ ګټه",
    valuesTitle: "ولې دا برانډ د پروژوي پېرودونکو لپاره د باور وړ ښکاري",
    values: [
      "شرکت ځان يوازې فابريکه نه، بلکې د افغانستان د فولادو د تامين يوه فعاله او باوري برخه معرفي کوي.",
      "په بېلابېلو پوسټونو کې د ثابت کيفيت، دقيق وزن، رقابتي نرخ او باور وړ خدمت پيغام تکرار شوی.",
      "پر ساختماني، صنعتي او تجارتي پروژو روښانه تمرکز د محتوا سمت واضح کړی دی.",
      "د تماس، واتساپ، ټيليګرام او ايميل پرله‌پسې يادونه د لاسرسي احساس پياوړی کوي.",
    ],
    coverageEyebrow: "موقعيت او لاسرسی",
    coverageTitle: "د شرکت د ارتباط لاره داسې معرفي شوې چې کاروونکی د بل ګام لپاره حيران نه شي",
    coverageDescription:
      "په خپاره شوي محتوا کې پتې او د اړيکې لارې څو ځله راغلي دي. دا تکرار په ويب کې د روښانه او کارن‌پسند تجربې لپاره ګټور تمامېږي.",
    coverageCards: [
      {
        title: "فابريکه",
        text: "هرات، د اسلام قلعه سړک، د بایپاس لاندې. دا پته د توليد او ظرفيت په معرفيو کې تکرار شوې ده.",
      },
      {
        title: "مرکزي دفتر",
        text: "هرات، درب ملک، سرک مناره‌ها، جنب شهزادگان ۹. دا ځای د پلور او تعقيب لپاره ياد شوی دی.",
      },
      {
        title: "پلور او اړيکه",
        text: "د تماس او واتساپ شمېرې په ډېرو پوسټونو کې راغلي څو مشتري د استعلام او همغږۍ لپاره ژر اقدام وکړي.",
      },
    ],
    ctaTitle: "د استعلام، پلور همغږۍ او تازه معلوماتو لپاره بل ګام روښانه دی",
    ctaDescription:
      "دا About پاڼه د شرکت د توان، کيفيت او همکارۍ د روښانه معرفي لپاره بيا جوړه شوې ده څو کاروونکی ژر او اسانه اقدام وکړای شي.",
    ctaPrimary: "له موږ سره اړيکه",
    ctaSecondary: "په واتساپ کې استعلام",
  },
  en: {
    heroEyebrow: "About Khorasan Herat",
    heroTitle: "A clearer company story built around steel production, trust, and project support",
    heroDescription:
      "Khorasan Herat presents itself as a steel producer focused on rebar manufacturing, consistent quality, responsive sales, and dependable supply support for small and large projects across Afghanistan.",
    heroStats: [
      { label: "Production range", value: "8 mm to 32 mm" },
      { label: "Referenced standard", value: "ASTM" },
      { label: "Referenced grades", value: "60 and 75" },
      { label: "Service focus", value: "Projects across Afghanistan" },
    ],
    storyEyebrow: "Brand Story",
    storyTitle: "From the production line to the job site, the message is built on strength and reliability",
    storyParagraphs: [
      "Across the Telegram channel, the company repeatedly frames itself as a support pillar for major projects and as a driving force in Afghanistan’s steel industry. That language positions the brand as more than a factory. It aims to be seen as a dependable project partner.",
      "The repeated themes are rebar production from 8 mm to 32 mm, stable quality, precise weight, competitive pricing, and laboratory-backed testing. Together, those points create a clearer commercial promise for buyers who need confidence before ordering.",
      "The posts also repeat both the factory address on Islam Qala Road and the head office location in Darb Malik, Herat. That gives the brand a more grounded and verifiable presence.",
    ],
    capabilityEyebrow: "Capabilities",
    capabilityTitle: "A clearer picture of production strength, product quality, and customer coordination",
    capabilityDescription:
      "The summary below presents the company in a more structured way so visitors can understand its technical and commercial strengths with less friction.",
    capabilities: [
      {
        title: "Rebar output for a broad project range",
        text: "The company highlights products from 8 mm to 32 mm, covering a wide range of industrial, commercial, infrastructure, and execution needs.",
      },
      {
        title: "Visible emphasis on standards and grades",
        text: "Posts reference ASTM along with grade 60 and 75 production to give buyers stronger technical confidence.",
      },
      {
        title: "Quality control and laboratory testing",
        text: "Durability, accurate weight, strength, and lab testing are recurring themes, which makes the quality message more credible.",
      },
      {
        title: "Direct sales and responsive follow-up",
        text: "The sales unit is described with language centered on honesty, quick response, professional advice, and fair pricing.",
      },
    ],
    valuesEyebrow: "Why It Matters",
    valuesTitle: "Signals that make the brand feel more dependable for project buyers",
    values: [
      "The company presents itself as more than a factory and as an active part of Afghanistan’s steel supply chain.",
      "Stable quality, accurate weight, competitive pricing, and reliability are repeated consistently across posts.",
      "The messaging stays focused on practical support for different project types instead of drifting into generic claims.",
      "Telegram, WhatsApp, phone, and email routes are mentioned frequently, reinforcing accessibility and follow-up readiness.",
    ],
    coverageEyebrow: "Presence and Access",
    coverageTitle: "The company’s locations and contact routes are presented in a way that reduces user hesitation",
    coverageDescription:
      "The published content repeatedly includes addresses and communication routes. On the website, that repetition can be turned into a cleaner and more useful user journey.",
    coverageCards: [
      {
        title: "Factory",
        text: "Herat, Islam Qala Road, under the bypass road. This location appears in posts about production and factory capacity.",
      },
      {
        title: "Head Office",
        text: "Herat, Darb Malik, Sarak Manaraha, beside Shahzadegan 9. This office is presented as the coordination point for sales and follow-up.",
      },
      {
        title: "Sales Contact",
        text: "Phone and WhatsApp numbers are repeated throughout the posts for inquiries, proforma requests, and direct coordination.",
      },
    ],
    ctaTitle: "For inquiries, sales coordination, or the latest brand updates, the next step is obvious",
    ctaDescription:
      "This About page now focuses on a clearer introduction to the company, its production strengths, and its collaboration flow so visitors can move faster toward contact or inquiry.",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Inquiry on WhatsApp",
  },
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: activeLocale } = await getLocaleData(locale);
  const content = aboutContent[activeLocale];

  return buildLocaleMetadata(activeLocale, "/about", {
    title:
      activeLocale === "en"
        ? "About Khorasan Herat | Steel Production, Rebar Quality, and Project Supply"
        : activeLocale === "ps"
          ? "د خراسان هرات په اړه | د فولادو توليد، کیفیت او د پروژو تامين"
          : "درباره هرات خراسان | تولید فولاد، کیفیت میلگرد و تامین پروژه‌ها",
    description: content.heroDescription,
    imagePath: "/company/company-warehouse.jpeg",
    keywords:
      activeLocale === "en"
        ? [
            "about Khorasan Herat",
            "Herat steel factory",
            "Afghanistan rebar manufacturer",
            "steel company profile Afghanistan",
          ]
        : activeLocale === "ps"
          ? [
              "د خراسان هرات په اړه",
              "د هرات فولادي فابریکه",
              "د افغانستان میلګرد جوړونکی",
              "د فولادو شرکت پېژندنه",
            ]
          : [
              "درباره هرات خراسان",
              "کارخانه فولاد هرات",
              "تولیدکننده میلگرد افغانستان",
              "معرفی شرکت فولادی افغانستان",
            ],
  });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);
  const content = aboutContent[activeLocale];
  const isEnglish = activeLocale === "en";
  const canonicalUrl = getCanonicalUrl(activeLocale, "/about");
  const breadcrumbData = buildBreadcrumbStructuredData(activeLocale, [
    {
      name: activeLocale === "en" ? "Home" : activeLocale === "ps" ? "کور" : "خانه",
      path: "",
    },
    {
      name: dictionary.header.quickTabs[1].label,
      path: "/about",
    },
  ]);
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: dictionary.header.quickTabs[1].label,
        description: content.heroDescription,
        inLanguage: activeLocale,
        isPartOf: {
          "@id": `${getSiteUrl()}/#website`,
        },
        about: {
          "@id": `${getSiteUrl()}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#capabilities`,
        name:
          activeLocale === "en"
            ? "Khorasan Herat capabilities"
            : activeLocale === "ps"
              ? "د خراسان هرات وړتیاوې"
              : "توانمندی‌های هرات خراسان",
        itemListElement: content.capabilities.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          description: item.text,
        })),
      },
    ],
  };

  return (
    <SiteShell
      dictionary={dictionary}
      locale={activeLocale}
      pathSuffix="/about"
    >
      <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-5 pb-14 pt-8 sm:px-8 lg:px-10">
        <JsonLd data={breadcrumbData} />
        <JsonLd data={aboutStructuredData} />

        <section className="overflow-hidden rounded-[2.2rem] border border-[rgba(255,255,255,0.22)] bg-[linear-gradient(135deg,rgba(18,45,154,0.97),rgba(51,102,255,0.95))] text-white shadow-[0_24px_70px_rgba(51,102,255,0.26)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-12">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                {content.heroEyebrow}
              </span>
              <h1
                className={`mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
                  isEnglish ? "font-latin" : "font-display"
                }`}
              >
                {content.heroTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 sm:text-lg">
                {content.heroDescription}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {content.heroStats.map((item) => (
                <article
                  className="rounded-[1.5rem] border border-white/18 bg-white/10 p-5 backdrop-blur-sm"
                  key={item.label}
                >
                  <div className="text-sm text-white/72">{item.label}</div>
                  <div className="mt-3 text-xl font-bold leading-8 text-white">
                    {item.value}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.9rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)] sm:p-7">
            <span className="section-label">{content.storyEyebrow}</span>
            <h2 className="section-title">{content.storyTitle}</h2>
            <div className="mt-5 space-y-4 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
              {content.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative min-h-[250px] overflow-hidden rounded-[1.9rem] border border-[var(--color-line)] shadow-[0_16px_35px_rgba(15,23,42,0.05)] sm:col-span-2">
              <Image
                alt={dictionary.brand.name}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                src="/company/company-projects.jpeg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,24,66,0.1),rgba(12,24,66,0.62))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-sm font-semibold text-white/80">
                  {activeLocale === "en"
                    ? "Project-ready positioning"
                    : activeLocale === "ps"
                      ? "د پروژو لپاره چمتو موقعيت"
                      : "جایگاه‌سازی برای پروژه‌ها"}
                </div>
                <div className="mt-2 text-xl font-bold leading-8">
                  {activeLocale === "en"
                    ? "A brand message shaped for engineers, contractors, and wholesale buyers"
                    : activeLocale === "ps"
                      ? "هغه برانډ پيغام چې انجنيرانو، قرارداديانو او عمده پېرودونکو ته جوړ شوی"
                      : "پیامی که برای مهندسان، پیمانکاران و خریداران عمده ساخته شده است"}
                </div>
              </div>
            </div>

            <div className="relative min-h-[210px] overflow-hidden rounded-[1.7rem] border border-[var(--color-line)] shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
              <Image
                alt={dictionary.brand.name}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 20vw"
                src="/company/company-operations.jpeg"
              />
            </div>

            <div className="rounded-[1.7rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff,#f6f9ff)] p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
              <div className="text-sm font-semibold text-[var(--color-accent)]">
                {activeLocale === "en"
                  ? "Extracted focus"
                  : activeLocale === "ps"
                    ? "ايستل شوی تمرکز"
                    : "تمرکز استخراج‌شده"}
              </div>
              <p className="mt-4 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                {activeLocale === "en"
                  ? "The brand message consistently revolves around quality, production range, reliability, supply strength, and direct communication."
                  : activeLocale === "ps"
                    ? "د شرکت پيغام بيا بيا پر کيفيت، د توليد پر لړۍ، باور، د پروژو پر ملاتړ او مستقيم ارتباط راڅرخي."
                    : "پیام برند به‌صورت منظم حول کیفیت، دامنه تولید، قابلیت اتکا، پشتیبانی از پروژه‌ها و ارتباط مستقیم شکل گرفته است."}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.9rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)] sm:p-7">
          <span className="section-label">{content.capabilityEyebrow}</span>
          <h2 className="section-title">{content.capabilityTitle}</h2>
          <p className="section-copy">{content.capabilityDescription}</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {content.capabilities.map((item) => (
              <article
                className="rounded-[1.6rem] border border-[var(--color-line)] bg-[#f8faff] p-5"
                key={item.title}
              >
                <h3 className="text-lg font-semibold leading-8 text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.9rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)] sm:p-7">
            <span className="section-label">{content.valuesEyebrow}</span>
            <h2 className="section-title">{content.valuesTitle}</h2>
            <div className="mt-6 space-y-3">
              {content.values.map((value) => (
                <div
                  className="flex gap-3 rounded-[1.25rem] border border-[var(--color-line)] bg-[#f8faff] px-4 py-4"
                  key={value}
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  <p className="text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.9rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.05)] sm:p-7">
            <span className="section-label">{content.coverageEyebrow}</span>
            <h2 className="section-title">{content.coverageTitle}</h2>
            <p className="section-copy">{content.coverageDescription}</p>

            <div className="mt-6 grid gap-4">
              {content.coverageCards.map((item) => (
                <article
                  className="rounded-[1.4rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff,#f8faff)] p-5"
                  key={item.title}
                >
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-[var(--color-line)] bg-[linear-gradient(135deg,#eef4ff,#ffffff)] p-6 shadow-[0_20px_45px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold leading-9 text-[var(--color-ink)] sm:text-3xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                {content.ctaDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap lg:justify-end">
              <Link
                className="inline-flex items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#2aabee,#0f7fe5)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(15,127,229,0.24)]"
                href={`/${activeLocale}/contact`}
              >
                {content.ctaPrimary}
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#25d366,#15b956)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,211,102,0.22)]"
                href={WHATSAPP_URL}
                rel="noreferrer"
                target="_blank"
              >
                {content.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
