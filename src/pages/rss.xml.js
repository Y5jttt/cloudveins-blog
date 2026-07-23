import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: '云脉 · CloudVeins',
    description: '国内云厂商 IP 与路由测绘 —— 每一跳都值得被命名。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt ?? '',
      link: `/posts/${post.slug}/`,
      categories: post.data.tags,
    })),
  });
}
