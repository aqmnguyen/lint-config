'use strict';

const path = require('path');
const { ESLint } = require('eslint');

test('it uses the right basic configuration', async () => {
  const eslint = new ESLint();
  const config = await eslint.calculateConfigForFile(
    path.resolve(__dirname, './fixtures/normal-project/index.js')
  );

  expect(config.parserOptions.ecmaFeatures).toEqual({
    jsx: true,
    legacyDecorators: true,
  });

  expect(config.rules['prettier/prettier']).toEqual(['error']);

  expect(config.settings).toEqual({
    react: {
      version: 'detect',
    },
  });
});

test('it uses the right test configuration', async () => {
  const eslint = new ESLint();
  const config = await eslint.calculateConfigForFile(
    path.resolve(__dirname, './fixtures/normal-project/tests/index-test.js')
  );

  expect(config.rules['react/jsx-props-no-spreading']).toEqual(['off']);
});
