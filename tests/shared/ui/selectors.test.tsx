import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh }) }));

import { dictionaries } from "@/shared/i18n/dictionaries";
import { PreferencesMenu } from "@/shared/ui/preferences-menu";

describe("preference selectors", () => {
  beforeEach(() => {
    localStorage.clear();
    refresh.mockClear();
    document.documentElement.dataset.theme = "light";
  });

  it("opens an isolated language menu, persists its choice and refreshes the server view", () => {
    render(<PreferencesMenu labels={dictionaries["pt-BR"]} locale="pt-BR" preference="language" />);
    fireEvent.click(screen.getByRole("button", { name: "idioma: português" }));
    const dialog = screen.getByRole("dialog", { name: "Idioma" });
    expect(dialog).toBeVisible();
    expect(dialog).not.toHaveTextContent("Tema");
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(document.cookie).toContain("locale=en");
    expect(refresh).toHaveBeenCalledOnce();
  });

  it("persists and applies a selected color theme from its own menu", () => {
    render(<PreferencesMenu labels={dictionaries["pt-BR"]} locale="pt-BR" preference="theme" />);
    fireEvent.click(screen.getByRole("button", { name: /tema: sistema/ }));
    const dialog = screen.getByRole("dialog", { name: "Tema" });
    expect(dialog).toBeVisible();
    expect(dialog).not.toHaveTextContent("Idioma");
    fireEvent.click(screen.getByRole("button", { name: "Escuro" }));
    expect(localStorage.getItem("theme-mode")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
