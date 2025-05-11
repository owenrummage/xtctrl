// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';

/* eslint-env node */
export default [
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.node
            },
            parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
        // ...other config
    },
    {
        files: ['**/*.js', '**/*.cjs'],
        ...tseslint.configs.disableTypeChecked
    }
];
