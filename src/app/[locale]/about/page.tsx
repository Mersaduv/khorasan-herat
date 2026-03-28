import type { Metadata } from "next";

import { AnimatedCounter } from "@/components/animated-counter";
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

  return buildLocaleMetadata(locale, "/about", {
    title: `${dictionary.brand.name} | ${dictionary.header.quickTabs[1].label}`,
    description: dictionary.about.description,
  });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);
  const companyProfile = dictionary.companyProfile;

  return (
    <SiteShell
      dictionary={dictionary}
      locale={activeLocale}
      pathSuffix="/about"
    >
      <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-5 pb-14 pt-8 sm:px-8 lg:px-10">
        <section className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(51,102,255,0.98),rgba(20,54,194,0.92))] px-6 py-10 text-white shadow-[0_22px_60px_rgba(51,102,255,0.24)] sm:px-8 lg:px-10">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            {dictionary.about.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {dictionary.about.title}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-white/88 sm:text-lg">
            {dictionary.about.description}
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {companyProfile.highlights.map((item: string) => (
            <article
              className="rounded-[1.6rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.04)]"
              key={item}
            >
              <p className="text-sm leading-8 text-[var(--color-ink)] sm:text-base">
                {item}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {companyProfile.counters.map(
            (item: { label: string; value: number; prefix?: string; suffix?: string }) => (
              <article
                className="rounded-[1.6rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.04)]"
                key={item.label}
              >
                <div className="text-sm text-[var(--color-muted)]">{item.label}</div>
                <div className="mt-3 text-3xl font-semibold text-[var(--color-accent)]">
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
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {dictionary.services.items.map((item) => (
            <article
              className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.04)]"
              key={item.title}
            >
              <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-accent)]">
                {item.eyebrow}
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-ink)]">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
                {item.text}
              </p>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
