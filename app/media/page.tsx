'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy /media route → Artwork Vault */
export default function MediaAliasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/vault/');
  }, [router]);
  return (
    <div className="min-h-screen bg-black text-[#94a3b8] flex items-center justify-center font-body text-sm">
      Redirecting to Artwork Vault…
    </div>
  );
}
