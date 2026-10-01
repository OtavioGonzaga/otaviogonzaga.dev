# Architecture

The application is organized by feature module, not by global technical layer. Server Components are the default rendering model. `profile` and `projects` will own versioned content and UI when implemented; GitHub will own its external adapter and port only when live enrichment is added.

The current foundation intentionally contains no database, CMS, authentication, blog, administration area, generic repository, event bus, or use-case framework. Semantic Gruvbox tokens isolate components from raw palette values.
