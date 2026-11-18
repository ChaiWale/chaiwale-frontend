import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Menu — Biryani, Litti Chokha, Thali, Chai & More | Order Online Rohini Delhi',
  description:
    'Explore the complete Chaiwale menu — Chicken & Mutton Dum Biryani, Litti Chokha, North Indian Thali, Kulhad Chai, Momos, Burgers, Paratha, Street Food & more. Fast home delivery across Rohini, Pitampura, Shalimar Bagh & North Delhi. Party orders, bulk orders & corporate catering available.',
  keywords: [
    'chaiwale menu', 'chaiwale rohini menu', 'biryani menu rohini', 'chicken biryani order online rohini',
    'mutton biryani order rohini', 'dum biryani near me', 'litti chokha rohini', 'litti chokha order online',
    'north indian thali rohini', 'veg thali rohini', 'chicken thali rohini', 'kulhad chai online order',
    'momos rohini', 'burger rohini', 'paratha rohini', 'street food rohini', 'party order rohini',
    'bulk food order rohini', 'corporate lunch rohini', 'food delivery rohini sector 3',
    'order food online rohini', 'chaiwale online order'
  ],
  alternates: {
    canonical: '/menu'
  },
  openGraph: {
    title: 'Full Menu — Biryani, Litti Chokha, Thali, Chai & More | Chaiwale Rohini',
    description:
      'Order Chicken & Mutton Dum Biryani, Litti Chokha, North Indian Thali, Kulhad Chai, Momos & more from Chaiwale Rohini. Fast delivery across North Delhi. Party & bulk orders welcome.',
    url: 'https://chaiwale.co.in/menu',
    images: ['/assets/chaiwale-logo.jpeg']
  }
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
