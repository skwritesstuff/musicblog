'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const APP_ID = '32906103-8EC7-4D3B-B1E1-82358FFAEE68';
const ENDPOINT = 'https://nom.telemetrydeck.com/v2/w/';

function isLocalHost(hostname: string) {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    /^127(\.\d+){0,2}\.\d+$/.test(hostname)
  );
}

/** Fire a page view using TelemetryDeck's Web SDK ingest shape. */
function sendPageView() {
  if (typeof window === 'undefined') return;

  const payload: Record<string, string | boolean> = {
    appID: APP_ID,
    url: window.location.href,
    referrer: document.referrer,
    telemetryClientVersion: 'WebSDK 1.1.0',
    locale: navigator.language,
  };

  if (isLocalHost(window.location.hostname) || window.location.protocol === 'file:') {
    payload.isTestMode = true;
  }

  void fetch(ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the site.
  });
}

/**
 * Privacy-friendly page analytics for TelemetryDeck.
 * Sends on first load and on App Router client navigations.
 */
export default function TelemetryDeckAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    sendPageView();
  }, [pathname]);

  return null;
}
