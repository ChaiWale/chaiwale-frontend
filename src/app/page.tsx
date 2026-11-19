import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RotatingHeroSection } from '../components/home/RotatingHeroSection';
import { HomeFeaturedItems } from '../components/home/HomeFeaturedItems';

export const metadata: Metadata = {
  title: 'Chaiwale | Best Kulhad Chai, Biryani, Non-Veg & Bhandara Catering in Rohini Delhi',
  description:
    'Sip, Bite, Repeat. Authentic Kulhad Chai, Champaran Handi Chicken, Ahuna Mutton, Dum Biryani, North Indian Thalis & Community Bhandara Catering across Rohini Sector 2, Sector 3, Pitampura & Delhi NCR.',
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

      {/* 2. Local Highlights & Catering Hub for Rohini Sector 2, 3 & Delhi NCR */}
      <section style={{ padding: 'var(--cw-space-12) 0', backgroundColor: 'var(--cw-color-surface-muted)', borderTop: '1px solid var(--cw-color-border)' }}>
        <div className="cw-container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--cw-space-8)' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cw-color-primary)', letterSpacing: '0.08em' }}>
              Rohini&apos;s Desi Food & Catering Hub
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginTop: '6px', color: 'var(--cw-color-dark)' }}>
              Authentic Flavors, Hot Kulhad Chai & Bulk Orders
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--cw-color-text-muted)', marginTop: '8px', lineHeight: 1.6 }}>
              From fast doorstep delivery in Rohini Sector 2, Sector 3 & Pitampura to large-scale Community Bhandaras and corporate bulk catering across Delhi NCR.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: 'var(--cw-space-8)' }}>
            {/* Card 1: Non-Veg & Biryani */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid var(--cw-color-border-light)' }}>
              <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'var(--cw-color-nonveg-bg)', color: 'var(--cw-color-nonveg)', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
                Non-Veg Specialties
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--cw-color-dark)', marginBottom: '8px' }}>
                Handi Curries & Dum Biryani
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--cw-color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Relish slow-cooked Champaran Handi Chicken, tender Ahuna Mutton, fragrant Chicken & Mutton Dum Biryanis, and protein-packed Egg Curries crafted with rich, ground spices.
              </p>
              <Link href="/menu" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cw-color-primary)' }}>
                Order Non-Veg Online &rarr;
              </Link>
            </div>

            {/* Card 2: Community Bhandara & Party Orders */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid var(--cw-color-border-light)' }}>
              <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'var(--cw-color-accent-subtle)', color: 'var(--cw-color-accent)', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
                Bhandara & Bulk Catering
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--cw-color-dark)', marginBottom: '8px' }}>
                Community Bhandara & Party Orders
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--cw-color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Pure, sattvic, and hygienic bulk meals for Mandir Bhandaras (Poori Sabzi, Halwa, Kheer) and private celebrations. Reliable timing and live kitchen service across Delhi NCR.
              </p>
              <Link href="/catering" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cw-color-primary)' }}>
                Request Catering Quote &rarr;
              </Link>
            </div>

            {/* Card 3: Thalis & Kulhad Chai */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid var(--cw-color-border-light)' }}>
              <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'var(--cw-color-veg-bg)', color: 'var(--cw-color-veg)', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
                Everyday Comfort Food
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--cw-color-dark)', marginBottom: '8px' }}>
                Royal Thalis & Kulhad Chai
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--cw-color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Wholesome budget thalis, steaming clay-cup Kulhad Chai, piping hot Samosas, Bun Maska, and fresh street snacks delivered piping hot directly to your office or home.
              </p>
              <Link href="/menu" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cw-color-primary)' }}>
                View Thali Combinations &rarr;
              </Link>
            </div>
          </div>

          {/* Local Area Served Badges */}
          <div style={{ textAlign: 'center', paddingTop: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cw-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
              Direct Fast Delivery & Catering Service Areas:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {[
                'Rohini Sector 2',
                'Rohini Sector 3',
                'DC Chowk',
                'M2K Rohini',
                'Prashant Vihar',
                'Rohini Sector 7 & 8',
                'Rohini Sector 9 & 11',
                'Pitampura',
                'Shalimar Bagh',
                'North West Delhi'
              ].map((locality) => (
                <span
                  key={locality}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--cw-color-border)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: 'var(--cw-color-text-muted)',
                    fontWeight: 500
                  }}
                >
                  📍 {locality}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
