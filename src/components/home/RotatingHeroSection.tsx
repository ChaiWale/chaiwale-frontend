'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// ─── The 5 Slides Specification ──────────────────────────────────────────────
export interface HeroSlide {
  id: string;
  badge: string;
  tag: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  waCtaLabel: string;
  waCtaHref: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 'signature',
    badge: 'CHAIWALE SPECIAL',
    tag: 'Kadak Chai, Thick Shakes, Thalis & Bites',
    headline: 'Asli Kadak Chai, Shakes & Thalis,',
    headlineAccent: 'Har Craving Ka Shuddh Swad.',
    sub: 'Subah ki taaza adrak-elaichi chai, premium thick shakes, desi ghee homestyle thalis, grilled sandwiches aur kurkure snacks — 100% shuddh aur dil se taiyar.',
    primaryCtaLabel: 'Order Food Online',
    primaryCtaHref: '/menu',
    waCtaLabel: 'Order on WhatsApp',
    waCtaHref: 'https://wa.me/918800410441?text=Hi%20Chaiwale%2C%20I%20want%20to%20order%20from%20Chaiwale%20Signature%20Menu.',
    highlights: ['Pure Veg & Desi Ghee Thalis', 'Rich Thick Shakes & Chai', 'Direct Rohini Fast Delivery'],
    image: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/branding/hero/hero-signature.webp',
    imageAlt: 'Chaiwale Signature Kadak Chai, Thick Shakes, Grilled Sandwiches, Bun Maska and Snacks',
  },
  {
    id: 'bhandara',
    badge: 'PAVITRA BHANDARA SEVA',
    tag: '51 to 5,000+ Devotee Catering',
    headline: 'Pavitra Bhandara Seva,',
    headlineAccent: 'Shraddha Aur Shuddhata Ke Saath.',
    sub: 'Live Desi Ghee garam puris, halwai style aloo tamatar rasedar sabzi, kesari halwa & boondi raita — 100% shuddh satvik prasad for Puja, Jagran & Mandir feasts.',
    primaryCtaLabel: 'Get Bhandara Quote',
    primaryCtaHref: '/catering#bhandara',
    waCtaLabel: 'Calculate Thali Cost',
    waCtaHref: 'https://wa.me/918800410441?text=Hi%20Chaiwale%2C%20I%20want%20to%20book%20Bhandara%20Seva%20catering.',
    highlights: ['100% Satvik (No Onion/Garlic)', 'Live Garam Puris On-Site', 'Scalable Mass Feasts'],
    image: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/branding/hero/hero-bhandara.webp',
    imageAlt: 'Bhandara Seva Thali with Golden Puris and Kesari Halwa',
  },
  {
    id: 'corporate',
    badge: 'CORPORATE TEA & REFRESHMENTS',
    tag: 'Daily Office Dispensers & Platters',
    headline: 'Smart Office Chai Breaks,',
    headlineAccent: 'Piping Hot Chai Delivered Daily.',
    sub: 'Premium 4-hour heat retention dispensers me garam chai, cutting glasses, cocktail samosas aur cookies — office pantry me bina kisi jhanjhat ke.',
    primaryCtaLabel: 'Get Corporate Quote',
    primaryCtaHref: '/catering#corporate',
    waCtaLabel: 'Book Free Office Tasting',
    waCtaHref: 'https://wa.me/918800410441?text=Hi%20Chaiwale%2C%20I%20want%20corporate%20chai%20catering%20for%20our%20office.',
    highlights: ['4-Hour Heat Retention Dispensers', 'Fresh Cutting Cups & Snacks', 'Timely Daily Pantry Delivery'],
    image: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/branding/hero/hero-corporate.webp',
    imageAlt: 'Corporate Stainless Steel Thermal Chai Dispensers and Refreshments',
  },
  {
    id: 'mealplan',
    badge: 'DAILY HOMESTYLE MEAL PLAN',
    tag: 'Ghar Jaisa Swad Rozana',
    headline: 'Roz Ka Homestyle Khana,',
    headlineAccent: 'Bina Kisi Pareshani Ke.',
    sub: 'Piping hot phulke with desi ghee, daal tadka, seasonal sabzis, jeera rice & fresh salad — zero excess oil, bilkul ghar jaisa swad aur poshan.',
    primaryCtaLabel: 'View Meal Plans',
    primaryCtaHref: '/meal-plans',
    waCtaLabel: 'Start ₹79 Trial Meal',
    waCtaHref: 'https://wa.me/918800410441?text=Hi%20Chaiwale%2C%20I%20want%20to%20book%20a%20Trial%20Meal.',
    highlights: ['Different Homestyle Menu Daily', 'Zero Excess Oil & Preservatives', 'Pause or Cancel Anytime'],
    image: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/branding/hero/hero-mealplan.webp',
    imageAlt: 'Daily Ghar Ka Khana Homestyle Meal Plan Thali',
  },
  {
    id: 'momsdaawat',
    badge: 'MOM’S DAAWAT CATERING',
    tag: 'Parties, Celebrations & Banquets',
    headline: "Mom's Daawat — Shahi Dawat,",
    headlineAccent: 'Dil Se Pakaya, Shaan Se Parosa.',
    sub: 'Mitti ki handi me slow-cooked Champaran Ahuna, rich Mughlai gravies, live tawa rotis aur dum biryani — wedding, birthday aur family celebrations ke liye.',
    primaryCtaLabel: "View Mom's Daawat Menu",
    primaryCtaHref: '/menu#moms-daawat',
    waCtaLabel: 'Plan Party Catering',
    waCtaHref: 'https://wa.me/918860909441?text=Hi%20Chaiwale%2C%20I%20want%20to%20plan%20catering%20from%20Mom%27s%20Daawat.',
    highlights: ['Slow Cooked Earthen Pot Recipes', 'Live On-Site Counters & Chefs', 'End-to-End Crockery & Decor'],
    image: 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/branding/hero/hero-momsdaawat.webp',
    imageAlt: "Mom's Daawat Royal Banquet and Champaran Handi Specialties",
  },
];

