import type { Metadata } from 'next';

import { CookieConsent } from '@/components/cookie-consent';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SmoothScroll } from '@/components/smooth-scroll';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lemino.sk'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  title: {
    default: 'Lemino | Lešenie, debnenie a výťahy Bratislava',
    template: '%s | Lemino Bratislava',
  },
  description:
    'Prenájom lešenia, stropného debnenia, stavebných výťahov a sklzov v Bratislave a okolí. Montáž, demontáž, poradenstvo. Rýchle nasadenie, férová cena.',
  keywords: [
    'lešenie Bratislava',
    'prenájom lešenia Bratislava',
    'stropné debnenie Bratislava',
    'stavebné výťahy Bratislava',
    'lešenárske práce Bratislava',
    'fasádne lešenie',
    'mobilné lešenie',
    'PERI debnenie',
    'GEDA výťah',
    'Lemino s.r.o.',
  ],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'Lemino',
    images: [{ url: '/media/uvodna-fotka.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lemino s.r.o.',
  description:
    'Prenájom fasádneho lešenia, stropného debnenia a stavebných výťahov v Bratislave a okolí.',
  url: 'https://www.lemino.sk',
  telephone: '+421948303906',
  email: 'lemino@lemino.sk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Na Výslní 3/B',
    addressLocality: 'Bratislava',
    postalCode: '821 09',
    addressCountry: 'SK',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 48.1492, longitude: 17.1422 },
  areaServed: [
    { '@type': 'City', name: 'Bratislava' },
    { '@type': 'AdministrativeArea', name: 'Bratislavský kraj' },
  ],
  sameAs: ['https://www.facebook.com/lesenienaprenajom/'],
  priceRange: '€€',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <div className="min-h-screen bg-sand-50 text-ink">
          <SmoothScroll />
          <SiteHeader />
          <div className="pt-20 lg:pt-24">{children}</div>
          <SiteFooter />
          <CookieConsent />
        </div>
      </body>
    </html>
  );
}
