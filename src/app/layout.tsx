import type { Metadata } from "next";

import { SkipLink } from "@/shared/ui/skip-link";
import { getLocale } from "@/shared/i18n/get-locale";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { defaultMetadata } from "@/shared/seo/metadata";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

const themeBootstrap = `try { const mode = localStorage.getItem("theme-mode"); const valid = ["system", "light", "dark"].includes(mode); const selected = valid ? mode : "system"; const dark = selected === "dark" || (selected === "system" && matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.dataset.themeMode = selected; document.documentElement.dataset.theme = dark ? "dark" : "light"; } catch { document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const copy = dictionaries[locale];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <SkipLink label={copy.skipToContent} />
        {children}
      </body>
    </html>
  );
}
