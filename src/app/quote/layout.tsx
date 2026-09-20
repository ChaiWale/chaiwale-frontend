import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Custom Catering Quote',
  description:
    'Get a tailored quote for your office lunch, institutional catering, or bulk snack order from Chaiwale. Custom menu packages and flexible delivery across Delhi NCR.',
  alternates: {
    canonical: '/quote'
  },
  openGraph: {
    title: 'Request a Custom Catering Quote | Chaiwale',
    description: 'Instant custom catering estimates for corporate meals, events, and bulk orders.',
    url: 'https://chaiwale.co.in/quote',
    images: ['/assets/chaiwale-logo.jpeg']
  }
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
