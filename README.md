# Mining SDK UI Development Kit

> A developer-first toolkit providing pre-built components and seamless backend integration for building mining operations applications in days instead of weeks.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/tetherto/miningos-app-ui/blob/staging/LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Examples](#examples)
- [Support](#support)
- [License](#license)

---

## Overview

The **Mining SDK UI Development Kit** is a comprehensive toolkit providing:

- **150-200+ production-tested components** (foundation + domain-specific)
- **87+ API integration hooks** (RTK Query-based)
- **70+ custom React hooks** for common patterns
- **Complete state management** (Redux Toolkit)
- **Modern tech stack** (React 19, shadcn/ui, React Hook Form, Zod)
- **5x faster forms** compared to legacy solutions

### Key Benefits

- 🚀 **10x faster development** - Build dashboards in days, not weeks
- 🎨 **Consistent UX** - Uniform design patterns across all applications
- 🔌 **Seamless integration** - Type-safe API client with intelligent caching
- 🎯 **Battle-tested** - Extracted from production Mining OS codebase
- 📦 **Zero CSS-in-JS runtime** - Better performance, smaller bundles

---

## Getting Started

### Prerequisites

- **Node.js** 20+ (LTS)
- **pnpm** 9+ (package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/tetherto/miningos-ui-kit.git
cd miningos-ui-kit

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Quick Start

```bash
# Run all packages in dev mode
pnpm dev

# Run specific package
pnpm dev --filter @mining-sdk/core

# Build all packages
pnpm build

# Build with full verbose output
pnpm build:verbose

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Format code
pnpm format

# Run all checks (lint + typecheck + format + build)
pnpm fullcheck
```

### Turbo Output Modes

The project uses Turbo's **stream UI** by default for real-time output. You can also use:

```bash
# Full verbose output (all logs, even from cache)
pnpm build --output-logs=full

# Hash only (minimal output)
pnpm build --output-logs=hash-only

# Errors only
pnpm build --output-logs=errors-only
```

---

## Documentation

- **[Architecture](ARCHITECTURE.md)** - System architecture, package structure, and technology stack
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines, development workflow, and coding standards

---

## Examples

- **Minimal App**: [examples/minimal-app](examples/minimal-app)
- **Dashboard App**: [examples/dashboard-app](examples/dashboard-app)

---

## Support

- **Issues**: [GitHub Issues](https://github.com/tetherto/miningos-ui-kit/issues)

---

## License

Apache 2.0 - See [LICENSE](https://github.com/tetherto/miningos-app-ui/blob/staging/LICENSE) for details.

---

## Acknowledgments

Built with contributions from the mining operations team.
