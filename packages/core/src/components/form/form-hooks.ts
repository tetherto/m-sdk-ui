import { useState } from 'react'
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

// ─── useFormSubmit ───────────────────────────────────────────────────────────

export type UseFormSubmitOptions<TFieldValues extends FieldValues = FieldValues> = {
  /**
   * Async submit handler that returns a promise
   */
  onSubmit: (data: TFieldValues) => Promise<void> | void

  /**
   * Optional error handler called when submission fails
   */
  onError?: (error: unknown) => void

  /**
   * Optional success handler called after successful submission
   */
  onSuccess?: (data: TFieldValues) => void

  /**
   * Whether to reset the form after successful submission
   * @default false
   */
  resetOnSuccess?: boolean
}

export type UseFormSubmitReturn = {
  /**
   * Whether the form is currently submitting
   */
  isSubmitting: boolean

  /**
   * Error that occurred during submission, if any
   */
  error: Error | null

  /**
   * Whether the submission was successful
   */
  isSuccess: boolean

  /**
   * Submit handler to pass to form.handleSubmit()
   */
  handleSubmit: SubmitHandler<FieldValues>

  /**
   * Reset the submission state (clears error and success flags)
   */
  reset: () => void
}

/**
 * Hook to handle async form submission with loading states, error handling, and success callbacks.
 *
 * @example
 * ```tsx
 * const form = useForm<FormValues>({ resolver: zodResolver(schema) })
 *
 * const { isSubmitting, error, isSuccess, handleSubmit } = useFormSubmit({
 *   onSubmit: async (data) => {
 *     await apiClient.createUser(data)
 *   },
 *   onSuccess: (data) => {
 *     toast.success('User created successfully!')
 *   },
 *   onError: (error) => {
 *     toast.error('Failed to create user')
 *   },
 *   resetOnSuccess: true,
 * })
 *
 * return (
 *   <Form form={form} onSubmit={form.handleSubmit(handleSubmit)}>
 *     <FormInput control={form.control} name="email" label="Email" />
 *     <Button type="submit" disabled={isSubmitting}>
 *       {isSubmitting ? 'Submitting...' : 'Submit'}
 *     </Button>
 *     {error && <p className="error">{error.message}</p>}
 *     {isSuccess && <p className="success">Form submitted successfully!</p>}
 *   </Form>
 * )
 * ```
 */
export function useFormSubmit<TFieldValues extends FieldValues = FieldValues>(
  options: UseFormSubmitOptions<TFieldValues>,
): UseFormSubmitReturn {
  const { onSubmit, onError, onSuccess } = options

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true)
    setError(null)
    setIsSuccess(false)

    try {
      await onSubmit(data as TFieldValues)
      setIsSuccess(true)
      onSuccess?.(data as TFieldValues)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred')
      setError(error)
      onError?.(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = (): void => {
    setIsSubmitting(false)
    setError(null)
    setIsSuccess(false)
  }

  return {
    isSubmitting,
    error,
    isSuccess,
    handleSubmit,
    reset,
  }
}

// ─── useFormReset ────────────────────────────────────────────────────────────

export type UseFormResetOptions<TFieldValues extends FieldValues = FieldValues> = {
  /**
   * The form instance from useForm()
   */
  form: UseFormReturn<TFieldValues>

  /**
   * Optional callback called before reset
   */
  onBeforeReset?: () => void

  /**
   * Optional callback called after reset
   */
  onAfterReset?: () => void
}

export type UseFormResetReturn = {
  /**
   * Reset the form to default values
   */
  resetForm: () => void

  /**
   * Whether the form has been modified from its default values
   */
  isDirty: boolean
}

/**
 * Hook to handle form reset with callbacks.
 *
 * @example
 * ```tsx
 * const form = useForm<FormValues>({ defaultValues: { email: '' } })
 * const { resetForm, isDirty } = useFormReset({
 *   form,
 *   onAfterReset: () => toast.info('Form reset'),
 * })
 *
 * return (
 *   <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormInput control={form.control} name="email" label="Email" />
 *     <Button type="button" onClick={resetForm} disabled={!isDirty}>
 *       Reset
 *     </Button>
 *   </Form>
 * )
 * ```
 */
export function useFormReset<TFieldValues extends FieldValues = FieldValues>({
  form,
  onBeforeReset,
  onAfterReset,
}: UseFormResetOptions<TFieldValues>): UseFormResetReturn {
  const resetForm = (): void => {
    onBeforeReset?.()
    form.reset()
    onAfterReset?.()
  }

  return {
    resetForm,
    isDirty: form.formState.isDirty,
  }
}
