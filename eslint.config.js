import globals from "globals";
import pluginReact from "eslint-plugin-react";
import js from "@eslint/js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "react": pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "warn",
      
      // Règles de style et de qualité
      "no-unused-vars": ["warn", { 
        "vars": "all", 
        "args": "after-used", 
        "ignoreRestSiblings": false 
      }],
      "max-len": ["warn", { 
        "code": 120, 
        "tabWidth": 2 
      }],
      "indent": ["warn", 2],
      "semi": ["error", "always"],
      "quotes": ["warn", "single"]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
