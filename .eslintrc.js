module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    vueFeatures: {
      'filter': false
    }
  },
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-tabs': ['error', { 'allowIndentationTabs': true }],
    'object-curly-spacing': ['error', 'always']
  }
}
