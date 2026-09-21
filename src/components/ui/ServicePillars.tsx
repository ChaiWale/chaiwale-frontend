'use client';

import React from 'react';
import Link from 'next/link';

export const ServicePillars: React.FC = () => {
  const pillars = [
    {
      title: 'Everyday Food',
      desc: 'Fresh Chai, Snacks, Momos & Lunch Bowls',
      icon: '☕',
      href: '/menu',
      badge: 'Order Online',
      badgeBg: '#FEF3C7',
      badgeColor: '#92400E',
      accentColor: '#6F432A'
    },
    {
      title: 'Corporate Catering',
      desc: 'Daily office lunch thalis & team events',
      icon: '🏢',
      href: '/catering#corporate',
      badge: 'Office Plans',
      badgeBg: '#EFF6FF',
      badgeColor: '#1E40AF',
      accentColor: '#1E3A8A'
    },
    {
      title: 'Bhandara & Events',
      desc: 'Pure Satvik & community feasts, 50 - 2000+ pax',
      icon: '🪔',
      href: '/catering#bhandara',
      badge: '50 - 2000+ Pax',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      accentColor: '#D97706'
    },
    {
      title: 'Custom Food Orders',
      desc: 'Special bulk dishes & customized event menus',
      icon: '🍲',
      href: '/quote',
      badge: 'Tailored Feasts',
      badgeBg: '#F3ECE5',
      badgeColor: '#6F432A',
      accentColor: '#8C5535'
    }
  ];

  return (
    <>
      <div
        className="cw-service-pillars-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          marginTop: '-36px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {pillars.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="cw-pillar-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EAE0D2',
              padding: '22px 20px',
              boxShadow: '0 4px 20px rgba(33, 21, 16, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top accent gradient line on hover */}
            <div
              className="cw-card-accent-bar"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: p.accentColor,
                opacity: 0.8,
                transition: 'transform 0.25s ease',
                transform: 'scaleX(0.7)',
                transformOrigin: 'left'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#FAF5EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  border: '1px solid #EEDFCF'
                }}
              >
                {p.icon}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: p.badgeColor,
                  backgroundColor: p.badgeBg,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  letterSpacing: '0.03em'
                }}
              >
                {p.badge}
              </span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#211510', marginBottom: '6px', fontFamily: 'var(--cw-font-heading)' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#6F6058', lineHeight: 1.5, margin: 0, flex: 1 }}>
              {p.desc}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '14px',
                fontSize: '12px',
                fontWeight: 700,
                color: p.accentColor
              }}
            >
              <span>Explore</span>
              <span style={{ transition: 'transform 0.2s ease' }} className="cw-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .cw-pillar-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(111, 67, 42, 0.14) !important;
          border-color: #D4BAA3 !important;
        }
        .cw-pillar-card:hover .cw-card-accent-bar {
          transform: scaleX(1) !important;
        }
        .cw-pillar-card:hover .cw-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </>
  );
};
