# 仓库指引

## 项目结构与模块组织

本项目是基于 Vue 3、Vite、Vue Router、Pinia 和 Tailwind CSS 的个人网站，采用 JavaScript 与 ES Modules。

- `src/views/`：首页及博客、项目、书籍、诗词、文藏页面。
- `src/components/`：布局、卡片、骨架屏、弹窗和公共列表组件。
- `src/composables/`：分页、首页数据、全局搜索、主题及焦点管理逻辑。
- `src/api/`、`src/utils/`、`src/stores/`：接口封装、工具函数和字典状态。
- `tests/`：自动化测试；`scripts/`：图标生成脚本。
- `public/`：直接复制到构建产物的静态资源；`resources/img/`：展示截图。
- `.github/workflows/deploy-pages.yml`：检查、构建与 GitHub Pages 部署流程。

## 安装、开发与检查

Node.js 版本需符合 `package.json` 的 `engines`，CI 使用 `22.22.2`。

- `npm ci`：按锁文件安装依赖。
- `npm run dev`：启动本地开发服务。
- `npm run build`：生产构建，输出至 `dist/`。
- `npm run preview`：预览构建产物。
- `npm test`：运行全部 Vitest 测试；`npm run test:watch`：监听测试。
- `npm run format`：执行 Prettier 格式化；`npm run lint`：执行零警告 ESLint 检查。
- `npm run check`：依次检查图标、格式、Lint、测试和生产构建，提交前运行。

## 编码风格与命名

使用两空格缩进、双引号、分号及 LF 换行，由 Prettier 统一格式。Vue 组件沿用 Composition API 和 `<script setup>`；组件文件使用 PascalCase，模板组件标签使用 kebab-case。组合式函数以 `use` 开头，例如 `usePaginatedList.js`。跨目录导入使用 `@/` 别名，同目录可用 `./`。

复用现有列表、加载和错误提示组件。修改异步逻辑时保留请求取消、防止旧响应覆盖、失败重试及缓存页面恢复行为。新增图标后运行 `npm run icons:generate`，并检查生成结果。

## 测试约定

使用 Vitest、Vue Test Utils 和 jsdom，测试命名为 `tests/*.test.js`，公共辅助函数位于 `tests/helpers.js`。可用 `npm test -- tests/pagination.test.js` 运行单个文件。

为行为变更和缺陷修复补充必要测试，重点验证分页重试、搜索竞态、字典恢复、路由失败和弹窗焦点。通过 Mock 隔离远程 API。当前未配置覆盖率门槛，不应把覆盖率报告视为已有强制要求。

## 提交与合并请求

采用统一的 Conventional Commits 约定。新提交应简洁说明修改对象和具体行为，每次聚焦一个主题。

合并请求应说明问题、修改后的行为和验证结果，关联相关 issue；界面调整附截图，涉及响应式或主题时展示对应状态。标明尚未验证的内容。推送到 `main` 会触发部署，检查通过后发布至 GitHub Pages。

## 配置注意事项

环境配置位于 `.env`、`.env.development` 和 `.env.production`。开发服务通过 `/self-hub` 代理访问后端；请求统一经由 `src/utils/request.js`。`VITE_*` 变量会进入浏览器构建产物，不得用于保存私密凭据。

## 君子协定

### 样式优先复用

优先使用 Tailwind CSS 工具类组织样式；仅在工具类难以清晰表达或需要复用复杂规则时编写自定义 CSS，避免重复定义已有样式。

### 图标按需生成

使用 Font Awesome Free 图标类名，例如 `fa-solid fa-code`。新增或调整图标后运行 `npm run icons:generate`，由脚本扫描源码并生成所需的 SVG 图标样式；不要手动修改 `src/icons.css`。提交前通过 `npm run icons:check` 确认产物与源码一致。

### 文案与标点保持一致

根据文案的界面用途决定标点，不以字数、换行或 HTML 标签作为判断依据。同类文案保持一致，无需为所有文字添加句号。

| 文案用途 | 标点约定 |
| --- | --- |
| 页面标题、栏目标题、宣传短句、副标题 | 不加句号 |
| 按钮、链接、占位提示、标签、元信息 | 不加句号，不加装饰性省略号 |
| 简短状态、空状态、缺失信息提示 | 不加句号，保留必要的句内标点 |
| 正在进行的可见状态 | 末尾统一使用单个省略号字符 `…`，例如“正在加载…” |
| 正文段落、完整使用说明、带操作建议的错误提示 | 使用完整中文标点，陈述句以 `。` 结束 |
| 无障碍名称、替代文本、工具提示 | 作为控件名称或简短提示时不加句号 |
