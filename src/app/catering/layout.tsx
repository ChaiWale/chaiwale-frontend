import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate & Event Catering Services',
  description:
    'Institutional catering by Chaiwale Delhi NCR: Corporate office lunch subscriptions, wholesome community Bhandara meals, and bulk high-tea boxes.',
  alternates: {
    canonical: '/catering'
  },
  openGraph: {
    title: 'Corporate & Event Catering Services | Chaiwale',
    description: 'Fresh, hygienic, scalable catering solutions for corporate offices, community bhandaras, and institutional events across Delhi NCR.',
    url: 'https://chaiwale.co.in/catering',
    images: ['/assets/chaiwale-logo.jpeg']
  }
};

export default function CateringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