const AUTOPLAY_INTERVAL = 3000;

export const RotatingHeroSection: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const isFirstMount = useRef<boolean>(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  // Fetch dynamic slides from backend if customized by admin
  useEffect(() => {
    async function loadRemoteHero() {
      try {
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${backend}/api/v1/config/hero`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            setSlides(json.data);
          }
        }
      } catch {
        // Fallback to DEFAULT_SLIDES
      }
    }
    loadRemoteHero();
  }, []);

  const currentSlide = slides[currentIndex] || DEFAULT_SLIDES[0];

  const resolveHeroImg = useCallback((src: string) => {
    if (!src) return '/assets/hero/hero-signature.jpg';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
    if (src.startsWith('/assets/') || src.startsWith('/images/')) return src;
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    return `${backend}/api/v1/media/${src}`;
  }, []);

  const goToSlide = useCallback((index: number, dir?: 'next' | 'prev') => {
    if (isTransitioning || index === currentIndex) return;
    const determinedDir = dir || (index > currentIndex ? 'next' : 'prev');
    setDirection(determinedDir);
    setIsTransitioning(true);
    setCurrentIndex(index);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % slides.length;
    goToSlide(nextIdx, 'next');
  }, [currentIndex, slides.length, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIdx, 'prev');
  }, [currentIndex, slides.length, goToSlide]);

  // Touch Swipe Handlers for Smooth Mobile UX
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -40) {
      handleNext();
    } else if (deltaX > 40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  // Autoplay & Progress bar timer
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const stepTime = 50;
    const totalSteps = AUTOPLAY_INTERVAL / stepTime;
    let stepCount = 0;

    progressIntervalRef.current = setInterval(() => {
      stepCount++;
      setProgress(Math.min((stepCount / totalSteps) * 100, 100));
    }, stepTime);

    autoplayTimerRef.current = setTimeout(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, handleNext]);

  return (
    <section
      className="cw-hero-cinematic-root"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Chaiwale Flagship Cinematic Showcase"
    >
      {/* ─── 1. FULL BLEED 16:9 FOOD BACKGROUND ─── */}
      <div className="cw-hero-bg-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`bg-img-${currentIndex}`}
          src={resolveHeroImg(currentSlide.image)}
          alt={currentSlide.imageAlt}
          className={`cw-hero-bg-img ${direction === 'next' ? 'cw-zoom-next' : 'cw-zoom-prev'}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />
        
        {/* Seamless Directional Ambient Blur Shield (No Box Borders!) */}
        <div className="cw-hero-blur-shield" />

        {/* Directional Vignette Gradient Overlay */}
        <div className="cw-hero-bg-overlay" />

        {/* Bottom Fade transition into white quick food ordering section */}
        <div className="cw-hero-bottom-fade" />
      </div>

      <div className="cw-hero-container">
        {/* ─── 2. SEAMLESS NATURAL CONTENT HERO ─── */}
        <div className="cw-hero-content-stage">
          
          {/* Main Left Content Area */}
          <div className="cw-hero-content-col">
            
            {/* Tagline & Badge Pill */}
            <div className="cw-hero-badge-row" key={`badge-${currentIndex}`}>
              <span className="cw-hero-badge">
                <span className="cw-hero-badge-glow" />
                {currentSlide.badge}
              </span>
              <span className="cw-hero-tag">
                • {currentSlide.tag}
              </span>
            </div>

            {/* Fireslab-style Masked Title Reveal (Line 1 & Line 2) */}
            <div className="cw-hero-headline-wrap" key={`headline-${currentIndex}`}>
              <div className="cw-mask-line">
                <h1 className="cw-headline-l1">
                  {currentSlide.headline}
                </h1>
              </div>
              <div className="cw-mask-line" style={{ marginTop: '2px' }}>
                <span className="cw-headline-l2">
                  {currentSlide.headlineAccent}
                </span>
              </div>
            </div>

            {/* Subtitle description with subtle slide & fade */}
            <p
              key={`sub-${currentIndex}`}
              className="cw-hero-sub"
            >
              {currentSlide.sub}
            </p>

            {/* 3 Key Feature Bullets (Natural Frosted Chips) */}
            <div className="cw-hero-bullets-grid" key={`bullets-${currentIndex}`}>
              {currentSlide.highlights.map((bullet, idx) => (
                <div
                  key={`${currentIndex}-bullet-${idx}`}
                  className="cw-hero-bullet-glass"
                  style={{ animationDelay: `${0.16 + idx * 0.06}s` }}
                >
                  <span className="cw-hero-bullet-check">✓</span>
                  <span className="cw-hero-bullet-text">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Dual Aligned CTA Boxes */}
            <div className="cw-hero-cta-row">
              <Link
                href={currentSlide.primaryCtaHref}
                className="cw-hero-cta-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '46px',
                  padding: '0 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D96B27 100%)',
                  color: '#FFFFFF',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(217, 107, 39, 0.45)',
                  border: '1px solid rgba(254, 240, 138, 0.4)',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{currentSlide.primaryCtaLabel}</span>
                <span className="cw-cta-arrow" style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
              </Link>

              <a
                href={currentSlide.waCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-hero-cta-whatsapp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '46px',
                  padding: '0 20px',
                  borderRadius: '12px',
                  backgroundColor: '#25D366',
                  border: '1px solid #1EBE5D',
                  color: '#FFFFFF',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap'
                }}
              >
                <svg
                  className="cw-hero-wa-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: '20px', height: '20px', fill: '#FFFFFF', flexShrink: 0 }}
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.24 16C12.83 16.27 13.28 16.42 13.64 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.71 16.56 16.73 16.01 16.94 15.42C17.15 14.83 17.15 14.33 17.09 14.22C17.03 14.12 16.86 14.07 16.62 13.95C16.37 13.84 15.14 13.24 14.91 13.15C14.69 13.07 14.53 13.03 14.36 13.27C14.2 13.51 13.73 14.07 13.58 14.24C13.44 14.4 13.3 14.42 13.06 14.3C12.82 14.19 11.8 13.85 10.6 12.78C9.66 11.94 9.03 10.9 8.91 10.7C8.79 10.5 8.9 10.37 9.02 10.25C9.13 10.14 9.27 9.96 9.39 9.82C9.51 9.68 9.55 9.57 9.63 9.41C9.71 9.26 9.67 9.12 9.61 9C9.55 8.88 9.07 7.73 8.87 7.26C8.67 6.8 8.47 6.86 8.32 6.85C8.18 6.85 8.01 6.85 7.85 6.85" />
                </svg>
                <span>{currentSlide.waCtaLabel}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── 3. CINEMATIC TIMELINE & DIAL NAVIGATION ─── */}
        <div className="cw-hero-minimal-bar">
          
          {/* Left: Dynamic Slide Counter */}
          <div className="cw-hero-counter-wrap">
            <span className="cw-hero-counter-curr">0{currentIndex + 1}</span>
            <span className="cw-hero-counter-divider">/</span>
            <span className="cw-hero-counter-tot">0{slides.length}</span>
          </div>

          {/* Center: Sleek Interactive Progress Timeline */}
          <div className="cw-hero-timeline-wrap">
            {slides.map((_, idx) => {
              const isActive = idx === currentIndex;
              const isPassed = idx < currentIndex;
              return (
                <div
                  key={`progress-${idx}`}
                  onClick={() => goToSlide(idx)}
                  className="cw-hero-timeline-segment"
                  title={`Go to slide ${idx + 1}`}
                >
                  <div
                    className="cw-hero-timeline-fill"
                    style={{
                      width: isActive ? `${progress}%` : isPassed ? '100%' : '0%',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right: Luxury Circular Arrow Buttons */}
          <div className="cw-hero-arrows-wrap">
            <button
              onClick={handlePrev}
              className="cw-hero-arrow-btn"
              aria-label="Previous Slide"
            >
              <span className="cw-hero-arrow-icon">←</span>
            </button>

            <button
              onClick={handleNext}
              className="cw-hero-arrow-btn cw-hero-arrow-next"
              aria-label="Next Slide"
            >
              <span className="cw-hero-arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
