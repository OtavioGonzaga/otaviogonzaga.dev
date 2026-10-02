import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    exclude: ["tests/e2e/**", "node_modules/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      include: [
        "src/modules/**/*.ts",
        "src/shared/config/**/*.ts",
        "src/shared/i18n/**/*.ts",
        "src/shared/seo/**/*.ts",
        "src/shared/ui/preferences-menu.tsx",
      ],
      exclude: ["src/modules/**/ports/**/*.ts"],
      thresholds: { lines: 80, statements: 80, functions: 80, branches: 75 },
    },
  },
});
