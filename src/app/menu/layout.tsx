import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu & Online Ordering',
  description:
    'Order fresh Kulhad Chai, hot North Indian parathas, wholesome thalis, fresh bun maska, and snacks online from Chaiwale Rohini.',
  alternates: {
    canonical: '/menu'
  },
  openGraph: {
    title: 'Menu & Online Ordering | Chaiwale',
    description: 'Explore authentic Kulhad Chai, parathas, snacks, and combo meals. Fast delivery across Rohini and North Delhi.',
    url: 'https://chaiwale.co.in/menu',
    images: ['/assets/chaiwale-logo.jpeg']
  }
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
