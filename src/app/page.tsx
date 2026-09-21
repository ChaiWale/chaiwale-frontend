import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FoodCard } from '../components/ui/FoodCard';
import { ServicePillars } from '../components/ui/ServicePillars';
import { DynamicBhandaraSection } from '../components/home/DynamicBhandaraSection';

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

async function fetchPromoBanners() {
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  try {
    const res = await fetch(`${BACKEND}/api/v1/config/banners`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
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

  // Dynamic Homepage Promo Banners & Ads from Settings
  const rawBanners = await fetchPromoBanners();
  const allBanners = Array.isArray(rawBanners) && rawBanners.length > 0 ? rawBanners : [];
  const activeBanners = allBanners.filter((b: any) => b.isActive !== false);

  const bhandaraBanner = activeBanners.find((b: any) => b.id === 'bhandara') || allBanners.find((b: any) => b.id === 'bhandara');
  const mealsBanner = activeBanners.find((b: any) => b.id === 'monthly-meals') || allBanners.find((b: any) => b.id === 'monthly-meals');
  const daawatBanner = activeBanners.find((b: any) => b.id === 'moms-daawat') || allBanners.find((b: any) => b.id === 'moms-daawat');

  const customBanners = activeBanners.filter(
    (b: any) => b.id !== 'bhandara' && b.id !== 'monthly-meals' && b.id !== 'moms-daawat'
  );

  const resolveImg = (src?: string) => {
    if (!src) return '/assets/images/chai.jpg';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    if (src.startsWith('/assets/')) return src;
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    if (src.startsWith('/')) return `${BACKEND}${src}`;
    return `${BACKEND}/api/v1/media/${src}`;
  };

  return (
    <div>
      {/* 1. Warm Cream / Airy Hero Section matching Storyboard Panel 2 */}
      <section
        style={{
          backgroundColor: '#FAF5EE',
          borderBottom: '1px solid #EAE0D2',
          paddingTop: 'var(--cw-space-12)',
          paddingBottom: 'var(--cw-space-16)',
          position: 'relative'
        }}
      >
        <div className="cw-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: 'var(--cw-space-8)'
            }}
          >
            {/* Left Hero Column */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  borderRadius: 'var(--cw-radius-pill)',
                  backgroundColor: '#F3E9DD',
                  border: '1px solid #E5D5C3',
                  color: 'var(--cw-color-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                Rohini's Favourite Cafe
              </div>

              <h1
                style={{
                  fontSize: 'clamp(36px, 4.5vw, 54px)',
                  fontWeight: 800,
                  color: 'var(--cw-color-dark)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px'
                }}
              >
                Good Food For Every Occasion
              </h1>

              <p
                style={{
                  fontSize: 'clamp(17px, 2vw, 20px)',
                  color: 'var(--cw-color-text-muted)',
                  lineHeight: 1.5,
                  marginBottom: '28px',
                  maxWidth: '520px'
                }}
              >
                From a cup of chai to a feast for hundreds.
              </p>

              {/* Approved Dual CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <Link
                  href="/menu"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--cw-color-primary)',
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: 'var(--cw-radius-md)',
                    fontFamily: 'var(--cw-font-heading)',
                    fontSize: '16px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(111, 67, 42, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Order Online →
                </Link>

                <Link
                  href="/catering"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--cw-color-primary)',
                    border: '1.5px solid var(--cw-color-primary)',
                    padding: '14px 24px',
                    borderRadius: 'var(--cw-radius-md)',
                    fontFamily: 'var(--cw-font-heading)',
                    fontSize: '16px',
                    fontWeight: 700,
                    transition: 'all 0.15s ease'
                  }}
                >
                  Get Catering Quote
                </Link>
              </div>

              {/* Bullet Proof Points */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  fontSize: '13px',
                  color: 'var(--cw-color-text-muted)',
                  fontWeight: 500
                }}
              >
                <span>✓ Pure Veg & Egg Delicacies</span>
                <span>✓ Direct Rohini Delivery</span>
                <span>✓ Scalable Mass Feasts</span>
              </div>
            </div>

            {/* Right Hero Column: Organic Circular Food Composition */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: '340px'
              }}
            >
              {/* Primary Circular Hero Plate (Chai) */}
              <div
                style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '6px solid #FFFFFF',
                  boxShadow: '0 16px 36px rgba(111, 67, 42, 0.16)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <img
                  src="/assets/images/chai.jpg"
                  alt="Chaiwale Authentic Kulhad Chai"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Secondary Floating Circular Plate (Samosa) */}
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '5px solid #FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                  position: 'absolute',
                  bottom: '10px',
                  left: '20px',
                  zIndex: 3
                }}
              >
                <img
                  src="/assets/images/samosa.jpg"
                  alt="Crisp Hot Samosas"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Tertiary Floating Circular Plate (Bun Maska) */}
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.1)',
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                  zIndex: 1
                }}
              >
                <img
                  src="/assets/images/bun-maska.jpg"
                  alt="Fresh Bun Maska"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Warm decorative badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '30px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--cw-color-border)',
                  borderRadius: 'var(--cw-radius-pill)',
                  padding: '8px 16px',
                  boxShadow: 'var(--cw-shadow-sm)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--cw-color-primary)',
                  zIndex: 4
                }}
              >
                100% Fresh Ingredients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Primary Service Pillars (Panel 2) */}
      <section style={{ backgroundColor: 'var(--cw-color-canvas)', paddingBottom: 'var(--cw-space-12)' }}>
        <div className="cw-container">
          <ServicePillars />
        </div>
      </section>

      {/* 3. Favorite Dishes - Horizontal Row Ordering (Panel 3) */}
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

      {/* 4. Bhandara & Seva Meals Section (Dynamic & Interactive) */}
      {bhandaraBanner && bhandaraBanner.isActive !== false && (
        <DynamicBhandaraSection bannerData={bhandaraBanner} />
      )}

      {/* 5. Monthly Meal Plans & PG Tiffin Section */}
      {mealsBanner && mealsBanner.isActive !== false && (
        <section style={{ padding: '60px 0', backgroundColor: '#FAF5EE' }}>
          <div className="cw-container">
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center'
              }}
            >
              <div style={{ padding: '36px 32px' }}>
                <div style={{ display: 'inline-block', backgroundColor: '#D97706', color: '#FFFFFF', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                  {mealsBanner.badge || '3-Day Trial Meal @ ₹79 Only!'}
                </div>
                <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#1E2328', lineHeight: 1.2, margin: '0 0 12px' }}>
                  {mealsBanner.title || 'Good Food For A Better You'}
                </h2>
                <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {mealsBanner.description || 'Ghar jaisa khana, ab door nahi. For PGs, Working Professionals, Bachelors and Anyone Living Away from Home in Delhi NCR.'}
                </p>

                {/* 3 Plans Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px', textAlign: 'center', background: '#F9FAFB' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280' }}>BASIC PLAN</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#111827', margin: '4px 0' }}>₹3,499<span style={{ fontSize: '11px', fontWeight: 500 }}>/mo</span></div>
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Lunch + Dinner</div>
                  </div>
                  <div style={{ border: '2px solid #D97706', borderRadius: '10px', padding: '12px', textAlign: 'center', background: '#FFFBEB' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#D97706' }}>MOST POPULAR</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#B45309', margin: '4px 0' }}>₹5,499<span style={{ fontSize: '11px', fontWeight: 500 }}>/mo</span></div>
                    <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600 }}>B'fast + Lunch + Dinner</div>
                  </div>
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px', textAlign: 'center', background: '#F9FAFB' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280' }}>PREMIUM PLAN</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#111827', margin: '4px 0' }}>₹6,999<span style={{ fontSize: '11px', fontWeight: 500 }}>/mo</span></div>
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Full Day + Specials</div>
                  </div>
                </div>

                <a
                  href={mealsBanner.ctaLink?.startsWith('http') ? mealsBanner.ctaLink : `https://wa.me/${mealsBanner.whatsappNumber || '918800410441'}?text=${encodeURIComponent(mealsBanner.whatsappText || 'TRIAL')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                  }}
                >
                  {mealsBanner.ctaText || 'WhatsApp "TRIAL" to 88004 10441'}
                </a>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '340px' }}>
                <img
                  src={resolveImg(mealsBanner.image)}
                  alt={mealsBanner.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Mom's Daawat Chicken & Mutton Spotlight */}
      {daawatBanner && daawatBanner.isActive !== false && (
        <section style={{ padding: '60px 0', backgroundColor: '#1C1917', color: '#FFFFFF' }}>
          <div className="cw-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {daawatBanner.badge || 'A Unit of Chaiwale'}
                </span>
                <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, margin: '8px 0 16px' }}>
                  {daawatBanner.title || 'MOM’S DAAWAT'}
                </h2>
                <p style={{ color: '#D6D3D1', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {daawatBanner.description || 'Ghar Jaisa Swad • Dil Se Pakaya. Authentic Bihari Chicken & Mutton, Champaran Ahuna Handi, Cream Chicken, Lemon Chicken, Butter Chicken, and sizzling kebabs slow cooked in authentic earthen pots.'}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  <Link
                    href={daawatBanner.ctaLink || '/menu#moms-daawat'}
                    style={{
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '15px',
                      textDecoration: 'none'
                    }}
                  >
                    {daawatBanner.ctaText || "View Mom's Daawat Menu →"}
                  </Link>
                  <a
                    href={`https://wa.me/${daawatBanner.whatsappNumber || '918860909441'}?text=${encodeURIComponent(daawatBanner.whatsappText || "Hello, I want to order from Mom's Daawat")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '15px',
                      textDecoration: 'none'
                    }}
                  >
                    WhatsApp: {daawatBanner.whatsappNumber || '8860909441'}
                  </a>
                </div>
              </div>

              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                <img
                  src={resolveImg(daawatBanner.image)}
                  alt={daawatBanner.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Additional Custom Promotional Banners from Admin Settings */}
      {customBanners.length > 0 && customBanners.map((cb: any) => (
        <section key={cb.id} style={{ padding: '60px 0', backgroundColor: '#FAF5EE', borderTop: '1px solid #EAE0D2' }}>
          <div className="cw-container">
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center'
              }}
            >
              <div style={{ padding: '36px 32px' }}>
                {cb.badge && (
                  <div style={{ display: 'inline-block', backgroundColor: '#D97706', color: '#FFFFFF', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                    {cb.badge}
                  </div>
                )}
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1E2328', margin: '0 0 12px' }}>
                  {cb.title}
                </h2>
                <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px' }}>
                  {cb.description}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {cb.ctaLink && (
                    <Link
                      href={cb.ctaLink}
                      style={{
                        backgroundColor: 'var(--cw-color-primary)',
                        color: '#FFFFFF',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '14px',
                        textDecoration: 'none'
                      }}
                    >
                      {cb.ctaText || 'Learn More →'}
                    </Link>
                  )}
                  {cb.whatsappNumber && (
                    <a
                      href={`https://wa.me/${cb.whatsappNumber}?text=${encodeURIComponent(cb.whatsappText || 'Hello')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '14px',
                        textDecoration: 'none'
                      }}
                    >
                      WhatsApp Us
                    </a>
                  )}
                </div>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '300px' }}>
                <img
                  src={resolveImg(cb.image)}
                  alt={cb.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
