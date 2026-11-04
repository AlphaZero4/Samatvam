import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/media/*.{webp,svg}', { eager: true });

/** Look up an optimisable image in src/assets/media by base name, e.g. media('home-caro-1'). */
export function media(name: string): ImageMetadata {
  const hit = files[`/src/assets/media/${name}.webp`] ?? files[`/src/assets/media/${name}.svg`];
  if (!hit) throw new Error(`Missing media asset: ${name}`);
  return hit.default;
}
