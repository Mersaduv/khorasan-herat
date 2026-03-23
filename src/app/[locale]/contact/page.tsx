import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import {
  buildLocaleMetadata,
  getLocaleData,
  type LocalePageProps,
} from "@/lib/locale-page";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { dictionary } = await getLocaleData(locale);

  return buildLocaleMetadata(locale, "/contact", {
    title: `${dictionary.brand.name} | ${dictionary.header.quickTabs[2].label}`,
    description: `${dictionary.footer.phoneLabel}: ${dictionary.footer.phone}`,
  });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);

  const contactCards = [
    {
      label: dictionary.footer.phoneLabel,
      value: dictionary.footer.phone,
    },
    {
      label: dictionary.footer.emailLabel,
      value: dictionary.footer.email,
    },
    {
      label: dictionary.footer.hoursLabel,
      value: dictionary.footer.hoursValue,
    },
    {
      label: dictionary.footer.addressLabel,
      value: dictionary.footer.address,
    },
  ];

  return (
    <SiteShell
      dictionary={dictionary}
      locale={activeLocale}
      pathSuffix="/contact"
    >
      <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-5 pb-14 pt-8 sm:px-8 lg:px-10">
        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-10 shadow-[0_20px_45px_rgba(15,23,42,0.04)] sm:px-8 lg:px-10">
          <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-accent)]">
            {dictionary.footer.quickLinksTitle}
          </span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            {dictionary.header.quickTabs[2].label}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            {dictionary.footer.aboutText}
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {contactCards.map((item) => (
            <article
              className="rounded-[1.8rem] border border-[var(--color-line)] bg-[#f8faff] p-6 shadow-[0_16px_35px_rgba(15,23,42,0.04)]"
              key={item.label}
            >
              <div className="text-sm text-[var(--color-muted)]">{item.label}</div>
              <div className="mt-3 text-xl font-semibold leading-8 text-[var(--color-ink)]">
                {item.value}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(51,102,255,0.98),rgba(20,54,194,0.92))] px-6 py-8 text-white shadow-[0_22px_60px_rgba(51,102,255,0.24)] sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {dictionary.footer.cta}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/88">
            {dictionary.footer.rights}
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
