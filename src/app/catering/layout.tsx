import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhandara Catering, Party Orders & Corporate Meals in Delhi NCR | Chaiwale Rohini',
  description:
    'Authentic Community Bhandara Catering (Poori Sabzi, Halwa, Kheer), Bulk Party Orders, and Corporate Office Lunch Boxes by Chaiwale Delhi NCR. Pure, hygienic & scalable food services for Rohini Sector 2, Sector 3, Pitampura and all of Delhi NCR.',
  keywords: [
    'bhandara catering delhi', 'bhandara rohini', 'bhandara food booking', 'community bhandara catering',
    'poori sabzi bhandara', 'halwa poori bhandara delhi', 'mandir bhandara food', 'party order rohini',
    'party orders rohini sector 2', 'bulk food order delhi', 'corporate catering rohini', 'office lunch boxes delhi',
    'rohini sec 2 catering', 'bulk catering north delhi', 'birthday party food order rohini'
  ],
  alternates: {
    canonical: '/catering'
  },
  openGraph: {
    title: 'Bhandara Catering, Party Orders & Corporate Meals | Chaiwale Rohini Delhi',
    description: 'Fresh, hygienic, scalable catering solutions for community bhandaras, corporate offices, and party celebrations across Rohini Sector 2 & Delhi NCR.',
    url: 'https://chaiwale.co.in/catering',
    images: [
      {
        url: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/chaiwale-assets/chaiwale-logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Chaiwale Bhandara Catering & Party Orders Delhi NCR'
      }
    ]
  }
};

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
