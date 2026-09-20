import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Order Tracker',
  description:
    'Track your live Chaiwale food delivery or takeaway order in real-time from our kitchen in Rohini, Delhi.',
  alternates: {
    canonical: '/track'
  },
  openGraph: {
    title: 'Live Order Tracker | Chaiwale',
    description: 'Real-time order status tracking directly connected to the Chaiwale kitchen.',
    url: 'https://chaiwale.co.in/track',
    images: ['/assets/chaiwale-logo.jpeg']
  }
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
