import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // 测试环境
      environment: "jsdom",

      // 显式导入测试 API，避免污染全局作用域
      globals: false,

      // 测试文件
      include: ["tests/**/*.test.js"],

      // 排除目录
      exclude: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/e2e/**"],

      // 每次测试前清除 Mock 调用记录
      clearMocks: true,

      // 每次测试前恢复 Mock 原始实现
      restoreMocks: true,

      // 恢复通过 vi.stubGlobal 修改的全局变量
      unstubGlobals: true,

      // 恢复通过 vi.stubEnv 修改的环境变量
      unstubEnvs: true,

      // 测试覆盖率
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov"],
        reportsDirectory: "./coverage",

        // 统计业务源代码
        include: ["src/**/*.{js,vue}"],

        // 不参与覆盖率统计的文件
        exclude: ["src/main.js", "src/**/*.d.ts", "src/**/*.test.js", "src/**/*.spec.js"],
      },
    },
  }),
);
