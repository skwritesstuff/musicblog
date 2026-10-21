import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/src/data/blogPosts';
import { SITE_URL } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/story/', '/archive/', '/artists/', '/featured/', '/vault/', ...getAllBlogSlugs().map((slug) => `/blog/${slug}/`)].map((path) => ({ url: `${SITE_URL}${path}` }));
}
