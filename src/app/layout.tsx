import type { Metadata } from "next";

import { SkipLink } from "@/shared/ui/skip-link";
import { defaultMetadata } from "@/shared/seo/metadata";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
