import type { Metadata } from "next";
import "@/app/globals.css";

import { getDirection, hasLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const dynamicParams = false;

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html dir={getDirection(locale)} lang={locale}>
      <body className="text-[var(--color-ink)] antialiased">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(213,111,57,0.15),transparent_34%),radial-gradient(circle_at_bottom,_rgba(26,89,86,0.18),transparent_34%)]" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(250,244,234,0.98),rgba(245,238,227,0.94))]" />
        {children}
      </body>
    </html>
  );
}
