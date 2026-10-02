import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import { SkipLink } from "@/shared/ui/skip-link";
import { getLocale } from "@/shared/i18n/get-locale";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { defaultMetadata } from "@/shared/seo/metadata";

import "./globals.css";

const inter = Inter({ display: "swap", subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "700"],
});

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
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} bg-background text-foreground font-sans`}
      >
        <SkipLink label={copy.skipToContent} />
        {children}
      </body>
    </html>
  );
}
