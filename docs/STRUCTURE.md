# Mining SDK Dev Kit - Project Structure

Complete monorepo structure with all packages and their relationships.

## 📁 Directory Structure

```
@mining-sdk/ui-dev-kit/
├── packages/
│   ├── core/                    # Core utilities, types, and Radix UI primitives
│   ├── components-foundation/   # Generic, reusable UI components
│   ├── components-domain/       # Mining-specific components
│   ├── components-feature/      # Full-feature components
│   ├── hooks/                   # Custom React hooks
│   ├── api-client/              # API integration (RTK Query)
│   ├── state/                   # State management (Redux)
│   ├── theme/                   # Theming system
│   └── test-utils/              # Testing utilities
├── apps/
│   └── demo/                    # Interactive demo app
├── docs/
│   └── guides/                  # Documentation
└── examples/
    ├── dashboard-app/           # Full dashboard example
    └── minimal-app/             # Minimal setup example
```

## 📦 Package Details

### `@mining-sdk/core`

**Purpose:** Foundation package with utilities, types, and Radix UI primitives

**Location:** `packages/core`

**Exports:**
- Core types (Status, Pagination, ApiResponse, etc.)
- Utility functions (cn, formatNumber, formatDate, validation)
- Radix UI components (Button, Dialog, Switch, etc.)

**Dependencies:** Radix UI primitives, clsx, class-variance-authority

**Usage:**
```tsx
import { Button, cn, formatDate } from '@mining-sdk/core'
```

---

### `@mining-sdk/components-foundation`

**Purpose:** Generic, reusable UI components built on core primitives

**Location:** `packages/core-foundation`

**Exports:**
- All components from `@mining-sdk/core`
- Additional foundation components (Card, Table, Form, Badge, Alert)

**Dependencies:** `@mining-sdk/core`, Radix UI

**Usage:**
```tsx
import { Card, Table, Badge } from '@mining-sdk/components-foundation'
```

---

### `@mining-sdk/components-domain`

**Purpose:** Mining-specific business components

**Location:** `packages/components-domain`

**Exports:**
- MinerCard
- PoolStats
- HashrateChart
- WorkerStatus
- TemperatureMonitor

**Dependencies:** `@mining-sdk/components-foundation`, `@mining-sdk/core`

**Usage:**
```tsx
import { MinerCard, PoolStats } from '@mining-sdk/components-domain'
```

---

### `@mining-sdk/components-feature`

**Purpose:** Complete features combining multiple components

**Location:** `packages/components-feature`

**Exports:**
- Dashboard
- MinerManagement
- PoolManagement
- Settings
- Analytics

**Dependencies:** `@mining-sdk/components-domain`, `@mining-sdk/components-foundation`, `@mining-sdk/hooks`

**Usage:**
```tsx
import { Dashboard, MinerManagement } from '@mining-sdk/components-feature'
```

---

### `@mining-sdk/hooks`

**Purpose:** Custom React hooks for common patterns

**Location:** `packages/hooks`

**Exports:**
- useLocalStorage
- useMediaQuery
- useDebounce
- useThrottle
- useInterval
- useOnline
- useWindowSize

**Dependencies:** `@mining-sdk/core`, React

**Usage:**
```tsx
import { useLocalStorage, useMediaQuery } from '@mining-sdk/hooks'
```

---

### `@mining-sdk/api-client`

**Purpose:** Type-safe API client with RTK Query

**Location:** `packages/api-client`

**Exports:**
- useGetMinersQuery
- useGetPoolsQuery
- useCreateMinerMutation
- API client configuration

**Dependencies:** `@mining-sdk/core`, RTK Query, Redux

**Usage:**
```tsx
import { useGetMinersQuery } from '@mining-sdk/api-client'
```

---

### `@mining-sdk/state`

**Purpose:** Redux store and state management

**Location:** `packages/state`

**Exports:**
- store
- useAppSelector
- useAppDispatch
- Auth slice
- UI slice
- Settings slice

**Dependencies:** `@mining-sdk/api-client`, `@mining-sdk/core`, Redux Toolkit

**Usage:**
```tsx
import { store, useAppSelector } from '@mining-sdk/state'
```

---

### `@mining-sdk/theme`

**Purpose:** Theming system with design tokens

**Location:** `packages/theme`

**Exports:**
- Design tokens (colors, spacing, typography)
- Theme utilities (applyTheme, getSystemTheme)
- CSS variables

