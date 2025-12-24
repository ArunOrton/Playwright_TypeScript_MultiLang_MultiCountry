const { FlatCompat: flatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const pluginPlaywright = require('eslint-plugin-playwright')
const pluginFilenames = require('eslint-plugin-filenames')
const typescriptParser = require('@typescript-eslint/parser')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const pluginJsdoc = require('eslint-plugin-jsdoc')

const compat = new flatCompat ({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
})

module.exports = [
  {
    files: ['**/*.js', '**/*.ts'],
    ignores: [
      'allure-results/**/*',
      'allure-report/**/*',
      'playwright-report/**/*',
      'test-results/**/*'
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        commonjs: true,
        es2020: true,
        node: true,
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      },
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      playwright: pluginPlaywright,
      filenames: pluginFilenames,
      jsdoc: pluginJsdoc
    },
    rules: {
      'no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }],
      'indent': ['error', 2, {
        SwitchCase: 1
      }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-debugger': ['error'],
      'no-console': ['error', {
        allow: ['debug', 'warn', 'error', 'log']
      }],
      'keyword-spacing': ['error', {
        before: true,
        after: true,
        overrides: {
          if: { after: false },
          while: { after: false },
          for: { after: false },
          catch: { after: false },
          switch: { after: false },
          case: { after: true }
        }
      }],
      'space-in-parens': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'space-before-blocks': ['error'],
      'block-spacing': ['error', 'always'],
      'template-curly-spacing': ['error', 'never'],
      'curly': ['error'],
      'key-spacing': ['error', {
        beforeColon: false,
        afterColon: true
      }],
      'comma-style': ['error', 'last'],
      'comma-spacing': ['error', {
        before: false,
        after: true
      }],
      'no-trailing-spaces': 'error',
      'space-infix-ops': 'error',
      'no-warning-comments': ['error', {
        terms: ['todo', 'fixme', 'xxx'],
        location: 'start'
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'] // Enforce camelCase for variables, UPPER_CASE for constants
        },
        {
          selector: 'function',
          format: ['camelCase'] // Enforce camelCase for function and method names
        },
        {
          selector: 'class',
          format: ['PascalCase'] // Enforce PascalCase for class names
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'] // Enforce PascalCase and optional "I" prefix for interfaces
        }
      ],
      // JSDoc Rules
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: false,
            ArrowFunctionExpression: false,
            FunctionExpression: false
          }
        }
      ],
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns-type': 'error'
    }
  },
  {
    files: ['./Common/**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      playwright: pluginPlaywright,
      filenames: pluginFilenames,
      jsdoc: pluginJsdoc
    },
    ...compat.config({
      extends: [
        'plugin:playwright/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ]
    })
  }
]
