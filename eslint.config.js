import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  // 忽略文件
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "dist-ssr/**",
      "coverage/**",
      "*.min.js",
      "*.d.ts",
      "auto-imports.d.ts",
      "components.d.ts",
    ],
  },

  // JavaScript 推荐规则
  js.configs.recommended,

  // TypeScript 推荐规则
  ...tseslint.configs.recommended,

  // Vue 3 推荐规则
  ...vue.configs["flat/recommended"],

  // Vue + TypeScript 解析配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
  },

  // 全局配置
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Vue
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "warn",
      "vue/require-default-prop": "off",
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineProps", "defineEmits"],
        },
      ],
      // Vue 模板中的组件标签必须使用 kebab-case
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: false,
          ignores: [],
        },
      ],

      // JavaScript
      "no-console": "warn",
      "no-debugger": "warn",

      // 跨目录导入请使用 @/ 路径别名
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "跨目录导入请使用 @/ 路径别名",
            },
          ],
        },
      ],
    },
  },

  // 关闭与 Prettier 冲突的规则（放在最后）
  prettier,
);
