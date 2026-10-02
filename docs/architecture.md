# Architecture

The application is organized by feature module, not by global technical layer. Server Components are the default rendering model. `profile` and `projects` own versioned source content; `github` owns the external GitHub API adapter, its port, and the application logic that derives the public summary.

The current application intentionally contains no database, CMS, authentication, blog, administration area, generic repository, event bus, or use-case framework. Semantic Gruvbox tokens are exposed to Tailwind and isolate components from raw palette values.
