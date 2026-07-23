import { defineCollection, z } from 'astro:content';

// 博客文章集合 schema —— 带类型校验,防止 frontmatter 写错
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),          // 呼应模板中英并置的调性
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),             // 例如 /covers/x.jpg (放在 public/)
    excerpt: z.string().optional(),           // 列表/卡片/SEO 摘要
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
