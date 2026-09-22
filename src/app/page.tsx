import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RotatingHeroSection } from '../components/home/RotatingHeroSection';
import { HomeFeaturedItems } from '../components/home/HomeFeaturedItems';

export const metadata: Metadata = {
  title: 'Chaiwale | Authentic Kulhad Chai, Snacks & Institutional Catering Delhi NCR',
  description:
    'Sip, Bite, Repeat. Authentic Kulhad Chai, wholesome North Indian meals, street food snacks, and institutional catering across Delhi NCR.',
  alternates: {
    canonical: '/'
  }
};


export default async function HomePage() {
  return (
    <div>
      {/* 1. Rotating Match & Move Hero Section */}
      <RotatingHeroSection />

      <section style={{ padding: 'var(--cw-space-12) 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--cw-color-border-light)' }}>
        <div className="cw-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--cw-space-8)', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cw-color-accent)', letterSpacing: '0.06em' }}>
                Quick Food Ordering
              </span>
              <h2 style={{ fontSize: '30px', fontWeight: 800, marginTop: '4px' }}>
                Handpicked Favorites from Kitchen
              </h2>
            </div>
            <Link
              href="/menu"
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--cw-color-primary)',
                textDecoration: 'underline'
              }}
            >
              Explore All 75+ Items &rarr;
            </Link>
          </div>

          <HomeFeaturedItems />
        </div>
      </section>
    </div>
  );
}
