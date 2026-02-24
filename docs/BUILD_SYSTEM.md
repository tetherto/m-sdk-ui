# Build System Overview

## Stack

- **Monorepo Tool**: Turborepo 2.8.2
- **Package Manager**: pnpm 10.5.0
- **Build Tools**:
  - TypeScript Compiler (tsc) for `.ts/.tsx` files
  - Vite 6.4.1 for SCSS compilation
  - Rollup (via Vite) for bundling

## Why Turborepo?

✅ **Already in use** - No new tools to learn  
✅ **Intelligent caching** - Builds are cached and reused  
✅ **Parallel execution** - Independent tasks run simultaneously  
✅ **Dependency graph** - Automatically builds in correct order  
✅ **Simple configuration** - Just `turbo.json`  

### vs Alternatives

| Tool | Pros | Cons | Our Choice |
|------|------|------|------------|
| **Turborepo** | Simple, fast, great DX | Fewer features than Nx | ✅ **Current** |
| Nx | More features, plugins | Complex, steeper learning curve | ❌ Overkill |
| Bazel | Enterprise-grade | Very complex, high maintenance | ❌ Too complex |
| Lerna | Mature | Slower, less features | ❌ Outdated |
| Rush | Powerful | Complex setup | ❌ Unnecessary |

## Build Pipeline

```
┌─────────────────────────────────────┐
│ pnpm build                          │
│ (triggers Turborepo)                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Turborepo                           │
│ - Reads turbo.json                  │
│ - Analyzes dependency graph         │
│ - Determines build order            │
│ - Checks cache                      │
└──────────────┬──────────────────────┘
               │
               ├─────────────────────────────────┐
               │                                 │
               ▼                                 ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│ TypeScript Build (tsc)   │    │ SCSS Build (Vite)        │
│ - Compiles .ts/.tsx      │    │ - Compiles .scss         │
│ - Generates .d.ts        │    │ - Resolves @mining-sdk/*        │
│ - Type checking          │    │ - Minifies CSS           │
│ - Output: dist/          │    │ - Output: src/styles.css │
└──────────────────────────┘    └──────────────────────────┘
```

## Configuration Files

### Root: `turbo.json`

Defines tasks and their dependencies:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "src/styles.css"]
    },
    "build:ts": {
      "dependsOn": ["^build:ts"],
      "outputs": ["dist/**"]
    },
    "build:scss": {
      "dependsOn": ["^build:scss"],
      "outputs": ["src/styles.css"]
    }
  }
}
```

### Per-Package: `package.json`

```json
{
  "scripts": {
    "build": "pnpm build:ts && pnpm build:scss",
    "build:ts": "tsc",
    "build:scss": "vite build"
  }
}
```

### Per-Package: `vite.config.js` (for SCSS packages)

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/styles.scss',
      formats: ['es'],
    },
    outDir: 'src',
    cssCodeSplit: false,
  },
})
```

## Build Commands

### Full Build

```bash
# Build all packages
pnpm build

# Turborepo will:
# 1. Build @mining-sdk/core first (no dependencies, exports built JS)
# 2. Build @mining-sdk/fonts in parallel (independent)
# 3. Build @mining-sdk/foundation (depends on core, exports TS source)
# 4. Build @mining-sdk/demo app (depends on all packages)
```

### Selective Build

```bash
# Build specific package
pnpm --filter @mining-sdk/core build

# Build package with dependencies
pnpm --filter @mining-sdk/foundation... build

# Build package with dependents
pnpm --filter ...@mining-sdk/core build
```

### Incremental Build

```bash
# First build (cold)
pnpm build
# → Takes ~5s

# Second build (cached)
pnpm build
# → Takes ~0.1s (everything cached!)

# Change one file in @mining-sdk/core
pnpm build
# → Only rebuilds @mining-sdk/core + packages that depend on it
```

## Caching

### How Turborepo Caching Works

1. **Input Hashing**: Turborepo hashes:
   - Source files
   - Dependencies
   - Environment variables
   - Task configuration

2. **Cache Lookup**: Checks if hash exists in cache

