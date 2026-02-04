# @mining-sdk/foundation

Complete foundation package with features, state management, API client, hooks, and utilities.

## Installation

```bash
pnpm add @mining-sdk/foundation
```

## Usage

```tsx
import { /* your imports */ } from '@mining-sdk/foundation'

// Or import from specific sub-modules
import { /* hooks */ } from '@mining-sdk/foundation/hooks'
import { /* API client */ } from '@mining-sdk/foundation/api'
import { /* state */ } from '@mining-sdk/foundation/state'
```

## Structure

- `components/domain/` - Mining-specific domain components
- `components/feature/` - Complete feature modules
- `hooks/` - Custom React hooks
- `api/` - API client with RTK Query
- `state/` - State management with Redux Toolkit
- `test-utils/` - Testing utilities and helpers

## Dependencies

This package depends on `@mining-sdk/core` for base components and utilities.
