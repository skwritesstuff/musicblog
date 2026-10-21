import type { Metadata } from 'next';
import { Poppins, IBM_Plex_Sans } from 'next/font/google';
import TelemetryDeckAnalytics from '@/components/TelemetryDeckAnalytics';
import { SITE_URL, pageMetadata } from '@/lib/metadata';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata('Music Archive (2009–2012)', 'Explore 360 preserved records from The MuSiK Box and In Audio We Trust, with music, artwork, and the story behind the blogs.', '/'),
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <body className="bg-black text-white antialiased min-h-screen">
        {children}
        <TelemetryDeckAnalytics />
      </body>
    </html>
  );
}
