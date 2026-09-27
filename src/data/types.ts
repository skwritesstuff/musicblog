export type ArchivePost = {
  date: string;
  year: number;
  title: string;
  slug: string;
  href: string;
  category: string;
  genre: string;
  artists: string[];
  waybackUrl: string;
};

export type ArtistRecord = {
  name: string;
  count: number;
  slug: string;
};

export type RecoveredMedia = {
  id: string;
  src: string;
  alt: string;
  badge: string;
  title: string;
  filename: string;
  platform: string;
  description: string;
  fullRes: string;
  waybackUrl: string;
};

export type UploadRecord = {
  date: string;
  subject: string;
  artist: string;
  filename: string;
  platform: string;
  status: 'preserved' | 'uncached';
  statusLabel: string;
  waybackUrl: string;
};
