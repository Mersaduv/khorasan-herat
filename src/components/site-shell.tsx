import type { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Dictionary, Locale } from "@/lib/i18n";
import { buildOrganizationStructuredData } from "@/lib/seo";

type SiteShellProps = Readonly<{
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
  pathSuffix?: string;
}>;

export function SiteShell({
  children,
  dictionary,
  locale,
  pathSuffix = "",
}: SiteShellProps) {
  const organizationStructuredData = buildOrganizationStructuredData(locale, dictionary);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-slate-50">
      <JsonLd data={organizationStructuredData} />
      <SiteHeader
        dictionary={dictionary}
        locale={locale}
        pathSuffix={pathSuffix}
      />
      {children}
      <SiteFooter dictionary={dictionary} locale={locale} />
    </div>
  );
}
