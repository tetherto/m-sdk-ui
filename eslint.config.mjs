import antfu from '@antfu/eslint-config'
import lodash from 'eslint-plugin-lodash'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import testingLibrary from 'eslint-plugin-testing-library'

export default antfu(
  {
    type: 'lib',
    typescript: true,
    formatters: false,
    ignores: ['**/*.md', '**/.storybook/', '**/stories/'],
    plugins: {
      react,
      lodash,
      storybook,
      'react-hooks': reactHooks,
      'testing-library': testingLibrary,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': 'error',
      'antfu/no-top-level-await': 'off',
      'node/prefer-global/process': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.',
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md'],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'date-fns',
              message: `Import functions directly (e.g., 'date-fns/subWeeks').`,
            },
          ],
        },
      ],
      'no-nested-ternary': 'error',
      'react/require-default-props': 'off',
      'react/default-props-match-prop-types': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-debugger': 'error',
      'react/jsx-indent': ['error', 2],
      'arrow-body-style': ['error', 'as-needed'],
      'react-hooks/exhaustive-deps': 'off',
      'no-case-declarations': 'off',
      'no-unused-vars': 'off',
      'lodash/prop-shorthand': 'off', // will turn on for js below
      'lodash/matches-shorthand': 'off',
      'lodash/matches-prop-shorthand': 'off',
      'lodash/prefer-constant': 'off',
      'lodash/prefer-flat-map': 'off',
      'lodash/prefer-some': 'off',
      'lodash/path-style': 'off',
    },
  },
  // Storybook overrides
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      'storybook/hierarchy-separator': 'error',
      'storybook/default-exports': 'off',
    },
  },
  // Test overrides
  {
    files: [
      '**/*.test.js',
      '**/*.spec.js',
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/*.test.tsx',
      '**/*.spec.tsx',
    ],
    rules: {
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-case-declarations': 'off',
      'no-undef': 'off',
    },
  },
)
