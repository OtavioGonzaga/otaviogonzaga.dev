export type GitHubRepository = { stargazersCount: number };

export interface GitHubRepositoryPort {
  listPublicRepositories(): Promise<readonly GitHubRepository[] | null>;
}
