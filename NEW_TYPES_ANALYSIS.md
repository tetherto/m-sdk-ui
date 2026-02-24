# New Types Analysis - Potential Extractions

## 🔍 Analysis Date
**After merging `develop` into `feature/bundle-size`**

---

## ✅ Types That Should Be Extracted

### 1. **Position/Side Types** (HIGH PRIORITY)

**Current Usage:**
- `Tooltip`: `side?: 'top' | 'right' | 'bottom' | 'left'`
- `Popover`: `side?: 'top' | 'right' | 'bottom' | 'left'`
- `BarChart`: `legendPosition?: 'top' | 'bottom' | 'left' | 'right'`
- `DoughnutChart`: `legendPosition?: DoughnutLegendPosition` (already extracted locally)

**Recommendation:** ✅ Extract as `Position` or `Side`

```tsx
// packages/core/src/types/common.ts
/**
 * Position/side options for UI elements
 * Used by Tooltip, Popover, and chart legends
 */
export type Position = 'top' | 'right' | 'bottom' | 'left'
```

**Impact:** 4 components would benefit

---

### 2. **Alignment Types** (MEDIUM PRIORITY)

**Current Usage:**
- `Typography`: `align?: 'left' | 'center' | 'right' | 'justify'`
- `Popover`: `align?: 'start' | 'center' | 'end'`
- `BarChart`: `legendAlign?: 'start' | 'center' | 'end'`

**Recommendation:** ✅ Extract two types

```tsx
// packages/core/src/types/common.ts
/**
 * Text alignment options
 * Used by Typography component
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify'

/**
 * Flex/Grid alignment options
 * Used by Popover, charts, and layout components
 */
export type FlexAlign = 'start' | 'center' | 'end'
```

**Impact:** 3 components would benefit

---

## ⚠️ Types That Are Component-Specific (NO EXTRACTION NEEDED)

### 1. **Spinner Color** ✓ Already handled
- `color?: 'primary' | 'secondary'`
- **Status:** This is specific to Spinner and already available via `SpinnerProps['color']`
- **Action:** No change needed (we already use this pattern in foundation package)

### 2. **Spinner Speed** ✓ Component-specific
- `speed?: 'slow' | 'normal' | 'fast'`
- **Status:** Only used in Spinner component (1 location)
- **Action:** Keep as component-specific type

### 3. **Spinner Type** ✓ Component-specific
- `type?: 'circle' | 'square'`
- **Status:** Only used in Spinner component (1 location)
- **Action:** Keep as component-specific type

### 4. **ErrorCardVariant** ✓ Component-specific
- `type ErrorCardVariant = 'card' | 'inline'`
- **Status:** Only used in ErrorCard component (1 location)
- **Action:** Keep as component-specific type

### 5. **TabsVariant** ✓ Component-specific
- `type TabsVariant = 'default' | 'side'`
- **Status:** Only used in Tabs component (1 location)
- **Action:** Keep as component-specific type (not exported)

### 6. **ButtonAntdSize** ✓ Internal mapping type
- `export type ButtonAntdSize = 'small' | 'middle' | 'large'`
- **Status:** Internal compatibility layer for Ant Design migration
- **Action:** Keep as is (needed for legacy support)

### 7. **DoughnutLegendPosition** ⚠️ Already extracted locally
- `export type DoughnutLegendPosition = 'top' | 'bottom' | 'left' | 'right'`
- **Status:** Currently exported from doughnut-chart component
- **Action:** Should use the new `Position` type instead

---

## 📊 Summary

| Type | Priority | Status | Action Required |
|------|----------|--------|-----------------|
| `Position` (top/right/bottom/left) | ✅ High | Should extract | New shared type |
| `TextAlign` (left/center/right/justify) | ⚠️ Medium | Should extract | New shared type |
| `FlexAlign` (start/center/end) | ⚠️ Medium | Should extract | New shared type |
| Spinner-specific types | ℹ️ Low | Keep as-is | No change |
| Component variants | ℹ️ Low | Keep as-is | No change |
| `DoughnutLegendPosition` | 🔄 Update | Should refactor | Use `Position` |

---

## 💡 Recommended Implementation Plan

### Phase 1: Add New Shared Types

Add to `packages/core/src/types/common.ts`:

```tsx
/**
 * Position/side options for UI elements
 * Used by Tooltip, Popover, and chart legends
 */
export type Position = 'top' | 'right' | 'bottom' | 'left'

/**
 * Text alignment options
 * Used by Typography component
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify'

/**
 * Flex/Grid alignment options
 * Used by Popover, charts, and layout components
 */
export type FlexAlign = 'start' | 'center' | 'end'
```

### Phase 2: Update Component Imports

**Tooltip:**
```tsx
import type { Position } from '../../types'

export type TooltipProps = {
  side?: Position  // was: 'top' | 'right' | 'bottom' | 'left'
  // ...
}
```

**Popover:**
```tsx
import type { Position, FlexAlign } from '../../types'

export type PopoverProps = {
  side?: Position  // was: 'top' | 'right' | 'bottom' | 'left'
  align?: FlexAlign  // was: 'start' | 'center' | 'end'
  // ...
}
```

**BarChart:**
```tsx
import type { Position, FlexAlign } from '../../types'

export type BarChartProps = {
  legendPosition?: Position  // was: 'top' | 'bottom' | 'left' | 'right'
  legendAlign?: FlexAlign  // was: 'start' | 'center' | 'end'
  // ...
}
```

**DoughnutChart:**
```tsx
import type { Position } from '../../types'

// Remove: export type DoughnutLegendPosition = 'top' | 'bottom' | 'left' | 'right'

export type DoughnutChartProps = {
  legendPosition?: Position  // was: DoughnutLegendPosition
  // ...
}
```

**Typography:**
```tsx
import type { TextAlign } from '../../types'

export type TypographyProps = {
  align?: TextAlign  // was: 'left' | 'center' | 'right' | 'justify'
  // ...
}
```

---

## ✅ Benefits of These Extractions

1. **Type Consistency**: All components use the same position/alignment types
2. **Better Type Inference**: TypeScript can infer types across components
3. **Easier Refactoring**: Change once, update everywhere
4. **Documentation**: Centralized JSDoc comments
5. **Reduced Duplication**: 5 fewer duplicate type definitions

---

## 🎯 Impact Analysis

### Components That Will Benefit:
- ✅ Tooltip
- ✅ Popover  
- ✅ BarChart
- ✅ DoughnutChart
- ✅ Typography

### Breaking Changes:
- ⚠️ `DoughnutLegendPosition` will be deprecated (use `Position` instead)
- ✅ All other changes are non-breaking (same values, just centralized)

### Migration Effort:
- **Low**: Simple find-replace across 5 files
- **Time**: ~10 minutes
- **Risk**: Very low (same string literals, just typed)

---

## 🚀 Next Steps

Would you like me to:

1. ✅ **Implement these extractions** (recommended)
2. ⏸️ **Wait for more feedback**
3. 📋 **Create a separate PR** for these type improvements

Let me know and I'll proceed accordingly!
