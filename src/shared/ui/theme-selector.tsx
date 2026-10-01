"use client";

import { useEffect, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

function applyTheme(mode: ThemeMode) {
  const dark =
    mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export function ThemeSelector({
  label,
  options,
}: {
  label: string;
  options: Record<ThemeMode, string>;
}) {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "system" || saved === "light" || saved === "dark") setMode(saved);
  }, []);

  function changeTheme(next: ThemeMode) {
    localStorage.setItem("theme-mode", next);
    applyTheme(next);
    setMode(next);
  }

  return (
    <label className="control">
      <span>{label}</span>
      <select
        aria-label={label}
        onChange={(event) => changeTheme(event.target.value as ThemeMode)}
        value={mode}
      >
        <option value="system">{options.system}</option>
        <option value="light">{options.light}</option>
        <option value="dark">{options.dark}</option>
      </select>
    </label>
  );
}
