import React from 'react';
import Link from 'next/link';

export const ServicePillars: React.FC = () => {
  const pillars = [
    {
      title: 'Everyday Food',
      desc: 'Fresh Chai, Snacks, Momos & Lunch Bowls',
      icon: '☕',
      href: '/menu',
      badge: 'Order Online'
    },
    {
      title: 'Corporate Catering',
      desc: 'Daily office lunch thalis & team events',
      icon: '🏢',
      href: '/catering#corporate',
      badge: 'Office Plans'
    },
    {
      title: 'Bhandara & Events',
      desc: 'Large religious & community mass feasts',
      icon: '🪔',
      href: '/catering#bhandara',
      badge: '100 - 1500+ Pax'
    },
    {
      title: 'Custom Food Orders',
      desc: 'Special bulk dishes & custom menus',
      icon: '🍲',
      href: '/catering#custom',
      badge: 'Tailored'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginTop: '-32px',
        position: 'relative',
        zIndex: 10
      }}
    >
      {pillars.map((p, i) => (
        <Link
          key={i}
          href={p.href}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--cw-radius-lg)',
            border: '1px solid var(--cw-color-border)',
            padding: '20px',
            boxShadow: 'var(--cw-shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all var(--cw-transition-fast)',
            textDecoration: 'none'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '30px' }}>{p.icon}</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--cw-color-accent)',
                backgroundColor: 'var(--cw-color-accent-subtle)',
                padding: '3px 8px',
                borderRadius: 'var(--cw-radius-pill)',
                letterSpacing: '0.03em'
              }}
            >
              {p.badge}
            </span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--cw-color-text-main)', marginBottom: '4px' }}>
            {p.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--cw-color-text-muted)', lineHeight: 1.4 }}>
            {p.desc}
          </p>
        </Link>
      ))}
    </div>
  );
};
