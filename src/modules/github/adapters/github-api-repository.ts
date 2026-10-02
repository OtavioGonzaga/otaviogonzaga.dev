import type {
  GitHubRepository,
  GitHubRepositoryPort,
} from "@/modules/github/ports/github-repository";

type GitHubApiRepositoryResponse = { stargazers_count: number };

const githubApiUrl = "https://api.github.com/users/OtavioGonzaga/repos?per_page=100";
const githubApiTimeoutMs = 3_000;

export class GitHubApiRepository implements GitHubRepositoryPort {
  async listPublicRepositories(): Promise<readonly GitHubRepository[] | null> {
    try {
      const response = await fetch(githubApiUrl, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 21_600 },
        signal: AbortSignal.timeout(githubApiTimeoutMs),
      });
      if (!response.ok) return null;
      const repositories = (await response.json()) as GitHubApiRepositoryResponse[];
      return repositories.map(({ stargazers_count }) => ({ stargazersCount: stargazers_count }));
    } catch {
      return null;
    }
  }
}
