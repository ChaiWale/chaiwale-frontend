import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat';
import { DeliveryAppsFloat } from '../components/ui/DeliveryAppsFloat';
import { QuickOrderModal } from '../components/ui/QuickOrderModal';

export const viewport: Viewport = {
  themeColor: '#6F432A',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chaiwale.co.in'),
  title: {
    default: 'Chaiwale | Best Kulhad Chai, Biryani, Non-Veg & North Indian Food in Rohini Delhi | Order Online',
    template: '%s | Chaiwale Rohini Delhi'
  },
  description:
    'Chaiwale Rohini Sector 3 — Authentic Kulhad Chai, Chicken & Mutton Dum Biryani, Champaran Handi Meat, North Indian Thali, Momos, Burger & Street Food. Fast home delivery in Rohini Sector 2, Sector 3, Pitampura, Shalimar Bagh & North Delhi. Community Bhandara booking, party bulk orders & corporate catering available.',
  keywords: [
    // Brand
    'Chaiwale', 'Chaiwale Rohini', 'Chaiwale Delhi', 'chaiwale.co.in', 'Chaiwale restaurant', 'Chaiwale near me',
    // Rohini Specific Local Keywords (Sector 2, Sector 3, DC Chowk)
    'rohini sec 2', 'rohini sector 2 food', 'rohini sec 2 non veg', 'rohini sec 2 biryani', 'food delivery rohini sec 2',
    'rohini sector 3 food', 'rohini sec 3 food delivery', 'dc chowk rohini food', 'm2k rohini food', 'prashant vihar food',
    'pitampura food delivery', 'shalimar bagh food', 'north delhi food delivery', 'food near me rohini',
    // Non-Veg & Meat Specials
    'non veg food rohini', 'non veg restaurant in rohini', 'best non veg near me', 'non veg food near me',
    'chicken near me rohini', 'chicken curry rohini', 'butter chicken rohini', 'champaran chicken delhi',
    'champaran meat rohini', 'ahuna mutton rohini', 'bihari ahuna mutton delhi', 'mutton curry rohini',
    'fish curry rohini', 'egg curry rohini', 'chicken thali rohini', 'non veg thali rohini',
    // Biryani
    'biryani in rohini', 'dum biryani rohini', 'chicken biryani rohini', 'mutton biryani rohini',
    'biryani near me rohini', 'best biryani in rohini delhi', 'dum biryani delhi',
    'chicken dum biryani rohini', 'mutton dum biryani delhi', 'biryani rohini sector 2',
    // Catering & Bhandara
    'bhandara catering delhi', 'bhandara rohini', 'bhandara food booking', 'poori sabzi bhandara delhi',
    'halwa poori bhandara', 'community bhandara catering', 'catering rohini', 'catering delhi ncr',
    'party order rohini', 'bulk food order delhi', 'group food order rohini', 'birthday party catering rohini',
    'kitty party food rohini', 'corporate catering rohini', 'office lunch rohini', 'corporate lunch delivery rohini',
    // Chai & Beverages
    'kulhad chai rohini', 'chai near me rohini', 'best chai in rohini', 'tea cafe rohini delhi',
    'kadak chai rohini', 'kulhad chai delhi', 'chai delivery rohini',
    // Thali & Meals
    'thali in rohini', 'north indian thali rohini', 'veg thali rohini', 'rajma chawal rohini',
    'chhole chawal rohini', 'dal chawal rohini', 'dal makhani rohini', 'paneer rohini',
    'north indian food rohini', 'north indian restaurant rohini',
    // Snacks & Street Food
    'litti chokha rohini', 'litti chokha delhi', 'litti chokha near me',
    'street food rohini', 'chaat rohini', 'samosa rohini', 'bread pakoda rohini',
    'momos rohini', 'momos near me rohini', 'burger rohini', 'sandwich rohini', 'paratha rohini',
    // General Order Searches
    'order food online rohini', 'best restaurant rohini delhi', 'zomato rohini', 'chaiwale zomato',
    'cafe near me rohini', 'takeaway rohini sector 3'
  ],
  authors: [{ name: 'Chaiwale' }],
  creator: 'Chaiwale',
  publisher: 'Chaiwale',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Chaiwale | Best Kulhad Chai, Biryani, Non-Veg & North Indian Food in Rohini, Delhi',
    description:
      'Sip, Bite, Repeat. Authentic Kulhad Chai, Chicken & Mutton Dum Biryani, Champaran Handi Meat, North Indian Thali, Momos, Burger & Street Food in Rohini, Delhi. Fast delivery in Rohini Sector 2, 3 & North Delhi. Community Bhandara & party bulk orders available.',
    url: 'https://chaiwale.co.in',
    siteName: 'Chaiwale',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Chaiwale Rohini Delhi — Best Kulhad Chai, Biryani & North Indian Meals'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chaiwale | Best Kulhad Chai, Biryani & Non-Veg Food in Rohini, Delhi',
    description:
      'Authentic Kulhad Chai, Chicken Dum Biryani, Champaran Handi Meat, North Indian Thali, and Bhandara Catering across Rohini Sector 2, 3 & Delhi NCR.',
    images: ['https://chaiwale.co.in/assets/chaiwale-logo.jpeg']
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
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
        caption: 'Chaiwale Official Logo'
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
        'https://www.swiggy.com/menu/1476567?source=sharing',
        'https://www.toingit.com/menu/1476567',
        'https://ownly.food/app/brand/BR505023',
        'https://wa.me/919310112564',
        'https://www.instagram.com/chaiwaleofficial/'
      ]
    },
    {
      '@type': ['Restaurant', 'FoodEstablishment'],
      '@id': 'https://chaiwale.co.in/#restaurant',
      name: 'Chaiwale',
      image: 'https://chaiwale.co.in/assets/chaiwale-logo.jpeg',
      description:
        'Chaiwale — Rohini\'s premier destination for authentic Kulhad Chai, Chicken & Mutton Dum Biryani, Champaran Ahuna Handi Meat, North Indian Thali, Momos, Burger & Street Food. Serving Rohini Sector 2, Sector 3, Pitampura, Shalimar Bagh & North Delhi. Community Bhandara catering, corporate bulk meals & party orders available.',
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
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 2, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 3, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 1, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 7, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 8, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 9, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Rohini Sector 11, Delhi' },
        { '@type': 'AdministrativeArea', name: 'DC Chowk, Rohini' },
        { '@type': 'AdministrativeArea', name: 'Prashant Vihar, Rohini' },
        { '@type': 'AdministrativeArea', name: 'Pitampura, Delhi' },
        { '@type': 'AdministrativeArea', name: 'Shalimar Bagh, Delhi' },
        { '@type': 'AdministrativeArea', name: 'North West Delhi' },
        { '@type': 'AdministrativeArea', name: 'Delhi NCR' }
      ],
      url: 'https://chaiwale.co.in',
      telephone: '+919310112564',
      servesCuisine: [
        'North Indian',
        'Non-Veg Food',
        'Biryani',
        'Dum Biryani',
        'Chicken Biryani',
        'Mutton Biryani',
        'Champaran Handi Chicken',
        'Ahuna Mutton',
        'Butter Chicken',
        'Egg Curry',
        'Litti Chokha',
        'Bihari Food',
        'Chai',
        'Kulhad Chai',
        'Thali',
        'Momos',
        'Street Food',
        'Fast Food',
        'Bhandara Catering',
        'Party Orders'
      ],
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
          urlTemplate: 'https://chaiwale.co.in/menu',
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
          closes: '23:30'
        }
      ]
    },
    {
      '@type': 'Service',
      '@id': 'https://chaiwale.co.in/#catering-service',
      name: 'Bhandara, Corporate & Bulk Party Catering by Chaiwale',
      serviceType: 'Catering Service',
      provider: { '@id': 'https://chaiwale.co.in/#restaurant' },
      areaServed: [
        'Rohini Sector 2',
        'Rohini Sector 3',
        'Rohini',
        'Pitampura',
        'North Delhi',
        'Delhi NCR'
      ],
      description:
        'Authentic community Bhandara food catering (crispy poori, aloo rasedar sabzi, halwa, kheer for 50 to 1000+ people), corporate bulk lunch boxes, and high-tea party snack platters across Rohini & Delhi NCR.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://chaiwale.co.in/catering'
      }
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
        {/* Local Geo Meta Tags for Google & Local Search Engines */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Rohini Sector 2, Rohini Sector 3, Delhi" />
        <meta name="geo.position" content="28.7041;77.1025" />
        <meta name="ICBM" content="28.7041, 77.1025" />
        <link rel="manifest" href="/manifest.webmanifest" />

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
        <DeliveryAppsFloat />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