3. **Cache Hit**: Restores outputs from cache (instant!)

4. **Cache Miss**: Runs task and stores outputs

### Cache Location

```
node_modules/.cache/turbo/
└── <hash>/
    ├── dist/          # TypeScript output
    └── src/styles.css # SCSS output
```

### Cache Commands

```bash
# Clear cache
pnpm clean

# Force rebuild (ignore cache)
pnpm build --force

# View cache stats
turbo run build --summarize
```

## Parallel Execution

Turborepo automatically parallelizes independent tasks:

```
Time →

@mining-sdk/core         ████████
@mining-sdk/fonts        ████████ (parallel with core)
@mining-sdk/foundation                ████████
@mining-sdk/demo                           ████████

Total: ~3-4s (vs ~10s sequential)
```

## Dependency Graph

```
@mining-sdk/core (built JS + CSS)
└── @mining-sdk/foundation (TS source + CSS)
    └── @mining-sdk/demo (app)

@mining-sdk/fonts (independent, CSS only)
└── @mining-sdk/demo (app)
```

**Simplified Architecture:**
- **2 main packages** + 1 font package
- **Linear dependency**: core → foundation → demo
- **Fonts are independent** and can build in parallel
- **Foundation exports TypeScript source** (no build needed for workspace deps)
- **Core exports built JavaScript** (requires build step)

Turborepo ensures:
- `@mining-sdk/core` builds before `@mining-sdk/foundation`
- `@mining-sdk/fonts` can build in parallel
- `@mining-sdk/foundation` and `@mining-sdk/fonts` build before `@mining-sdk/demo`

## Performance

### Build Times

| Scenario | Time | Cache |
|----------|------|-------|
| Cold build (first time) | ~5s | ❌ |
| Warm build (no changes) | ~0.1s | ✅ |
| Single package change | ~1s | ⚠️ Partial |
| Dependency change | ~2s | ⚠️ Partial |

### Optimization Tips

1. **Keep packages small** - Smaller packages = faster builds
2. **Minimize dependencies** - Fewer deps = less rebuilding
3. **Use workspace protocol** - `workspace:*` for internal deps
4. **Leverage caching** - Don't use `--force` unless needed

## Troubleshooting

### Build Fails

```bash
# Check which package failed
pnpm build

# Build with verbose output
pnpm build --verbose

# Build specific package to debug
pnpm --filter @mining-sdk/core build
```

### Cache Issues

```bash
# Clear cache and rebuild
pnpm clean
pnpm build

# Force rebuild without cache
pnpm build --force
```

### Dependency Issues

```bash
# Reinstall dependencies
pnpm install

# Check dependency graph
pnpm list --depth=1
```

## Best Practices

### 1. Use Turborepo Commands

```bash
# ✅ Good - Let Turborepo handle it
pnpm build

# ❌ Bad - Manual package-by-package
pnpm --filter @mining-sdk/core build
pnpm --filter @mining-sdk/theme build
# ...
```

### 2. Trust the Cache

```bash
# ✅ Good - Use cache
pnpm build

# ❌ Bad - Always force rebuild
pnpm build --force
```

### 3. Keep turbo.json Simple

```json
// ✅ Good - Simple, clear
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}

// ❌ Bad - Overly complex
{
  "tasks": {
    "build": {
      "dependsOn": ["^build", "lint", "test"],
      "inputs": ["src/**", "!**/*.test.ts"],
      "outputs": ["dist/**"],
      "cache": true,
      "persistent": false
    }
  }
}
```

### 4. Organize Package Scripts

```json
// ✅ Good - Consistent naming
{
  "scripts": {
    "build": "pnpm build:ts && pnpm build:scss",
    "build:ts": "tsc",
    "build:scss": "vite build",
    "dev": "pnpm dev:ts",
    "dev:ts": "tsc --watch"
  }
}
```

## Future Enhancements

- [ ] Remote caching (Turborepo Cloud)
- [ ] Build analytics and metrics
- [ ] Parallel testing with Turborepo
- [ ] Docker layer caching
- [ ] CI/CD optimization
