import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended', 'plugin:react/jsx-runtime'],
    languageOptions: { globals: globals.node },
  },
  pluginReact.configs.flat.recommended,
]);
