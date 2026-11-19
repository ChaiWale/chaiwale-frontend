import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Menu — Biryani, Non-Veg, Thali, Chai & Snacks | Order Online Rohini Sector 2 & 3 Delhi',
  description:
    'Explore the complete Chaiwale menu — Champaran Handi Chicken, Ahuna Mutton, Chicken & Mutton Dum Biryani, Royal Thalis, Kulhad Chai, Litti Chokha, Momos, Burgers & Street Food. Fast home delivery in Rohini Sector 2, Sector 3, Pitampura, Shalimar Bagh & North Delhi. Party & bulk orders available.',
  keywords: [
    'rohini sec 2', 'rohini sector 2 food', 'rohini sec 2 non veg', 'non veg food rohini',
    'champaran chicken rohini', 'ahuna mutton rohini', 'chicken curry rohini', 'mutton curry rohini',
    'chicken biryani rohini', 'mutton biryani rohini', 'dum biryani near me', 'best biryani in rohini',
    'north indian thali rohini', 'veg thali rohini', 'chicken thali rohini', 'anda thali rohini',
    'chaiwale menu', 'chaiwale rohini menu', 'kulhad chai online order', 'litti chokha rohini',
    'momos rohini', 'burger rohini', 'paratha rohini', 'street food rohini', 'bhandara catering delhi',
    'party order rohini', 'bulk food order rohini sector 2', 'food delivery rohini sector 2',
    'food delivery rohini sector 3', 'order food online rohini', 'chaiwale online order'
  ],
  alternates: {
    canonical: '/menu'
  },
  openGraph: {
    title: 'Full Menu — Biryani, Non-Veg, Thali, Chai & Snacks | Chaiwale Rohini Sector 2 & 3',
    description:
      'Order Champaran Handi Chicken, Ahuna Mutton, Dum Biryani, Royal Thalis, Kulhad Chai, Momos & more from Chaiwale Rohini. Fast delivery in Rohini Sector 2, Sector 3 & North Delhi.',
    url: 'https://chaiwale.co.in/menu',
    images: [
      {
        url: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/chaiwale-assets/chaiwale-logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Chaiwale Rohini Full Menu - Biryani, Non-Veg, Thali & Kulhad Chai'
      }
    ]
  }
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
