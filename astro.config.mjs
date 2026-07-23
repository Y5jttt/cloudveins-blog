// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ── GitHub Pages 部署配置 ───────────────────────────────
// 1. 把 site 改成你自己的地址:
//    用户/组织站 → https://<user>.github.io
//    项目站     → https://<user>.github.io/<repo>
// 2. base 路径:在 GitHub Actions 中会从环境变量
//    GITHUB_REPOSITORY(owner/repo)自动取出 repo 名,
//    设为 /<repo>,从而兼容项目站;本地 dev 时 base 为 "/"。
//    若你改用用户/组织站(<user>.github.io),base 保持 "/" 即可。
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repo ? `/${repo}/` : '/';

export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base,
  integrations: [sitemap()],
  // GitHub Pages 静态托管:关闭 trailingSlash 更稳妥
  trailingSlash: 'ignore',
});
