import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignorePatterns: ['coverage/'],
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals if needed
        ...globals.node, // Add node globals (e.g., `module`, `require`)
        ...globals.jest, // Add jest globals (e.g., `describe`, `it`, `expect`)
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
