import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Long-form pages ported from samatvam.org. Each Markdown file becomes /<slug>/.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      /** Short name used in nav / breadcrumb, e.g. "About Us". */
      title: z.string(),
      /** Big page headline, e.g. "Service with Devotion". */
      heading: z.string(),
      description: z.string(),
      lead: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().default(''),
      /** Lay out top-level lists as a grid of chips. */
      gridLists: z.boolean().default(false),
      /** Optional parent crumb. */
      parent: z.object({ label: z.string(), href: z.string() }).optional(),
    }),
});

export const collections = { pages };
