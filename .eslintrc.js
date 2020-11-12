module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['jest', 'simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-return-assign': [2, 'except-parens'],
    'no-underscore-dangle': 0,
    'jest/no-focused-tests': 2,
    'jest/no-identical-title': 2,
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-expect-error': 'allow-with-description' },
    ],
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'import/first': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/newline-after-import': 'off',
    'no-console': 'warn',
    'no-multiple-empty-lines': 'error',
    'semi': 'error',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'max-len': [
      'error',
      120,
      2,
      {
        'ignoreUrls': true,
        'ignoreComments': false,
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 0,
      },
    },
    {
      'files': ['*.js'],
      'rules': {
        'no-console': 'off',
        'simple-import-sort/sort': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
