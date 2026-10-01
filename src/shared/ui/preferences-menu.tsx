"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/shared/i18n/dictionaries";

type ThemeMode = "system" | "light" | "dark";

function applyTheme(mode: ThemeMode) {
  const dark =
    mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export function PreferencesMenu({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Record<string, string>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("system");
  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "system" || saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  function setLocale(next: Locale) {
    document.cookie = `locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
    setOpen(false);
  }
  function setThemeMode(next: ThemeMode) {
    localStorage.setItem("theme-mode", next);
    applyTheme(next);
    setTheme(next);
  }
  return (
    <>
      <button
        aria-expanded={open}
        className="preference-trigger"
        onClick={() => setOpen(true)}
        type="button"
      >
        theme: {theme}
      </button>
      {open && (
        <div aria-label={labels.theme} className="tui-backdrop" role="dialog" aria-modal="true">
          <div className="tui-modal">
            <div className="tui-title">
              <span>preferences</span>
              <button aria-label="Close" onClick={() => setOpen(false)} type="button">
                ×
              </button>
            </div>
            <p>{labels.theme}</p>
            <div className="tui-options">
              {(["system", "light", "dark"] as const).map((mode) => (
                <button
                  className={theme === mode ? "selected" : ""}
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  type="button"
                >
                  [{theme === mode ? "x" : " "}] {labels[mode]}
                </button>
              ))}
            </div>
            <p>{labels.language}</p>
            <div className="tui-options">
              <button
                className={locale === "pt-BR" ? "selected" : ""}
                onClick={() => setLocale("pt-BR")}
                type="button"
              >
                [{locale === "pt-BR" ? "x" : " "}] Português
              </button>
              <button
                className={locale === "en" ? "selected" : ""}
                onClick={() => setLocale("en")}
                type="button"
              >
                [{locale === "en" ? "x" : " "}] English
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
