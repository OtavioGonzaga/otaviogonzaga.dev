import { cache } from "react";

type GitHubRepository = { name: string; stargazers_count: number; html_url: string };

export type GitHubSummary = { repositoryCount: number; stars: number };

const githubApiUrl = "https://api.github.com/users/OtavioGonzaga/repos?per_page=100";

export const getGitHubSummary = cache(async (): Promise<GitHubSummary | null> => {
  try {
    const response = await fetch(githubApiUrl, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 21_600 },
    });
    if (!response.ok) return null;

    const repositories = (await response.json()) as GitHubRepository[];
    return {
      repositoryCount: repositories.length,
      stars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0),
    };
  } catch {
    return null;
  }
});
