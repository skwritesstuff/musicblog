'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GalleryAliasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/media');
  }, [router]);

  return (
    <div className="min-h-screen bg-bg text-text-muted flex items-center justify-center font-body text-sm">
      Redirecting to Media & Art…
    </div>
  );
}
