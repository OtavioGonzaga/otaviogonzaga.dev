import { spawnSync } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

const root = process.cwd();
const script = path.join(root, "scripts/deploy-podman.sh");
const temporaryDirectories: string[] = [];

async function runDeploy(options: {
  candidateHealthy?: boolean;
  hasOldContainer?: boolean;
  port?: string;
  promoteHealthy?: boolean;
  runCandidateFails?: boolean;
}) {
  const directory = await mkdtemp(path.join(tmpdir(), "deploy-podman-test-"));
  temporaryDirectories.push(directory);
  const bin = path.join(directory, "bin");
  await mkdir(bin);
  await writeFile(path.join(directory, "runtime.env"), `PORT=${options.port ?? "3000"}\n`);
  await writeFile(
    path.join(bin, "podman"),
    `#!/bin/sh
echo "$*" >> "$PODMAN_LOG"
if [ "$1" = container ] && [ "$2" = exists ]; then [ "${options.hasOldContainer ? "1" : ""}" = 1 ]; exit; fi
if [ "$1" = inspect ]; then echo old-image; exit 0; fi
if [ "$1" = run ]; then
  case " $* " in
    *' --name app-production-candidate '*) [ "${options.runCandidateFails ? "1" : ""}" = 1 ] && exit 1 ;;
  esac
  exit 0
fi
if [ "$1" = exec ]; then
  case "$2" in
    app-production-candidate) [ "${options.candidateHealthy ? "1" : ""}" = 1 ] && exit 0 || exit 1 ;;
    app-production) [ "${options.promoteHealthy ? "1" : ""}" = 1 ] && exit 0 || exit 1 ;;
  esac
fi
exit 0
`,
  );
  await chmod(path.join(bin, "podman"), 0o755);
  const log = path.join(directory, "podman.log");
  await writeFile(log, "");
  const result = spawnSync(
    "sh",
    [script, "production", "app", "new-image", path.join(directory, "runtime.env"), "--locked"],
    {
      cwd: directory,
      env: {
        ...process.env,
        DEPLOY_HEALTH_ATTEMPTS: "1",
        DEPLOY_HEALTH_INTERVAL: "0",
        PATH: `${bin}:${process.env.PATH}`,
        PODMAN_LOG: log,
      },
    },
  );
  return { exitCode: result.status, log: await readFile(log, "utf8") };
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

describe("deploy-podman", () => {
  it("rejects an invalid port before changing containers", async () => {
    const result = await runDeploy({ port: "not-a-port" });
    expect(result.exitCode).toBe(64);
    expect(result.log).toBe("");
  });

  it("promotes a healthy candidate and preserves the previous image", async () => {
    const result = await runDeploy({
      candidateHealthy: true,
      hasOldContainer: true,
      promoteHealthy: true,
    });
    expect(result.exitCode).toBe(0);
    expect(result.log).toContain("tag old-image app-production:previous");
    expect(result.log).toContain("run -d --name app-production-candidate");
    expect(result.log).toContain("run -d --name app-production --restart");
  });

  it("keeps the current service when the candidate cannot start", async () => {
    const result = await runDeploy({ hasOldContainer: true, runCandidateFails: true });
    expect(result.exitCode).toBe(1);
    expect(result.log).not.toContain("rm -f app-production ");
  });

  it("restores the previous image when the promoted container is unhealthy", async () => {
    const result = await runDeploy({
      candidateHealthy: true,
      hasOldContainer: true,
      promoteHealthy: false,
    });
    expect(result.exitCode).toBe(1);
    expect(result.log).toContain(
      "run -d --name app-production --restart unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,nodev --env-file",
    );
    expect(result.log).toContain("app-production:previous");
  });
});
