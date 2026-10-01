import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh }) }));

import { LanguageSelector } from "@/shared/ui/language-selector";
import { ThemeSelector } from "@/shared/ui/theme-selector";

describe("preference selectors", () => {
  beforeEach(() => {
    localStorage.clear();
    refresh.mockClear();
    document.documentElement.dataset.theme = "light";
  });

  it("persists language in a cookie and refreshes the server view", () => {
    render(<LanguageSelector label="Idioma" locale="pt-BR" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Idioma" }), { target: { value: "en" } });
    expect(document.cookie).toContain("locale=en");
    expect(refresh).toHaveBeenCalledOnce();
  });

  it("persists and applies a selected color theme", () => {
    render(
      <ThemeSelector
        label="Tema"
        options={{ system: "Sistema", light: "Claro", dark: "Escuro" }}
      />,
    );
    fireEvent.change(screen.getByRole("combobox", { name: "Tema" }), { target: { value: "dark" } });
    expect(localStorage.getItem("theme-mode")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
