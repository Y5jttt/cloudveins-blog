# 云脉 · CloudVeins — 国内云厂商 IP 与路由测绘博客

基于古典碑铭美学模板,用 **Astro** 改造的一套静态博客系统,主题聚焦国内各大云厂商的 IP 分配、路由接驳与跨网互联实测。
保留原模板的古典碑铭美学(黑曜石 + 金 + 陶红、Cinzel/Fraunces/思源宋体、纯 CSS 滚石动画),
把"写死的单页"升级为"内容驱动的博客":Markdown 写作,`git push` 自动部署到 **GitHub Pages**。

## 特性

- 零运行时 JS(首屏之外的交互由一小段 `ui.js` 提供:滚动进度条、星空、跑马灯、滚动淡入)
- 文章用 Markdown + frontmatter 撰写,类型安全(Content Collections)
- 首页 Hero + 滚石门面、最新文章卡、测绘者信条收尾
- 关于页 = 原模板的 I–V 宣言章节
- 归档页(按年份)、标签页、文章详情页(`.prose` 首字下沉/引用块排版)
- RSS(`/rss.xml`)、sitemap、Open Graph / Twitter Card

## 本地开发

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 产出 dist/
npm run preview
```

## 发布到 GitHub Pages

1. **改站点地址**:编辑 `astro.config.mjs` 顶部的 `site`,改成你的地址:
   - 用户/组织站 → `https://<user>.github.io`
   - 项目站     → `https://<user>.github.io/<repo>`
   - `@astrojs/github` 集成会在 Actions 中自动把 `base` 设为 `/<repo>`,本地 `dev` 不受影响。
2. **推送**:把本仓库推到 GitHub(分支 `main`)。
3. **开启 Pages**:仓库 `Settings → Pages → Build and deployment → Source` 选 **GitHub Actions**。
4. 之后每次 `push` 到 `main`,`.github/workflows/deploy.yml` 会自动构建并部署。

> 提示:GitHub Pages 在国内访问可能不稳定。若读者以国内为主,可考虑换成 EdgeOne Pages 免费版(本仓库的静态产物 `dist/` 直接拖拽上传即可,无需改代码)。

## 写新文章

在 `src/content/posts/` 新建一个 `.md`,填写 frontmatter:

```markdown
---
title: 文章标题
subtitle: The English Subtitle   # 可选,呼应模板中英并置
date: 2026-07-23
tags: [engineering, routing]
cover: /covers/x.jpg            # 可选,放 public/covers/ 下
excerpt: 一句话摘要,用于卡片与 SEO。
draft: false
---

正文用 Markdown 书写……
```

## 目录结构

```
cloudveins-blog/
├── astro.config.mjs          # site/base + github/sitemap 集成
├── src/
│   ├── styles/global.css      # 设计系统(从模板抽取)
│   ├── components/            # Header/Footer/Boulder/PostCard/Seo/Reveal …
│   ├── layouts/              # BaseLayout / PostLayout
│   ├── content/posts/        # 文章 Markdown
│   └── pages/               # 首页/关于/归档/标签/文章/RSS
├── public/favicon.svg
└── .github/workflows/deploy.yml
```

> Every hop deserves to be named.
