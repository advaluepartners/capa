module.exports = {
  extends: [
    'eslint-config-supabase/next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'warn',
  }
};

// module.exports = {
//   extends: ['eslint-config-supabase/next'],
//   rules: {
//     '@next/next/no-img-element': 'off',
//     'react/no-unescaped-entities': 'off',
//     'react/display-name': 'warn',
//   },
// }
