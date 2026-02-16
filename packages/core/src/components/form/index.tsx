import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { Controller, FormProvider, useFormContext } from 'react-hook-form'
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormGetFieldState,
  UseFormReturn,
} from 'react-hook-form'

import { Label } from '../label'
import { cn } from '../../utils'

// ─── Contexts ────────────────────────────────────────────────────────────────

type FormFieldContextValue = {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

// ─── useFormField ────────────────────────────────────────────────────────────

/**
 * Hook to access the current form field's state and generated IDs.
 * Must be used inside a `<FormField>` and `<FormItem>`.
 */
type UseFormFieldReturn = ReturnType<UseFormGetFieldState<FieldValues>> & {
  id: string
  name: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
}

const useFormField = (): UseFormFieldReturn => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error('useFormField must be used within a <FormField>')
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const id = itemContext?.id ?? ''

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// ─── Form ────────────────────────────────────────────────────────────────────

/**
 * Form wrapper that provides react-hook-form context to child components.
 *
 * @example
 * ```tsx
 * const form = useForm({ resolver: zodResolver(schema) })
 *
 * <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
 *   <FormField control={form.control} name="email" render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl><Input {...field} /></FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )} />
 * </Form>
 * ```
 */
type FormProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<'form'>,
  'children'
> & {
  form: UseFormReturn<TFieldValues>
  children: React.ReactNode
}

function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  children,
  className,
  ...props
}: FormProps<TFieldValues>): React.JSX.Element {
  return (
    <FormProvider {...form}>
      <form className={cn('mining-sdk-form', className)} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

// ─── FormField ───────────────────────────────────────────────────────────────

/**
 * Wraps react-hook-form's Controller and provides field context to descendants.
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// ─── FormItem ────────────────────────────────────────────────────────────────

/**
 * Layout wrapper for a form field. Generates a unique ID for accessibility linking.
 */
const FormItem = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('mining-sdk-form-item', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)

FormItem.displayName = 'FormItem'

// ─── FormLabel ───────────────────────────────────────────────────────────────

/**
 * Label that auto-links to the form field input via generated IDs.
 * Applies error styling when the field has a validation error.
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn('mining-sdk-form-label', error && 'mining-sdk-form-label--error', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})

FormLabel.displayName = 'FormLabel'

// ─── FormControl ─────────────────────────────────────────────────────────────

/**
 * Slot-based wrapper that injects ARIA attributes onto its child input element
 * without adding an extra DOM wrapper.
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})

FormControl.displayName = 'FormControl'

// ─── FormDescription ─────────────────────────────────────────────────────────

/**
 * Optional helper text displayed below the input.
 */
const FormDescription = React.forwardRef<HTMLParagraphElement, React.ComponentProps<'p'>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn('mining-sdk-form-description', className)}
        {...props}
      />
    )
  },
)

FormDescription.displayName = 'FormDescription'

// ─── FormMessage ─────────────────────────────────────────────────────────────

/**
 * Displays the validation error message from react-hook-form field state.
 * Falls back to children if no error is present.
 */
const FormMessage = React.forwardRef<HTMLParagraphElement, React.ComponentProps<'p'>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error.message) : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn('mining-sdk-form-message', className)}
        role="alert"
        {...props}
      >
        {body}
      </p>
    )
  },
)

FormMessage.displayName = 'FormMessage'

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
