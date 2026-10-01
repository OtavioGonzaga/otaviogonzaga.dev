# otaviogonzaga.dev

Personal portfolio for Otavio Gonzaga.

## Requirements

- Bun 1.4.2
- Podman (for container smoke tests)

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

Copy `.env.example` to `.env.local` to override the canonical public URL locally.

## Verification

```sh
bun run format:check
bun run lint
bun run typecheck
bun run test:coverage
bun run build
```

See [architecture](docs/architecture.md), [releasing](docs/releasing.md), and [deployment](docs/deployment.md).

## License

This is a public repository, but its source code, content, design, and assets are not licensed for reuse. All rights are reserved.
