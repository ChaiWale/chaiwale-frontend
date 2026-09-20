import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat';

export const viewport: Viewport = {
  themeColor: '#6F432A',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chaiwale.co.in'),
  title: {
    default: 'Chaiwale | Authentic Kulhad Chai, North Indian Meals & Catering in Delhi NCR',
    template: '%s | Chaiwale'
  },
  description:
    'Chaiwale - Authentic Kulhad Chai, fresh North Indian meals, snacks, corporate office lunch thalis, and community bhandara catering across Rohini and Delhi NCR.',
  keywords: [
    'Chaiwale',
    'Kulhad Chai Delhi',
    'Best Tea Cafe Rohini',
    'Corporate Lunch Catering',
    'Office Meal Subscription Rohini',
    'Bhandara Catering Delhi',
    'Bulk High-Tea Boxes',
    'North Indian Thali Rohini',
    'Snacks Delivery Delhi NCR'
  ],
  authors: [{ name: 'Chaiwale' }],
  creator: 'Chaiwale',
  publisher: 'Chaiwale',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Chaiwale | Authentic Kulhad Chai, North Indian Meals & Catering',
    description:
      'Sip, Bite, Repeat. Authentic Kulhad Chai, wholesome North Indian meals, and institutional catering across Delhi NCR.',
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
    title: 'Chaiwale | Authentic Kulhad Chai, North Indian Meals & Catering',
    description:
      'Sip, Bite, Repeat. Authentic Kulhad Chai, wholesome North Indian meals, and catering across Delhi NCR.',
    images: ['/assets/chaiwale-logo.jpeg']
  },
  icons: {
    icon: '/assets/chaiwale-logo.jpeg',
    shortcut: '/assets/chaiwale-logo.jpeg',
    apple: '/assets/chaiwale-logo.jpeg'
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
        'https://wa.me/919310112564'
      ]
    },
    {
      '@type': 'Restaurant',
      '@id': 'https://chaiwale.co.in/#restaurant',
      name: 'Chaiwale',
      image: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
      description:
        'Authentic Kulhad Chai, fresh North Indian meals, street food snacks, and institutional catering in Delhi NCR.',
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
      servesCuisine: ['North Indian', 'Tea', 'Snacks', 'Street Food', 'Beverages'],
      priceRange: '₹',
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
        <WhatsAppFloat />
      </body>
    </html>
  );
}
