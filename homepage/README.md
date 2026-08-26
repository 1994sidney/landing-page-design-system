# 首页代码结构

首页按“内容 / 样式 / 交互”拆分，避免再通过 JavaScript 写入页面内容。

## 运行入口

- `index.html`：只保留页面语义结构、文本、链接、图片/媒体占位和必要的数据属性。
- `homepage.css`：首页样式入口，只负责加载首页各业务模块样式。
- `homepage.js`：首页交互入口，只负责加载政策手风琴、案例轮播等首页交互。

## 首页模块样式

- `hero-fullscreen.css`：首屏 Hero。
- `policy-accordion.css`：政策背景与展开样式。
- `services-stack.css`：服务体系。
- `service-cases.css`：服务案例与案例轮播。
- `credibility-cards.css`：专业与公信力、合作机构滚动。
- `news-leroux.css`：资讯与研究。

## 首页模块交互

- `policy-accordion.js`：只处理政策展开/收起动画，不生成或替换政策内容。
- `service-cases.js`：只处理案例切换、轮播和内容状态同步。

## 跨页面复用

公共页面统一复用：

- `/shared/theme.css`：公共主题变量、容器、按钮、章节标题等基础规则。
- `/shared/site-shell.css`：顶部导航与 Footer 的公共视觉样式。
- `/shared/site-shell.js`：导航下拉、滚动显示/隐藏等公共交互。

导航与 Footer 的实际文本仍保留在各页面 HTML 中，保证语义、SEO 和无 JavaScript 时的基本可用性。迁移到新页面时复用相同的 `.mh-header` / `.mh-footer` 结构和 shared 资源，不使用 JavaScript 注入导航或 Footer HTML。
