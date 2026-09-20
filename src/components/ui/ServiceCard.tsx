import React from 'react';
import Link from 'next/link';

export interface ServiceCardProps {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  tag,
  title,
  description,
  highlights,
  ctaText,
  ctaHref,
  isPopular = false
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--cw-color-surface)',
        borderRadius: 'var(--cw-radius-xl)',
        padding: 'var(--cw-space-8)',
        border: isPopular ? '2px solid var(--cw-color-primary)' : '1px solid var(--cw-color-border)',
        boxShadow: isPopular ? 'var(--cw-shadow-md)' : 'var(--cw-shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {isPopular && (
        <span
          style={{
            position: 'absolute',
            top: '-12px',
            right: '24px',
            backgroundColor: 'var(--cw-color-primary)',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '4px 12px',
            borderRadius: 'var(--cw-radius-pill)'
          }}
        >
          Most Requested
        </span>
      )}

      <span
        style={{
          color: 'var(--cw-color-accent)',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '8px'
        }}
      >
        {tag}
      </span>

      <h3
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--cw-color-text-main)',
          marginBottom: '12px'
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '15px',
          color: 'var(--cw-color-text-muted)',
          lineHeight: 1.6,
          marginBottom: '20px'
        }}
      >
        {description}
      </p>

      <div style={{ borderTop: '1px solid var(--cw-color-border-light)', paddingTop: '16px', marginBottom: '24px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cw-color-text-main)', marginBottom: '10px', textTransform: 'uppercase' }}>
          Service Features:
        </p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {highlights.map((h, i) => (
            <li
              key={i}
              style={{
                fontSize: '14px',
                color: 'var(--cw-color-text-muted)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ color: 'var(--cw-color-veg)', fontWeight: 'bold' }}>✓</span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Link
          href={ctaHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '12px 20px',
            backgroundColor: isPopular ? 'var(--cw-color-primary)' : 'transparent',
            color: isPopular ? '#ffffff' : 'var(--cw-color-primary)',
            border: isPopular ? 'none' : '1px solid var(--cw-color-primary)',
            borderRadius: 'var(--cw-radius-md)',
            fontFamily: 'var(--cw-font-heading)',
            fontWeight: 700,
            fontSize: '14px',
            transition: 'all var(--cw-transition-fast)'
          }}
        >
          {ctaText} →
        </Link>
      </div>
    </div>
  );
};
