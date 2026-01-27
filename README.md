# MDK UI Component Library

## Stack

- **pnpm workspaces** - Package management with workspace linking
- **Turborepo** - Build orchestration with caching (fast incremental builds)
- **TypeScript 5.8** - Strict mode enabled
- **ESLint (antfu config)** - Linting + formatting in one (no Prettier needed)
- **Husky + lint-staged** - Auto-fixes code on commit

**Style:** double quotes, semicolons, 2-space indent

## Getting Started

```bash
pnpm install
```

## Commands

```bash
pnpm dev        # Run all packages in dev mode
pnpm build      # Build all packages
pnpm lint       # Check for issues
pnpm lint:fix   # Auto-fix issues
pnpm typecheck  # Type check
pnpm check      # Lint + typecheck
```

## Structure

```
apps/       # Applications (cli, docs site, playground, etc.)
packages/   # Shared packages (@mdk-ui/components, @mdk-ui/utils, etc.)
```

## How Packages Work

Each package in `packages/` or `apps/` is independent with its own `package.json`. Example:

```
packages/components/
├── src/
├── package.json      # name: "@mdk-ui/components"
├── tsconfig.json     # extends root config
└── eslint.config.mjs # package-specific config (optional)
```

Cross-package imports just work:

```ts
import { Button } from "@mdk-ui/components";
```

pnpm links workspace packages automatically - no need to publish.

## Extending Configs Per Package

### TypeScript

Extend root config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

### ESLint

Create package-specific config with React rules:

```js
import antfu from "@antfu/eslint-config";

export default antfu({
  react: true,
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
});
```

## Adding Dependencies to a Package

Using filter from root:

```bash
pnpm add react --filter @mdk-ui/components
pnpm add -D vitest --filter @mdk-ui/components
```

Or cd into the package directory:

```bash
cd packages/components
pnpm add react
pnpm add -D vitest
```

## CI

CI runs on every PR: lint → typecheck → build
