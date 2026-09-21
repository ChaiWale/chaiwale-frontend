import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodCard } from '../components/ui/FoodCard';
import { RotatingHeroSection } from '../components/home/RotatingHeroSection';

export const metadata: Metadata = {
  title: 'Chaiwale | Authentic Kulhad Chai, Snacks & Institutional Catering Delhi NCR',
  description:
    'Sip, Bite, Repeat. Authentic Kulhad Chai, wholesome North Indian meals, street food snacks, and institutional catering across Delhi NCR.',
  alternates: {
    canonical: '/'
  }
};

// Server-side fetch — runs at build time / request time, no client JS needed
async function fetchFeaturedItems() {
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  try {
    const res = await fetch(`${BACKEND}/api/v1/menu/items`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
    return data.slice(0, 6);
  } catch {
    return [];
  }
}

async function fetchCategories() {
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  try {
    const res = await fetch(`${BACKEND}/api/v1/menu/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const rawFeaturedItems = await fetchFeaturedItems();
  const featuredItems = Array.isArray(rawFeaturedItems) ? rawFeaturedItems : [];
  const rawCategories = await fetchCategories();
  const categories = Array.isArray(rawCategories) ? rawCategories : [];
  // Build a category id → name map for display
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div>
      {/* 1. Rotating Match & Move Hero Section */}
      <RotatingHeroSection />

      {/* 2. Handpicked Kitchen Favorites */}
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
              Explore All 75+ Items →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '16px'
            }}
          >
            {featuredItems.length > 0 ? featuredItems.map((item) => (
              <FoodCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={Number(item.base_price)}
                category={catMap[item.category_id] || 'Chaiwale'}
                isVeg={item.is_veg}
                isEgg={item.is_egg}
                spiceLevel={item.spice_level}
                tags={item.tags}
                variants={item.variants}
                description={item.description || undefined}
                imageSrc={item.image_path || undefined}
              />
            )) : (
              <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '14px' }}>Menu loading... <Link href="/menu" style={{ color: 'var(--cw-color-primary)' }}>View full menu →</Link></p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
