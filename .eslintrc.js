module.exports = {
  'extends': ['eslint:recommended'],
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': ['error', 'always-multiline'],
    'curly': 'error',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'keyword-spacing': ['error', { 'before': true }],
    'no-console': 'off',
    'no-plusplus': 'error',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-infix-ops': 'error',
  }
};
