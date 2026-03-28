import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Dictionary, Locale } from "@/lib/i18n";

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
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
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
