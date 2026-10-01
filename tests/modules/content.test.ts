import { describe, expect, it } from "vitest";

import { practiceAreas } from "@/modules/profile/content/areas";
import { projects } from "@/modules/projects/content/projects";

describe("portfolio content", () => {
  it("keeps project slugs unique and translations available", () => {
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.description["pt-BR"]).toBeTruthy();
      expect(project.description.en).toBeTruthy();
    }
  });

  it("keeps practice-area translations available", () => {
    expect(practiceAreas).toHaveLength(3);
    for (const area of practiceAreas) {
      expect(area.title["pt-BR"]).toBeTruthy();
      expect(area.title.en).toBeTruthy();
    }
  });
});
