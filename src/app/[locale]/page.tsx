import type { Metadata } from "next";
import Image from "next/image";

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
  return buildLocaleMetadata(locale);
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const { dictionary, locale: activeLocale } = await getLocaleData(locale);
  const isEnglish = activeLocale === "en";

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
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: "url('/images/slider_bg.webp')" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,57,198,0.72),rgba(51,102,255,0.88))]" />

            <div className="relative px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
              <div className="mx-auto max-w-4xl text-center">
                <h1
                  className={`text-4xl font-semibold leading-tight sm:text-5xl lg:text-[4.4rem] ${isEnglish ? "font-latin" : "font-display"}`}
                >
                  {dictionary.hero.title}
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-white/90 sm:text-[1.1rem]">
                  {dictionary.hero.description}
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-[1380px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dictionary.products.items.map((item) => (
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
                        href="#services"
                      >
                        <span>‹</span>
                        {item.cta}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1500px] gap-5 px-5 sm:px-8 lg:grid-cols-3 lg:px-10" id="services">
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

        <section
          className="mx-auto w-full max-w-[1500px] rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:px-8 lg:px-10"
          id="about"
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="section-label">{dictionary.about.eyebrow}</span>
              <h2 className="section-title">{dictionary.about.title}</h2>
              <p className="section-copy">{dictionary.about.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {dictionary.about.stats.map((item) => (
                <div
                  className="rounded-[1.6rem] border border-[var(--color-line)] bg-[#f8faff] p-5"
                  key={item.label}
                >
                  <div className="text-sm text-[var(--color-muted)]">{item.label}</div>
                  <div className="mt-3 text-2xl font-semibold text-[var(--color-accent)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
