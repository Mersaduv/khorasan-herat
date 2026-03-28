"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCounterProps = Readonly<{
  value: number;
  locale: string;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
}>;

export function AnimatedCounter({
  value,
  locale,
  durationMs = 1400,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!counterRef.current || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextValue = Math.round(value * eased);

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [durationMs, hasStarted, value]);

  const formatter = useMemo(
    () => new Intl.NumberFormat(locale === "fa" ? "fa-AF" : locale),
    [locale],
  );

  return (
    <span ref={counterRef}>
      {prefix}
      {formatter.format(displayValue)}
      {suffix}
    </span>
  );
}
