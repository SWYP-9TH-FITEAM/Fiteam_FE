module.exports = {
  ...require('gts/.prettierrc.json'),
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '',
    '^(react/(.*)$)|^(react$)|^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(@/(.*)$)',
    '^[./]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  tailwindFunctions: ['cn', 'cva'],
};
