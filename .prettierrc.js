module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  trailingComma: 'all',
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  overrides: [
    {
      files: '*.component.tsx',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
