import Image from "next/image";
import Link from "next/link";

import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

type SiteFooterProps = Readonly<{
  dictionary: Dictionary;
  locale: Locale;
}>;

const WHATSAPP_URL = "https://wa.me/93791954490";
const TELEGRAM_CHANNEL_URL = "https://t.me/khorasanherat";
const TELEGRAM_CONTACT_URL = "https://t.me/khodairhamCom";
const INSTAGRAM_URL = "https://www.instagram.com/khorasan_herat_iron_compani";
const FACEBOOK_URL = "https://www.facebook.com/share/16MXcQSssK";

function WhatsAppIcon() {
  return <Image alt="WhatsApp" height={20} src="/icons/whatsapp.svg" width={20} />;
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.04 15.55 8.66 20.9c.54 0 .77-.23 1.05-.5l2.53-2.42 5.24 3.84c.96.53 1.64.25 1.9-.9l3.44-16.12.01-.01c.31-1.46-.53-2.03-1.46-1.68L1.18 10.86c-1.37.53-1.35 1.3-.23 1.65l5.16 1.61L18.1 6.6c.56-.37 1.07-.16.65.21" />
    </svg>
  );
}

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { href: INSTAGRAM_URL, label: "Instagram", shortLabel: "Ig" },
    { href: FACEBOOK_URL, label: "Facebook", shortLabel: "Fb" },
    { href: TELEGRAM_CHANNEL_URL, label: "Telegram", shortLabel: "Tg" },
    { href: WHATSAPP_URL, label: "WhatsApp", shortLabel: "Wa" },
  ];

  return (
    <footer className="mt-14 border-t border-[var(--color-line)] bg-[#f6f8fd]">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-12 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-white px-6 py-8 shadow-[0_20px_45px_rgba(15,23,42,0.04)] sm:px-8">
          <div className="grid gap-10 xl:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.35rem] bg-[var(--color-accent-soft)]">
                  <Image alt={dictionary.brand.name} height={58} src="/images/logo.png" width={58} />
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
            className="mt-10 grid gap-4 border-t border-[var(--color-line)] pt-8 lg:grid-cols-5"
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
              <div className="mt-3 flex flex-col gap-2 text-lg font-semibold text-[var(--color-ink)]">
                {dictionary.footer.phones.map((phone: string) => (
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} key={phone}>
                    {phone}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#f8faff] p-5">
              <div className="text-sm text-[var(--color-muted)]">
                {dictionary.footer.emailLabel}
              </div>
              <div className="mt-3 flex flex-col gap-2 break-all text-lg font-semibold text-[var(--color-ink)]">
                {dictionary.footer.emails.map((email: string) => (
                  <a href={`mailto:${email}`} key={email}>
                    {email}
                  </a>
                ))}
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
              {socialLinks.map((item) => (
                <Link
                  className="inline-flex min-w-12 items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-accent)]"
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-3 rounded-[1.4rem] bg-[linear-gradient(135deg,#25d366,#15b956)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,211,102,0.24)]"
                href={WHATSAPP_URL}
                rel="noreferrer"
                target="_blank"
              >
                <WhatsAppIcon />
                <span>{dictionary.footer.cta}</span>
              </Link>

              <Link
                className="inline-flex items-center justify-center gap-3 rounded-[1.4rem] bg-[linear-gradient(135deg,#2aabee,#0f7fe5)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(15,127,229,0.24)]"
                href={TELEGRAM_CHANNEL_URL}
                rel="noreferrer"
                target="_blank"
              >
                <TelegramIcon />
                <span>{dictionary.footer.telegramCta}</span>
              </Link>

              <Link
                className="inline-flex items-center justify-center gap-3 rounded-[1.4rem] border border-[#b7ddff] bg-white px-6 py-4 text-sm font-semibold text-[#0f7fe5] shadow-[0_16px_30px_rgba(15,127,229,0.12)]"
                href={TELEGRAM_CONTACT_URL}
                rel="noreferrer"
                target="_blank"
              >
                <TelegramIcon />
                <span>{dictionary.footer.telegramContactCta}</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 text-sm text-[var(--color-muted)]">
            {currentYear} {dictionary.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
