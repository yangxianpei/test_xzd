module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'prettier/@typescript-eslint',
    'plugin:react/recommended'
  ],
  rules: {
    'no-undef': 2,
    'react/prop-types': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-alert': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'react/display-name': 0,
    'react/no-children-prop': 0,
    'consistent-return': 0,
    'no-console': 0,
    'spaced-comment': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/method-signature-style': 0,
    '@typescript-eslint/array-type': 0,
    'import/no-dynamic-require': 0,
    'object-shorthand': 0,
    'func-names': 0,
    'no-else-return': 0,
    'no-nested-ternary': 0,
    'prefer-template': 0,
    'prefer-destructuring': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react/react-in-jsx-scope':0
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    react: {
      version: "detect"
    }
  }
};
