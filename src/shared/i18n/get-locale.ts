import { cookies } from "next/headers";

import { isLocale, type Locale } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get("locale")?.value;
  return isLocale(cookieLocale) ? cookieLocale : "pt-BR";
}
