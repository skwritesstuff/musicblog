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
  title: 'The MuSiK Box & In Audio We Trust (2009–2012) • shameis.com',
  description: 'Vintage blog-era archive of The MuSiK Box and In Audio We Trust (2009–2012).',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${ibmPlexSans.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.setItem('vintage-archive-theme','dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.backgroundColor='#000000';}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-[#000000] text-white antialiased min-h-screen">{children}</body>
    </html>
  );
}
