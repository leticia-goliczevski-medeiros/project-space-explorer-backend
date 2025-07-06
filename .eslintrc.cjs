module.exports = {
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended'
  ],
  plugins: ['eslint-comments'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'linebreak-style': ['error', 'unix'],
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    'eslint-comments/no-use': ['error', { allow: [] }]
  }
}
