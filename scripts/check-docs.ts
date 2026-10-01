import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredFiles = ["README.md", "CONTRIBUTING.md", "CHANGELOG.md", "AGENTS.md"];

async function assertNonEmpty(file: string) {
  const content = await readFile(path.join(root, file), "utf8");
  if (!content.trim()) throw new Error(`${file} must not be empty`);
}

await Promise.all(requiredFiles.map(assertNonEmpty));
const docs = await readdir(path.join(root, "docs"));
if (
  !docs.includes("architecture.md") ||
  !docs.includes("deployment.md") ||
  !docs.includes("releasing.md")
) {
  throw new Error("docs must contain architecture.md, deployment.md, and releasing.md");
}
