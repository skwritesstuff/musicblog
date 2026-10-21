import type { Metadata } from 'next';

export const SITE_URL = 'https://shameis.com';
export const SITE_NAME = 'The MuSiK Box & In Audio We Trust';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle, description, url: path, siteName: SITE_NAME, type: 'website',
      images: [{ url: '/images/the-musik-box-banner.png', alt: 'The MuSiK Box — We Skip Study Hall For This…' }],
    },
    twitter: {
      card: 'summary_large_image', title: fullTitle, description,
      images: ['/images/the-musik-box-banner.png'],
    },
  };
}
