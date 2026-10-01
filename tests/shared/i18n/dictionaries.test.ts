import { dictionaries, isLocale } from "@/shared/i18n/dictionaries";
import { describe, expect, it } from "vitest";

describe("locale dictionaries", () => {
  it("keeps the same typed translation keys in Portuguese and English", () => {
    expect(Object.keys(dictionaries["pt-BR"]).sort()).toEqual(Object.keys(dictionaries.en).sort());
  });

  it("accepts only supported locales", () => {
    expect(isLocale("pt-BR")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
