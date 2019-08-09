const ERROR = 2
const WARN = 1
const OFF = 0

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'prettier/prettier': ['error', require('./prettier.config')],
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': OFF,
    'prefer-const': ERROR,
    'no-var': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARN,
    '@typescript-eslint/explicit-function-return-type': [
      ERROR,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': ERROR,
    '@typescript-eslint/explicit-member-accessibility': [
      ERROR,
      {accessibility: 'no-public'},
    ],
    'react/self-closing-comp': [ERROR],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/named': OFF,
      },
    },
  ],
}
