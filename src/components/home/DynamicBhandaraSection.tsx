'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface DynamicBhandaraSectionProps {
  bannerData?: {
    image?: string;
    badge?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    whatsappNumber?: string;
    whatsappText?: string;
  };
}

export const DynamicBhandaraSection: React.FC<DynamicBhandaraSectionProps> = ({ bannerData }) => {
  const [selectedPax, setSelectedPax] = useState('100 - 250 Pax');

  const paxOptions = [
    { label: '50 - 100 Pax', value: '50 - 100 guests' },
    { label: '100 - 250 Pax', value: '100 - 250 guests' },
    { label: '300 - 500 Pax', value: '300 - 500 guests' },
    { label: '500 - 1000+ Pax', value: '500 - 1000+ guests' }
  ];

  const waNum = bannerData?.whatsappNumber || '918800410441';
  const customMsg = bannerData?.whatsappText
    ? `${bannerData.whatsappText} for ${selectedPax}`
    : `Hello Chaiwale, I want to inquire about Bhandara & Religious Feast Catering for ${selectedPax}. Please share custom menu options and quote.`;
  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(customMsg)}`;

  const resolveImgSrc = (src?: string) => {
    if (!src) return '/assets/bhandara-banner.jpg';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    if (src.startsWith('/assets/')) return src;
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    if (src.startsWith('/')) return `${BACKEND}${src}`;
    return `${BACKEND}/api/v1/media/${src}`;
  };
  const bannerImg = resolveImgSrc(bannerData?.image);
  const bannerTitle = bannerData?.title || 'Bhandara Hai? Khana Hum Sambhal Lenge.';
  const bannerBadge = bannerData?.badge || 'Bhandara & Mass Feasts Catering';
  const bannerDesc = bannerData?.description || 'Satvik ho ya special prasad, har bhog banega shuddh, swadisht aur poori pavitrata ke saath. Perfect for Puja, Jagran, Kirtan, Mandir Langar & Community Feasts across Delhi NCR.';

  return (
    <section style={{ padding: '60px 0', backgroundColor: '#FAF5EE', borderTop: '1px solid #EAE0D2' }}>
      <div className="cw-container">
        <div
          className="cw-bhandara-card"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #F0D5BE',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(111, 67, 42, 0.09)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Left Column: Authentic Feast Poster (Clean 1:1 Aspect Ratio) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFDF9',
              padding: '24px'
            }}
          >
            <img
              src={bannerImg}
              alt={bannerTitle}
              style={{
                width: '100%',
                maxWidth: '460px',
                height: 'auto',
                aspectRatio: '1 / 1',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(111, 67, 42, 0.12)',
                display: 'block'
              }}
              className="cw-bhandara-img"
            />
          </div>

          {/* Right Column: Dynamic Feast Details */}
          <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FEF3C7',
                  color: '#B45309',
                  border: '1px solid #FDE68A',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase'
                }}
              >
                <span>🪔</span>
                <span>{bannerBadge}</span>
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: '#6F432A',
                  fontWeight: 700,
                  backgroundColor: '#F3ECE5',
                  padding: '5px 10px',
                  borderRadius: '20px'
                }}
              >
                50 to 2000+ Pax
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 900,
                color: '#211510',
                lineHeight: 1.25,
                margin: '0 0 12px',
                fontFamily: 'var(--cw-font-heading)'
              }}
            >
              {bannerTitle}
            </h2>

            <p style={{ color: '#6F6058', fontSize: '15px', lineHeight: 1.6, margin: '0 0 20px' }}>
              {bannerDesc}
            </p>

            {/* Menu Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
              {[
                '✓ Garam Poori + Aloo Tamatar Sabzi',
                '✓ Desi Ghee Sooji Halwa / Kheer',
                '✓ Punjabi Kadhi Pakoda + Rice',
                '✓ Pindi Chole + Kulhad Raita',
                '✓ 100% Satvik (No Onion, No Garlic)'
              ].map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#FAF5EE',
                    color: '#6F432A',
                    border: '1px solid #EEDFCF',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Interactive Headcount Selector */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#211510', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Select Estimated Gathering Size:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {paxOptions.map((opt) => {
                  const isSelected = selectedPax === opt.value;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedPax(opt.value)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #D97706' : '1px solid #EAE0D2',
                        backgroundColor: isSelected ? '#FEF3C7' : '#FFFFFF',
                        color: isSelected ? '#92400E' : '#4B3B35',
                        fontSize: '13px',
                        fontWeight: isSelected ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-bhandara-btn"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '14px 26px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882l6.197-1.625A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.954a9.93 9.93 0 01-5.065-1.381l-.361-.215-3.759.986.999-3.658-.238-.374A9.93 9.93 0 012.046 12C2.046 6.508 6.508 2.046 12 2.046S21.954 6.508 21.954 12 17.492 21.954 12 21.954z"/>
                </svg>
                <span>{bannerData?.ctaText ? `${bannerData.ctaText} (${selectedPax})` : `Get Bhandara Quote (${selectedPax})`}</span>
              </a>

              <Link
                href={bannerData?.ctaLink || '/catering#bhandara'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFFFFF',
                  color: '#6F432A',
                  border: '1.5px solid #6F432A',
                  padding: '13px 20px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>View Full Menu</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cw-bhandara-card:hover {
          box-shadow: 0 16px 44px rgba(111, 67, 42, 0.14) !important;
          border-color: #E2BFA3 !important;
        }
        .cw-bhandara-card:hover .cw-bhandara-img {
          transform: scale(1.03);
        }
        .cw-bhandara-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45) !important;
        }
      `}</style>
    </section>
  );
};
