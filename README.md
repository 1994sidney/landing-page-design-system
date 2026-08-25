# Landing Page Design System

用于持续迭代 Landing Page 视觉语言与组件规范的独立设计仓库。

当前设计方向基于 LeRoux 的现代商业视觉语言，并针对中文简体网页重新整理：中文实心字体、雾蓝灰主题、编辑式排版、低饱和摄影、减少线框与卡片边框，以及克制使用毛玻璃效果。

## 信息架构

页面源码直接采用三级结构，不再依赖 JavaScript 在运行时拆分、移动或重新生成组件：

- 设计基础：设计原则、色彩系统、字体样式、栅格与间距
- 基础组件：按钮与行动入口、标签与元信息、卡片
- 数据图表：数据卡片、ECharts 图表
- 内容与媒体：图文、新闻 / 文章 / 案例、毛玻璃、观点引语、摄影
- 流程与交互：动态流程场景、联系表单、FAQ、动效语言
- 页面结构：页面蓝图、页脚、开发令牌

## 当前结构

```text
landing-page-design-system/
├── index.html             # 最终静态 DOM 与全部组件示例
├── script.js              # 揭幕、FAQ、一级模块导航状态
├── charts.js              # ECharts 加载与图表初始化
├── process.js             # Iconify / Anime.js 流程动画增强
├── styles/
│   ├── base.css           # 原始基础样式入口
│   ├── base/              # 稳定的底层样式
│   ├── system.css         # 当前设计系统语义样式入口
│   ├── v2.css             # 兼容入口，仅转发到 system.css
│   └── modules/
│       ├── foundation.css # 主题变量、首屏、设计基础、基础组件
│       ├── data.css       # 数据卡片
│       ├── charts.css     # 图表容器与版式
│       ├── media.css      # 图文、毛玻璃、观点、摄影
│       ├── content.css    # 新闻、文章、案例
│       ├── process.css    # 动态流程与动效
│       ├── forms.css      # 表单与 FAQ
│       ├── navigation.css # 一级模块导航
│       ├── rhythm.css     # 全局纵向节奏
│       └── hierarchy.css  # 大模块 / 小标题 / 组件三级层级
└── README.md
```

## 开发原则

`index.html` 应保持最终页面结构。新增组件时直接放入对应一级模块下，不通过运行时脚本搬运 DOM。JavaScript 仅用于交互增强、图表初始化和动画，不承担页面信息架构。

CSS 优先写入 `styles/modules/` 中对应职责文件，不再新增 `01.css / 02.css` 或 `components-v18.js` 这类按开发时间编号的文件。`styles/v2.css` 仅为旧入口兼容保留，新页面建议直接引用 `styles/system.css`。

## 设计方向

- 中文字体优先：苹方、思源黑体、微软雅黑等系统无衬线字体
- 不使用空心大字，中文标题依靠字号、字重、留白建立气场
- 主题色：`#7B8E90`
- 深背景：`#20282A`
- 页面背景：`#F1F2F0`
- 内容表面：`#FAFAF8`
- 卡片 / 面板：`#E3E7E5`
- 主文本：`#202629`
- 次文本：`#5E6869`
- 毛玻璃只用于确实需要保留背景环境的浮层场景
- 减少贯穿式分割线、表格感和边框卡片，通过留白、底色、摄影与不对称布局建立层级

## 本地预览

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/`。

本仓库保持独立维护，不自动与其他业务工程合并，也不自动部署到 Vercel。
