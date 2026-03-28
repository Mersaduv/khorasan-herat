"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

import { localeDetails, locales, type Locale } from "@/lib/locale-config";

type LanguageSwitcherProps = Readonly<{
  currentLocale: Locale;
  languageLabel: string;
  pathSuffix?: string;
}>;

type MenuPosition = {
  left: number;
  top: number;
  width: number;
};

const MENU_WIDTH = 214;
const VIEWPORT_GAP = 12;

export function LanguageSwitcher({
  currentLocale,
  languageLabel,
  pathSuffix = "",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isRtl = currentLocale !== "en";

  const currentLabel = useMemo(
    () => localeDetails[currentLocale].label,
    [currentLocale],
  );
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  useEffect(() => {
    function updateMenuPosition() {
      if (!buttonRef.current) {
        return;
      }

      const rect = buttonRef.current.getBoundingClientRect();
      const maxLeft = window.innerWidth - MENU_WIDTH - VIEWPORT_GAP;
      const preferredLeft = isRtl ? rect.right - MENU_WIDTH : rect.left;

      setMenuPosition({
        left: Math.min(Math.max(preferredLeft, VIEWPORT_GAP), maxLeft),
        top: rect.bottom + 8,
        width: MENU_WIDTH,
      });
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      const clickedTrigger = wrapperRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedTrigger && !clickedMenu) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleViewportChange() {
      if (isOpen) {
        updateMenuPosition();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    if (isOpen) {
      updateMenuPosition();
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen, isRtl]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        aria-controls="language-switcher-menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={languageLabel}
        className="flex min-w-[118px] items-center justify-between gap-3 rounded-[0.65rem] border border-black/10 bg-white/85 px-3 py-3 text-[15px] font-medium text-[var(--color-ink)] shadow-[0_6px_18px_rgba(15,23,42,0.05)] backdrop-blur-sm transition-all hover:border-black/20"
        onClick={() => setIsOpen((open) => !open)}
        ref={buttonRef}
        type="button"
      >
        <span className="text-base leading-none">{localeDetails[currentLocale].label}</span>
        <svg
          aria-hidden="true"
          className="h-4 w-4 text-black/80"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <svg
          aria-hidden="true"
          className={`h-3.5 w-3.5 text-black/55 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path
            d="m2 4 4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {portalTarget && menuPosition
        ? createPortal(
            <div
              className={`fixed z-[100] overflow-hidden rounded-[0.8rem] border border-black/8 bg-white/95 p-1.5 shadow-[0_18px_36px_rgba(15,23,42,0.12)] backdrop-blur-md transition-all ${
                isOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
              id="language-switcher-menu"
              ref={menuRef}
              role="menu"
              style={{
                left: menuPosition.left,
                top: menuPosition.top,
                width: menuPosition.width,
              }}
            >
              {locales.map((locale) => {
                const isActive = locale === currentLocale;

                return (
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-[0.55rem] px-3 py-3 text-[15px] transition-colors ${
                      isActive
                        ? "bg-[#36f] font-semibold text-white"
                        : "text-[var(--color-ink)] hover:bg-black/5"
                    }`}
                    href={`/${locale}${pathSuffix}`}
                    key={locale}
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                  >
                    <span>{localeDetails[locale].label}</span>
                    {!isActive ? (
                      <span className="text-xs text-black/35">{locale}</span>
                    ) : (
                      <span className="text-xs text-white/80">{currentLabel}</span>
                    )}
                  </Link>
                );
              })}
            </div>,
            portalTarget,
          )
        : null}
    </div>
  );
}
