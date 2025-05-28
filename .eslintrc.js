module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "next/core-web-vitals",
    "prettier", // Make sure this is last to override other configs
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import", "prettier"],
  rules: {
    // React specific rules
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-closing-tag-location": "error",
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-max-props-per-line": ["error", { maximum: { single: 3, multi: 1 } }],
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
    "react/jsx-fragments": "error",
    "react/jsx-pascal-case": "error",
    "react/self-closing-comp": "error",
    "react/no-string-refs": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
      },
    ],

    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/triple-slash-reference": "warn",
    "@typescript-eslint/type-annotation-spacing": "error",

    // General syntax and formatting rules
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "no-alert": "warn",
    "no-unused-vars": "off", // Using TypeScript's version
    "prefer-const": "error",
    "no-var": "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-before-blocks": "error",
    "keyword-spacing": ["error", { before: true, after: true }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "computed-property-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
    quotes: ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "no-extra-semi": "error",
    "semi-spacing": ["error", { before: false, after: true }],
    indent: ["error", 2, { SwitchCase: 1 }],
    "max-len": [
      "warn",
      { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true },
    ],
    "no-multi-spaces": "error",
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "comma-spacing": ["error", { before: false, after: true }],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    curly: ["error", "multi-line"],
    "no-mixed-spaces-and-tabs": "error",
    "no-irregular-whitespace": "error",

    // Import rules
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/export": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-duplicates": "error",

    // React hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Accessibility rules
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/html-has-lang": "error",
    "jsx-a11y/img-redundant-alt": "error",
    "jsx-a11y/interactive-supports-focus": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/no-access-key": "error",
    "jsx-a11y/no-distracting-elements": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "error",
    "jsx-a11y/no-noninteractive-tabindex": "error",
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/scope": "error",
    "jsx-a11y/tabindex-no-positive": "error",

    // Next.js specific rules
    "react/react-in-jsx-scope": "off", // Next.js doesn't require React import
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "error",
    "@next/next/no-unwanted-polyfillio": "error",
    "@next/next/no-sync-scripts": "error",
    "@next/next/no-page-custom-font": "error",

    // Prettier integration
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        semi: true,
        printWidth: 100,
        tabWidth: 2,
        arrowParens: "always",
        endOfLine: "auto",
      },
    ],
  },
  overrides: [
    {
      // Specific rules for Next.js pages and API routes
      files: ["pages/**/*.{ts,tsx}", "app/**/*.{ts,tsx}", "pages/api/**/*.{ts,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      // Specific rules for test files
      files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "react/display-name": "off",
      },
    },
  ],
}
