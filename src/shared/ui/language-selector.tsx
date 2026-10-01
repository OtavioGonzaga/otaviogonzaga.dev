"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "@/shared/i18n/dictionaries";

export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    document.cookie = `locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <label className="control">
      <span>{label}</span>
      <select
        aria-label={label}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        value={locale}
      >
        <option value="pt-BR">Português</option>
        <option value="en">English</option>
      </select>
    </label>
  );
}
