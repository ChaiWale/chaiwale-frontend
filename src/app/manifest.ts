import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chaiwale — Best Kulhad Chai, Biryani, Non-Veg & North Indian Food Rohini Delhi',
    short_name: 'Chaiwale',
    description:
      'Authentic Kulhad Chai, Chicken Dum Biryani, Champaran Handi Meat, North Indian Thali, Snacks & Bhandara Catering in Rohini Sector 2, Sector 3 & Delhi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF5EE',
    theme_color: '#6F432A',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  };
}
