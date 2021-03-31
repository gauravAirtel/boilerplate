module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': [],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    "max-len": ["error", { "code": 100, "tabWidth": 4 }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
    "camelcase": ["error", { properties: "never", "ignoreDestructuring": true }],
    "prefer-destructuring": "off",
    "no-param-reassign": "off",
    // "no-console": ["error"],
    "no-use-before-define": ["error", { "functions": false }],
  },
};