**Dependencies:** `@mining-sdk/core`

**Usage:**
```tsx
import { applyTheme, colors } from '@mining-sdk/theme'
import '@mining-sdk/theme/styles.css'
```

---

### `@mining-sdk/test-utils`

**Purpose:** Testing utilities and helpers

**Location:** `packages/test-utils`

**Exports:**
- render (with providers)
- renderWithProviders
- Mock data generators
- Custom matchers

**Dependencies:** `@mining-sdk/core`, `@mining-sdk/state`, Testing Library, Vitest

**Usage:**
```tsx
import { render, mockMiner } from '@mining-sdk/test-utils'
```

---

## 🔗 Dependency Graph

```
┌─────────────────────────────────────┐
│ @mining-sdk/core                           │
│ (types, utils, Radix primitives)   │
└──────────────┬──────────────────────┘
               │
               ├──────────────────────────────────────┐
               │                                      │
┌──────────────▼──────────────────────┐  ┌───────────▼──────────┐
│ @mining-sdk/components-foundation          │  │ @mining-sdk/hooks           │
│ (Card, Table, Form, Badge)          │  │ (useLocalStorage)    │
└──────────────┬──────────────────────┘  └──────────────────────┘
               │
┌──────────────▼──────────────────────┐  ┌──────────────────────┐
│ @mining-sdk/components-domain              │  │ @mining-sdk/theme           │
│ (MinerCard, PoolStats)              │  │ (design tokens)      │
└──────────────┬──────────────────────┘  └──────────────────────┘
               │
┌──────────────▼──────────────────────┐  ┌──────────────────────┐
│ @mining-sdk/components-feature             │  │ @mining-sdk/api-client      │
│ (Dashboard, MinerManagement)        │  │ (RTK Query)          │
└─────────────────────────────────────┘  └───────────┬──────────┘
                                                      │
                                         ┌────────────▼──────────┐
                                         │ @mining-sdk/state            │
                                         │ (Redux store)         │
                                         └───────────────────────┘

                    ┌──────────────────────┐
                    │ @mining-sdk/test-utils      │
                    │ (testing helpers)    │
                    └──────────────────────┘
```

## 🚀 Getting Started

### Install Dependencies

```bash
# Enable pnpm (recommended)
corepack enable

# Install all packages
pnpm install
```

### Build All Packages

```bash
pnpm build
```

### Run Demo App

```bash
pnpm --filter @mining-sdk/demo dev
```

### Type Check

```bash
pnpm typecheck
```

### Lint

```bash
pnpm lint
pnpm lint:fix
```

## 📝 Adding a New Package

1. Create package directory:
```bash
mkdir -p packages/my-package/src
```

2. Create `package.json`:
```json
{
  "name": "@mining-sdk/my-package",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "clean": "rimraf dist node_modules .turbo"
  },
  "dependencies": {
    "@mining-sdk/core": "workspace:*"
  }
}
```

3. Create `tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "declarationDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

4. Create `src/index.ts`:
```ts
export * from './my-feature'
```

5. Install dependencies:
```bash
pnpm install
```

## 🎯 Best Practices

### Package Dependencies

- **Always use `workspace:*`** for internal packages
- **Use peer dependencies** for React, Redux, etc.
- **Keep dependencies minimal** - only add what's needed

### Exports

- **Export from index.ts** - single entry point
- **Use named exports** - avoid default exports
- **Group related exports** - organize by feature

### TypeScript

- **Extend base config** - use `tsconfig.base.json`
- **Enable strict mode** - catch errors early
- **Export types** - make them available to consumers

### Testing

- **Use `@mining-sdk/test-utils`** - consistent testing setup
- **Test in isolation** - don't rely on other packages
- **Mock external dependencies** - use MSW for API calls

## 📚 Documentation

- [Architecture](ARCHITECTURE.md) - System architecture and design decisions
- [Contributing](CONTRIBUTING.md) - How to contribute to the project
- [README](README.md) - Project overview and quick start

## 🔧 Troubleshooting

### Build Errors

```bash
# Clean all packages
pnpm clean

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

### Type Errors

```bash
# Check specific package
pnpm --filter @mining-sdk/core typecheck

# Check all packages
pnpm typecheck
```

### Lint Errors

```bash
# Auto-fix
pnpm lint:fix

# Check specific package
pnpm --filter @mining-sdk/core lint
```
