module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'googleappsscript', 'jest', 'prettier'],
  env: {
    'googleappsscript/googleappsscript': true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        printWidth: 100,
        trailingComma: 'all',
      },
    ],
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'webpack.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
