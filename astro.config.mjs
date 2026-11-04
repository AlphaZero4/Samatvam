import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://alphazero4.github.io/Samatvam/
// For a custom domain set SITE_URL=https://samatvam.org and SITE_BASE=/ (see .env.example).
const site = process.env.SITE_URL || 'https://alphazero4.github.io';
const base = (process.env.SITE_BASE ?? '/Samatvam').replace(/\/$/, '') || '/';

/** Walk a hast tree and call fn on the root and every element node. */
function eachElement(node, fn, parent = null) {
  if (node.type === 'element' || node.type === 'root') fn(node, parent);
  for (const child of node.children ?? []) eachElement(child, fn, node);
}

/** Prefix root-relative links in Markdown (`/about-us/`, `/docs/x.pdf`) with the deploy base. */
function rehypeBaseLinks() {
  const prefix = base === '/' ? '' : base;
  return (tree) =>
    eachElement(tree, (el) => {
      const href = el.properties?.href;
      if (el.tagName === 'a' && typeof href === 'string') {
        if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith(prefix + '/')) {
          el.properties.href = prefix + href;
        }
        if (/^https?:\/\//.test(href) || href.endsWith('.pdf')) {
          el.properties.target = '_blank';
          el.properties.rel = 'noopener';
        }
      }
    });
}

/** Turn runs of image-only paragraphs into a responsive grid. */
function rehypeImageGrids() {
  const isImageParagraph = (n) =>
    n?.type === 'element' &&
    n.tagName === 'p' &&
    n.children.filter((c) => !(c.type === 'text' && !c.value.trim())).every((c) => c.tagName === 'img');
  return (tree) =>
    eachElement(tree, (el) => {
      if (!el.children) return;
      const out = [];
      let run = [];
      const flush = () => {
        if (run.length > 1) {
          out.push({
            type: 'element',
            tagName: 'div',
            properties: { className: ['media-grid'] },
            children: run.flatMap((p) => p.children.filter((c) => c.tagName === 'img')),
          });
        } else out.push(...run);
        run = [];
      };
      for (const child of el.children) {
        if (isImageParagraph(child)) run.push(child);
        else if (child.type === 'text' && !child.value.trim() && run.length) continue;
        else {
          flush();
          out.push(child);
        }
      }
      flush();
      el.children = out;
    });
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeBaseLinks, rehypeImageGrids],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
