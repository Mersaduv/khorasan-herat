import Link from "next/link";

import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

type SiteFooterProps = Readonly<{
  dictionary: Dictionary;
  locale: Locale;
}>;

const WHATSAPP_URL = "https://wa.me/93791954490";

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  return (
    <footer className="mt-14 border-t border-[var(--color-line)] bg-[#f6f8fd]">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-12 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-8 shadow-[0_20px_45px_rgba(15,23,42,0.04)] sm:px-8">
          <div className="grid gap-10 xl:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[var(--color-accent-soft)] text-xl font-bold text-[var(--color-accent)]">
                  HK
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
                    {dictionary.brand.name}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {dictionary.brand.tagline}
                  </p>
                </div>
              </div>

              <p className="max-w-xl text-sm leading-8 text-[var(--color-muted)]">
                {dictionary.footer.aboutText}
              </p>

              <div className="flex flex-wrap gap-3">
                {dictionary.footer.badges.map((badge) => (
                  <span
                    className="inline-flex rounded-[1rem] border border-[var(--color-line)] bg-[#f8faff] px-4 py-3 text-sm font-medium text-[var(--color-ink)]"
                    key={badge}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {dictionary.footer.quickLinksTitle}
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[var(--color-muted)]">
                {dictionary.footer.quickLinks.map((item) => (
                  <Link
                    className="transition-colors hover:text-[var(--color-accent)]"
                    href={getLocalizedPath(locale, item.href)}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {dictionary.footer.companyLinksTitle}
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[var(--color-muted)]">
                {dictionary.footer.companyLinks.map((item) => (
                  <Link
                    className="transition-colors hover:text-[var(--color-accent)]"
                    href={getLocalizedPath(locale, item.href)}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {dictionary.footer.sectionsTitle}
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[var(--color-muted)]">
                {dictionary.products.items.map((item) => (
                  <Link
                    className="transition-colors hover:text-[var(--color-accent)]"
                    href={getLocalizedPath(locale, "/")}
                    key={item.title}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-10 grid gap-4 border-t border-[var(--color-line)] pt-8 lg:grid-cols-4"
            id="contact"
          >
            <div className="rounded-[1.5rem] bg-[#f8faff] p-5">
              <div className="text-sm text-[var(--color-muted)]">
                {dictionary.footer.hoursLabel}
              </div>
              <div className="mt-3 text-lg font-semibold text-[var(--color-ink)]">
                {dictionary.footer.hoursValue}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#f8faff] p-5">
              <div className="text-sm text-[var(--color-muted)]">
                {dictionary.footer.phoneLabel}
              </div>
              <div className="mt-3 text-lg font-semibold text-[var(--color-ink)]">
                {dictionary.footer.phone}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#f8faff] p-5">
              <div className="text-sm text-[var(--color-muted)]">
                {dictionary.footer.emailLabel}
              </div>
              <div className="mt-3 text-lg font-semibold text-[var(--color-ink)]">
                {dictionary.footer.email}
              </div>
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

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-line)] pt-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {dictionary.footer.socials.map((item) => (
                <span
                  className="inline-flex min-w-12 items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-accent)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              className="inline-flex items-center justify-center gap-3 rounded-[1.4rem] bg-[var(--color-accent)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(51,102,255,0.24)]"
              href={WHATSAPP_URL}
              rel="noreferrer"
              target="_blank"
            >
              <span>◉</span>
              <span>{dictionary.footer.cta}</span>
            </Link>
          </div>

          <div className="mt-6 text-sm text-[var(--color-muted)]">
            {dictionary.footer.rights} · /{locale}
          </div>
        </div>
      </div>
    </footer>
  );
}
