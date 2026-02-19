# Form Error Handling

This document outlines how errors are handled in the form system to ensure they never break the layout.

## ✅ Layout Protection Features

### 1. **Reserved Space for Errors**
FormMessage now always renders (even when empty) to prevent layout shifts:

```tsx
// FormMessage always renders with min-height
// Shows non-breaking space when empty
<FormMessage /> // Takes up space even with no error
```

**Result:** Form height stays constant whether errors are shown or not.

### 2. **Word Wrapping**
All error messages automatically wrap to prevent horizontal overflow:

```scss
.mining-sdk-form-message {
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
```

**Result:** Long error messages wrap cleanly instead of breaking the layout.

### 3. **Container Constraints**
Form items use proper spacing and constraints:

```scss
.mining-sdk-form-item {
  gap: 0.5rem;
  min-height: fit-content;
}
```

**Result:** Errors appear/disappear without causing layout shifts.

### 4. **Description Text**
Helper text (FormDescription) also wraps properly:

```scss
.mining-sdk-form-description {
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
```

---

## 📋 Error Display Best Practices

### Field-Level Errors (FormMessage)

```tsx
<FormInput
  control={form.control}
  name="email"
  label="Email"
  // Error appears automatically below input
/>
```

**Automatic handling:**
- ✅ Word wrapping enabled
- ✅ Max width constrained to parent
- ✅ ARIA role="alert" for accessibility
- ✅ Consistent spacing

### Form-Level Errors (useFormSubmit)

```tsx
const { error } = useFormSubmit({
  onSubmit: async (data) => {
    await api.submit(data)
  },
})

// Display with proper constraints
{error && (
  <div
    style={{
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      padding: '0.75rem',
      borderRadius: '0.375rem',
    }}
    role="alert"
  >
    {error.message}
  </div>
)}
```

**Key styles:**
- `wordWrap: 'break-word'` - Breaks long words
- `overflowWrap: 'break-word'` - Breaks at word boundaries
- `padding` - Provides breathing room
- `role="alert"` - Screen reader announcement

---

## 🔍 Testing Long Error Messages

Test with various error lengths:

```tsx
// Short error
email: validators.email() // "Please enter a valid email address"

// Medium error  
username: z.string().min(3, 'Username must be at least 3 characters and contain only alphanumeric values')

// Long error (edge case)
custom: z.string().refine(
  (val) => someComplexValidation(val),
  'This is a very long error message that might wrap across multiple lines to test our word wrapping implementation and ensure the layout remains intact without any horizontal scrolling or breaking'
)
```

All error lengths are handled gracefully without layout breaks.

---

## 🎨 Visual Examples

### Before (Potential Issues)
```
❌ Username must be at least 3 characte... [overflow]
❌ [Layout shifts when error appears]
❌ [Horizontal scrollbar]
```

### After (Protected)
```
✅ Username must be at least 3 characters
   and contain only alphanumeric values
✅ [Smooth appearance, no layout shift]
✅ [No horizontal overflow]
```

---

## 📝 Error Message Guidelines

### Good Error Messages
- **Specific:** "Email must be a valid email address"
- **Actionable:** "Password must be at least 8 characters"
- **Clear:** "You must accept the terms to continue"

### Avoid
- **Too vague:** "Invalid input"
- **Too technical:** "Validation failed: regex /^[a-z]+$/ not matched"
- **Too long:** Paragraphs of text (use FormDescription instead)

---

## 🛠️ Custom Error Styling

Override error styles if needed:

```tsx
<FormMessage className="my-custom-error" />
```

```scss
.my-custom-error {
  color: #your-color;
  font-size: 0.875rem;
  // Maintain word wrapping
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

**Always maintain:** `word-wrap` and `overflow-wrap` properties.

---

## ♿ Accessibility

All error handling includes proper accessibility:

1. **role="alert"** - Screen reader announcement
2. **aria-describedby** - Links error to input
3. **aria-invalid** - Marks invalid inputs
4. **Visual indicators** - Color + text (not just color)

---

## 📊 Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Word wrapping | ✅ | Automatic |
| Max width | ✅ | 100% of parent |
| Layout stability | ✅ | No shifts |
| Long messages | ✅ | Multi-line wrap |
| Accessibility | ✅ | ARIA + semantic HTML |
| Custom styling | ✅ | Fully customizable |

**Result:** Bulletproof error handling that never breaks your layout! 🛡️
