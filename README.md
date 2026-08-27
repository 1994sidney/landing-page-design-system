# Landing Page Design System

用于持续维护中文 Landing Page 视觉语言、组件规范与页面结构的独立设计系统仓库。

当前 V1 方向基于 LeRoux 式现代商业视觉语言重新整理：实心中文字体、雾蓝灰主题、编辑式排版、低饱和真实摄影、减少线框与卡片边框、克制使用毛玻璃，并补齐数据图表、动态流程、状态反馈、页面级组件和响应式规范。

> 当前状态：源码结构已经完成 V1 发布前收口；正式标记 V1.0.0 Release / Tag 前，仍建议执行一次真实浏览器多视口验收。详细检查项见 [`RELEASE.md`](./RELEASE.md)。

## 页面信息架构

页面源码直接采用三级结构，不依赖 JavaScript 在运行时拆分、移动或重新生成组件。

- 设计基础：设计原则、色彩系统、字体样式、栅格与间距
- 基础组件：按钮与行动入口、标签与元信息、卡片、状态与反馈
- 数据图表：数据卡片、ECharts 图表
- 内容与媒体：图文、新闻 / 文章 / 案例、信任与证明、毛玻璃、观点引语、摄影
- 流程与交互：动态流程场景、联系表单、FAQ、动效语言
- 页面结构：导航栏、Hero、CTA、页脚、页面蓝图、内容与响应式规范、开发令牌

一级模块使用 H2，二级组件组使用 H3，具体组件内部从 H4 开始。顶部导航只对应六个一级模块。

## 官网内容排版基线

首页与二级内容页的普通内容模块统一使用以下语义层级：

- H2 模块标题：`34px`，行高 `1.28`，字重 `500`
- H2 对应主要说明文本：`16px`，行高 `1.90`
- H3 模块内小标题：`22px`，行高 `1.45`，字重 `500`
- H3 对应说明文本：`14px`，行高 `1.90`

这四个层级由 `styles/modules/typography.css` 提供 Design System 令牌，由 `shared/site-typography.css` 应用到当前官网。Hero / H1、案例引语、数据数字、政策文件标题、日期、眉签、图片说明与元信息属于独立语义，不机械套用上述字号。

完整规则见 [`TYPOGRAPHY_RULES.md`](./TYPOGRAPHY_RULES.md)。

## 当前仓库结构

```text
landing-page-design-system/
├── index.html              # 最终静态 DOM 与全部组件示例
├── script.js               # 揭幕、FAQ、导航 Scroll Spy、图片失败占位
├── charts.js               # ECharts 加载、状态与图表初始化
├── process.js              # Iconify / Anime.js 流程动画增强
├── RELEASE.md              # V1 发布规范、QA 与版本规则
├── TYPOGRAPHY_RULES.md      # 官网普通内容模块排版层级规则
├── shared/
│   └── site-typography.css # 官网语义排版规则落地
├── styles/
│   ├── core.css            # Reset、容器、布局骨架、基础排版、最小响应式
│   ├── base.css            # 兼容入口，仅转发 core.css；禁止继续开发
│   ├── system.css          # 设计系统语义样式入口
│   └── modules/
│       ├── foundation.css  # 主题变量、首屏、设计基础、基础控件
│       ├── data.css        # 数据卡片
│       ├── charts.css      # 图表容器与版式
│       ├── media.css       # 图文、毛玻璃、观点、摄影
│       ├── content.css     # 新闻、文章、案例
│       ├── trust.css       # 合作机构、评价、团队、资质成果
│       ├── process.css     # 动态流程与动效语言
│       ├── forms.css       # 表单与 FAQ
│       ├── navigation.css  # 一级模块导航
│       ├── rhythm.css      # 唯一全局纵向节奏变量来源
│       ├── hierarchy.css   # 大模块 / 小标题 / 组件三级层级
│       ├── page-sections.css # 导航、Hero、CTA、页脚变体
│       ├── states.css      # Hover / Focus / Error / Loading 等状态
│       ├── guidelines.css  # 内容长度、图片比例、响应式与边界规范
│       └── typography.css  # 官网 H2/H3 与对应说明文字语义令牌
└── README.md
```

历史 `styles/base/01–06.css` 与 `styles/v2.css` 已移除，不再使用按开发时间编号的 CSS 覆盖层。

## CSS 开发规则

正式样式只分两层：

`core.css` 负责最底层、跨组件稳定的结构能力；`system.css` 负责加载所有设计系统语义模块。

`styles/base.css` 只是当前 `index.html` 的兼容转发入口，不能再向其中增加规则。新页面应直接加载：

```html
<link rel="stylesheet" href="styles/core.css">
<link rel="stylesheet" href="styles/system.css">
```

新增或修改组件时，必须进入 `styles/modules/` 中最匹配的职责文件。不要重新新增 `14.css`、`v3.css` 或按修改次数命名的覆盖文件。

全站大模块、小模块、组件与组件内部间距统一由 `rhythm.css` 管理；标题层级和章节背景由 `hierarchy.css` 管理；官网内容文字的语义字号由 `typography.css` 管理。其他模块不应重新定义另一套页面级字号体系。

## JavaScript 规则

`index.html` 必须保持最终页面结构。JavaScript 不承担页面信息架构，只负责真实交互和增强：

- `script.js`：滚动显现、FAQ、导航状态、图片失败处理
- `charts.js`：ECharts
- `process.js`：动态流程 SVG 与动画

如果一个内容即使关闭 JavaScript 也应该存在，就应直接写在 HTML 中。

## 视觉方向

中文字体优先使用苹方、思源黑体、微软雅黑等系统无衬线字体。中文标题不使用空心字，也不通过极端负字距制造所谓未来感，而是依靠字号、字重、比例和留白建立气场。

核心角色色：

- 主题色 `#7B8E90`
- 主题深色 `#5F7375`
- 深背景 `#202629`
- 页面背景 `#F1F2F0`
- 内容表面 `#FAFAF8`
- 卡片 / 面板 `#E3E7E5`
- 主文本 `#202629`
- 次文本 `#6F7879`

毛玻璃只用于确实需要保留背景环境的浮层。普通内容分组优先使用留白、底色、真实摄影和不对称布局，不依赖大量圆角卡片、贯穿式分割线或蓝紫科技渐变。

## 响应式基线

- Desktop：`>= 1180px`
- Tablet：`681–1179px`
- Mobile：`<= 680px`
- 复杂组件允许在约 `980px` 先进行内部重排

普通内容模块的 H2 / H3 四级字号原则上不因设备尺寸重新定义，优先通过列数、内容宽度、换行和间距完成响应式调整。内容长度、图片比例、移动端图表和极端内容测试均已在页面的“内容与响应式规范”中提供示例。

## 外部依赖

当前示例使用：

- ECharts 5.5.1（jsDelivr）
- Iconify
- Anime.js
- Unsplash 示例摄影

图表和图片已经提供基础失败状态，但如果用于离线、内网或高可用生产项目，应考虑把外部资源本地化。

## 本地预览

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## 发布

当前 GitHub Pages 从 `main` 分支根目录发布。提交到 `main` 后由 Pages 自动更新。

正式发布或标记版本前，请执行 [`RELEASE.md`](./RELEASE.md) 中的多视口、浏览器、键盘、Reduced Motion、外部依赖失败和内容边界检查。

本仓库保持独立维护，不自动与其他业务工程合并，也不自动部署到 Vercel。
