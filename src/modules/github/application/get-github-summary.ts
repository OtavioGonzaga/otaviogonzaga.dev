import { cache } from "react";
import { GitHubApiRepository } from "@/modules/github/adapters/github-api-repository";
import type { GitHubRepositoryPort } from "@/modules/github/ports/github-repository";

export type GitHubSummary = { repositoryCount: number; stars: number };

const githubRepository = new GitHubApiRepository();

export async function getGitHubSummaryFrom(
  repository: GitHubRepositoryPort,
): Promise<GitHubSummary | null> {
  const repositories = await repository.listPublicRepositories();
  if (!repositories) return null;
  return {
    repositoryCount: repositories.length,
    stars: repositories.reduce((total, repository) => total + repository.stargazersCount, 0),
  };
}

export const getGitHubSummary = cache(() => getGitHubSummaryFrom(githubRepository));
