// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ── 部署配置(自定义域名 net.ysjttt.icu)─────────────────
// 自定义域名直接服务在项目站根路径(apex),因此 base 固定为 '/',
// 不要按仓库名再加 /cloudveins-blog/ 子路径(GitHub Pages 自定义域
// 名会把项目站直接挂到根,加子路径反而 404)。
// 若以后改回 github.io 默认项目站地址,再把 base 设为 '/cloudveins-blog/'。
const base = '/';

export default defineConfig({
  site: 'https://net.ysjttt.icu',
  base,
  integrations: [sitemap()],
  // GitHub Pages 静态托管:关闭 trailingSlash 更稳妥
  trailingSlash: 'ignore',
});
