import {
  Button,
  createFieldNames,
  Form,
  FormCascader,
  FormCheckbox,
  FormInput,
  FormSwitch,
  FormTagInput,
  validators,
} from '@mining-sdk/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: validators.requiredString({ minLength: 2 }),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  categories: z
    .array(z.array(z.union([z.string(), z.number(), z.boolean()])))
    .min(1, 'At least one category is required'),
  notifications: z.boolean(),
  agree: validators.requiredBoolean('You must agree to continue'),
})

type FormValues = z.infer<typeof formSchema>
const field = createFieldNames<FormValues>()

/**
 * Advanced form example showcasing the additional field components:
 * - FormTagInput (multi-select with search)
 * - FormCascader (hierarchical select)
 */
export const FormAdvancedExample = (): React.ReactElement => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tags: [],
      categories: [],
      notifications: false,
      agree: undefined as unknown as true,
    },
  })

  const [error, setError] = useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (data: FormValues): Promise<void> => {
    setError(null)
    setIsSuccess(false)

    try {
      console.warn('Form submitted:', data)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      console.warn('Success!', data)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Submission failed')
      setError(error)
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Advanced Form Components</h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        Examples of FormTagInput and FormCascader
      </p>

      <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          control={form.control}
          name={field('name')}
          label="Name"
          placeholder="Enter your name"
        />

        {/* FormTagInput - Multi-select with search */}
        <FormTagInput
          control={form.control}
          name={field('tags')}
          label="Skills"
          placeholder="Add skills..."
          options={[
            'React',
            'TypeScript',
            'Node.js',
            'Python',
            'Go',
            'Rust',
            'Docker',
            'Kubernetes',
            'AWS',
            'Azure',
          ]}
          description="Select from the list or type custom skills"
        />

        {/* FormCascader - Hierarchical select */}
        <FormCascader
          control={form.control}
          name={field('categories')}
          label="Interests"
          placeholder="Select your interests..."
          multiple
          options={[
            {
              value: 'technology',
              label: 'Technology',
              children: [
                { value: 'web', label: 'Web Development' },
                { value: 'mobile', label: 'Mobile Development' },
                { value: 'devops', label: 'DevOps' },
                { value: 'ai', label: 'AI & Machine Learning' },
              ],
            },
            {
              value: 'design',
              label: 'Design',
              children: [
                { value: 'ui', label: 'UI Design' },
                { value: 'ux', label: 'UX Research' },
                { value: 'graphics', label: 'Graphic Design' },
              ],
            },
            {
              value: 'business',
              label: 'Business',
              children: [
                { value: 'product', label: 'Product Management' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'sales', label: 'Sales' },
              ],
            },
          ]}
          description="Choose one or more categories"
        />

        <FormSwitch
          control={form.control}
          name={field('notifications')}
          label="Email notifications"
          description="Receive updates and news"
        />

        <FormCheckbox
          control={form.control}
          name={field('agree')}
          label="I agree to the terms and conditions"
        />

        <Button type="submit" variant="primary" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit Profile'}
        </Button>

        {isSuccess && (
          <div
            style={{
              color: 'var(--status-success)',
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--status-success-bg)',
              borderRadius: '0.375rem',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            Profile submitted successfully! ✓
          </div>
        )}
        {error && (
          <div
            style={{
              color: 'var(--status-error)',
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--status-error-bg)',
              borderRadius: '0.375rem',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
            role="alert"
          >
            Error: {error.message}
          </div>
        )}
      </Form>
    </div>
  )
}

export default FormAdvancedExample
