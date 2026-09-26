import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat';
import { ZomatoFloat } from '../components/ui/ZomatoFloat';
import { QuickOrderModal } from '../components/ui/QuickOrderModal';

export const viewport: Viewport = {
  themeColor: '#6F432A',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chaiwale.co.in'),
  title: {
    default: 'Chaiwale | Best Kulhad Chai & North Indian Food in Rohini, Delhi | Order Online',
    template: '%s | Chaiwale Rohini'
  },
  description:
    'Chaiwale Rohini (Sector 3) - Authentic Kulhad Chai, fresh North Indian meals, snacks, thalis, and corporate catering. Order online on Zomato or visit us in Rohini, Delhi NCR!',
  keywords: [
    'Chaiwale',
    'Chaiwale Rohini',
    'Chaiwale Delhi',
    'chaiwale.co.in',
    'food in rohini',
    'best food in rohini',
    'food near me rohini',
    'best chai near me',
    'chai near me',
    'tea cafe rohini',
    'best cafe in rohini',
    'cafe near me',
    'restaurants in rohini',
    'north indian food rohini',
    'kulhad chai delhi',
    'order food online rohini',
    'thali in rohini',
    'office lunch thali rohini',
    'bhandara catering delhi',
    'corporate catering rohini',
    'chaiwale zomato'
  ],
  authors: [{ name: 'Chaiwale' }],
  creator: 'Chaiwale',
  publisher: 'Chaiwale',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Chaiwale | Best Kulhad Chai & North Indian Food in Rohini, Delhi',
    description:
      'Sip, Bite, Repeat. Authentic Kulhad Chai, wholesome North Indian meals, snacks, and catering in Rohini & across Delhi NCR.',
    url: 'https://chaiwale.co.in',
    siteName: 'Chaiwale',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/chaiwale-logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Chaiwale Brand Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chaiwale | Best Kulhad Chai & North Indian Food in Rohini, Delhi',
    description:
      'Authentic Kulhad Chai, wholesome North Indian meals, and catering across Rohini & Delhi NCR.',
    images: ['/assets/chaiwale-logo.jpeg']
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/chaiwale-logo.jpeg', sizes: '512x512', type: 'image/jpeg' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/assets/chaiwale-logo.jpeg' }
    ],
    shortcut: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://chaiwale.co.in/#organization',
      name: 'Chaiwale',
      url: 'https://chaiwale.co.in',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://chaiwale.co.in/#logo',
        url: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
        contentUrl: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
        caption: 'Chaiwale Brand Logo'
      },
      image: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
      telephone: '+919310112564',
      email: 'support@chaiwale.co.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Upper Ground Floor, Vardhman Grand Plaza, G-31, M2K Rd, Mangalam Place, Sector 03',
        addressLocality: 'Rohini',
        addressRegion: 'Delhi',
        postalCode: '110085',
        addressCountry: 'IN'
      },
      sameAs: [
        'https://zomato.onelink.me/xqzv/zmfs3x6y',
        'https://wa.me/919310112564'
      ]
    },
    {
      '@type': 'Restaurant',
      '@id': 'https://chaiwale.co.in/#restaurant',
      name: 'Chaiwale',
      image: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
      description:
        'Authentic Kulhad Chai, fresh North Indian meals, street food snacks, thalis, and catering in Rohini, Delhi NCR.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Upper Ground Floor, Vardhman Grand Plaza, G-31, M2K Rd, Mangalam Place, Sector 03',
        addressLocality: 'Rohini',
        addressRegion: 'Delhi',
        postalCode: '110085',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.7041,
        longitude: 77.1025
      },
      url: 'https://chaiwale.co.in',
      telephone: '+919310112564',
      servesCuisine: ['North Indian', 'Chai', 'Tea', 'Snacks', 'Street Food', 'Thali', 'Beverages'],
      priceRange: '₹',
      hasMenu: 'https://chaiwale.co.in/menu',
      sameAs: [
        'https://zomato.onelink.me/xqzv/zmfs3x6y',
        'https://wa.me/919310112564'
      ],
      potentialAction: {
        '@type': 'OrderAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://zomato.onelink.me/xqzv/zmfs3x6y',
          inLanguage: 'en-IN',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform'
          ]
        },
        deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '23:00'
        }
      ]
    }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <QuickOrderModal />
        <ZomatoFloat />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
