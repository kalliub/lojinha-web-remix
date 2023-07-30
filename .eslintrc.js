/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    "max-len": [
      0,
      80,
      2,
      {
        ignoreUrls: true,
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx"],
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "default-param-last": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-shadow": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "class-methods-use-this": 0,
    "import/no-extraneous-dependencies": [
      0,
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.spec.ts",
          "**/*.spec.tsx",
        ],
      },
    ],
    "import/prefer-default-export": 0,
    "sort-imports": [
      "error",
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    "import/order": [
      1,
      {
        groups: [
          ["external", "builtin"],
          "internal",
          ["sibling", "parent"],
          "index",
        ],
        pathGroups: [
          { pattern: "components", group: "internal" },
          { pattern: "components/**", group: "internal" },
          { pattern: "constants/**", group: "internal" },
          { pattern: "common", group: "internal" },
          { pattern: "error/**", group: "internal" },
          { pattern: "hooks/**", group: "internal" },
          { pattern: "locale/**", group: "internal" },
          { pattern: "routes/**", group: "internal" },
          { pattern: "selectors", group: "internal" },
          { pattern: "store", group: "internal" },
          { pattern: "assets/**", group: "internal", position: "after" },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: [
    "serviceWorker.ts",
    "**/assets/*",
    "**/build/*",
    "example.tsx",
    "remix.env.d.ts",
    "remix.config.js",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
      },
    },
  ],
};
