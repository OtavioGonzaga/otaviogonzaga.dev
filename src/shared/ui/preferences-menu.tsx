"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/shared/i18n/dictionaries";
import type { Dictionary } from "@/shared/i18n/dictionaries";

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
  preference,
}: {
  locale: Locale;
  labels: Dictionary;
  preference: "theme" | "language";
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
        {preference === "theme" ? `${labels.theme}: ${theme}` : labels.language}
      </button>
      {open && (
        <div
          aria-label={labels[preference]}
          aria-modal="true"
          className="tui-backdrop"
          role="dialog"
        >
          <div className="tui-modal">
            <div className="tui-title">
              <span>{labels.preferences}</span>
              <button aria-label={labels.close} onClick={() => setOpen(false)} type="button">
                ×
              </button>
            </div>
            {preference === "theme" ? (
              <>
                <p>{labels.theme}</p>
                <div className="tui-options">
                  {(["system", "light", "dark"] as const).map((mode) => (
                    <button
                      aria-pressed={theme === mode}
                      className={theme === mode ? "selected" : ""}
                      key={mode}
                      onClick={() => setThemeMode(mode)}
                      type="button"
                    >
                      <span aria-hidden="true">[{theme === mode ? "x" : " "}]</span>
                      <span>{labels[mode]}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>{labels.language}</p>
                <div className="tui-options">
                  {(
                    [
                      ["pt-BR", "Português"],
                      ["en", "English"],
                    ] as const
                  ).map(([nextLocale, name]) => (
                    <button
                      aria-pressed={locale === nextLocale}
                      className={locale === nextLocale ? "selected" : ""}
                      key={nextLocale}
                      onClick={() => setLocale(nextLocale)}
                      type="button"
                    >
                      <span aria-hidden="true">[{locale === nextLocale ? "x" : " "}]</span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
