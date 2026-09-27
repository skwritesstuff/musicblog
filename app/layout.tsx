import type { Metadata } from 'next';
import { Poppins, IBM_Plex_Sans } from 'next/font/google';
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
  title: 'The MuSiK Box & In Audio We Trust | Pre-Algorithm Music Archive (2009–2012)',
  description:
    'A salvaged retrospective of an underground music blog punching above its weight in the golden era of mixtape culture and pre-algorithm music discovery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${ibmPlexSans.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('musikbox-archive-theme')||localStorage.getItem('vintage-archive-theme');if(t==='light'||t==='sepia'||t==='neon'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}`,
          }}
        />
      </head>
      <body className="bg-bg text-text-primary antialiased min-h-screen">{children}</body>
    </html>
  );
}
