"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type SearchArticle = {
  href: string;
  title: string;
  excerpt?: string;
  source?: string;
};

type HeaderSearchProps = Readonly<{
  articles: SearchArticle[];
  placeholder: string;
  direction?: "rtl" | "ltr";
  idleLabel?: string;
  resultLabel?: string;
  emptyLabel?: string;
}>;

export function HeaderSearch({
  articles,
  placeholder,
  direction = "rtl",
  idleLabel,
  resultLabel,
  emptyLabel,
}: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const fallbackIdleLabel = direction === "rtl" ? "مطالب" : "Articles";
  const fallbackResultLabel = direction === "rtl" ? "نتیجه جستجو" : "Search results";
  const fallbackEmptyLabel =
    direction === "rtl"
      ? "برای این جستجو نتیجه‌ای پیدا نشد."
      : "No matching article was found.";
  const filteredArticles = articles.filter((article) =>
    `${article.title} ${article.excerpt ?? ""}`.toLowerCase().includes(normalizedQuery),
  );
  const visibleArticles = normalizedQuery
    ? filteredArticles
    : articles.slice(0, Math.min(4, articles.length));

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <div className="relative w-full" dir={direction} ref={wrapperRef}>
      <div className="flex items-center gap-3 rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <svg
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-[var(--color-muted)]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <input
          className="w-full bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
          dir={direction}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{ textAlign: direction === "rtl" ? "right" : "left" }}
          value={query}
        />
      </div>

      <div
        className={`absolute start-0 top-[calc(100%+0.55rem)] z-50 w-full overflow-hidden rounded-[1rem] border border-[var(--color-line)] bg-white shadow-[0_18px_38px_rgba(15,23,42,0.08)] transition-all ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="border-b border-[var(--color-line)] px-4 py-3 text-xs font-semibold text-[var(--color-muted)]">
          {normalizedQuery ? (resultLabel ?? fallbackResultLabel) : (idleLabel ?? fallbackIdleLabel)}
        </div>

        <div className="p-2">
          {visibleArticles.length > 0 ? (
            visibleArticles.map((article) => (
              <Link
                className="flex items-center justify-between gap-4 rounded-[0.8rem] px-3 py-3 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-card-strong)]"
                href={article.href}
                key={article.title}
                onClick={() => setIsOpen(false)}
                rel="noreferrer"
                target="_blank"
              >
                <span className="flex min-w-0 flex-col">
                  <span>{article.title}</span>
                  {article.excerpt ? (
                    <span className="mt-1 line-clamp-2 text-xs leading-6 text-[var(--color-muted)]">
                      {article.excerpt}
                    </span>
                  ) : null}
                  {article.source ? (
                    <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                      {article.source}
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 text-[var(--color-accent)]">↖</span>
              </Link>
            ))
          ) : (
            <div className="px-3 py-4 text-sm leading-7 text-[var(--color-muted)]">
              {emptyLabel ?? fallbackEmptyLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
