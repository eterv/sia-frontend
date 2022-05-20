module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    //'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'jsx-a11y' /*'prettier'*/],
  rules: {
    //'no-unused-vars': 'off',

    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-this-alias': 'off',

    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['dist', 'craco.config.js'],
};
