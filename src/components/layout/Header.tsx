'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: 'var(--cw-color-surface)',
        borderBottom: '1px solid var(--cw-color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: 'var(--cw-shadow-sm)'
      }}
    >
      <div
        className="cw-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--cw-header-height)'
        }}
      >
        {/* Authentic Client Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/assets/chaiwale-logo.jpeg"
            alt="Chaiwale"
            style={{
              height: '52px',
              width: 'auto',
              borderRadius: 'var(--cw-radius-md)',
              border: '1px solid var(--cw-color-border-light)'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--cw-font-heading)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', color: 'var(--cw-color-primary)' }}>
              CHAIWALE
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--cw-color-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Cafe & Catering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            gap: '28px',
            alignItems: 'center'
          }}
          className="cw-desktop-nav"
        >
          <Link href="/" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cw-color-text-main)' }}>
            Home
          </Link>
          <Link href="/menu" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cw-color-text-main)' }}>
            Menu & Order
          </Link>
          <Link href="/catering" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cw-color-text-main)' }}>
            Corporate Catering
          </Link>
          <Link href="/catering#bhandara" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cw-color-text-main)' }}>
            Bhandara Meals
          </Link>
          <Link href="/track" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cw-color-text-main)' }}>
            Track Order
          </Link>
          <Link href="/quote" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--cw-color-accent)' }}>
            Request a Quote
          </Link>
        </nav>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://wa.me/919310112564"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--cw-color-whatsapp)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: 'var(--cw-radius-md)',
              fontSize: '13px',
              fontWeight: 700,
              boxShadow: '0 2px 6px rgba(37,211,102,0.2)'
            }}
          >
            WhatsApp Order
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--cw-color-canvas)',
              border: '1px solid var(--cw-color-border)',
              borderRadius: 'var(--cw-radius-md)',
              cursor: 'pointer',
              padding: '8px'
            }}
            className="cw-mobile-toggle"
          >
            <span style={{ height: '2px', backgroundColor: 'var(--cw-color-dark)', borderRadius: '2px' }} />
            <span style={{ height: '2px', backgroundColor: 'var(--cw-color-dark)', borderRadius: '2px' }} />
            <span style={{ height: '2px', backgroundColor: 'var(--cw-color-dark)', borderRadius: '2px' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: 'var(--cw-color-surface)',
            borderTop: '1px solid var(--cw-color-border)',
            padding: 'var(--cw-space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <Link href="/" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', fontWeight: 600 }}>
            Home
          </Link>
          <Link href="/menu" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', fontWeight: 600 }}>
            Menu & Food Ordering
          </Link>
          <Link href="/catering" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', fontWeight: 600 }}>
            Corporate Catering & Office Lunch
          </Link>
          <Link href="/catering#bhandara" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', fontWeight: 600 }}>
            Community & Bhandara Catering
          </Link>
          <Link href="/track" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', fontWeight: 600 }}>
            Track Order
          </Link>
          <Link href="/quote" onClick={() => setMobileOpen(false)} style={{ fontSize: '16px', fontWeight: 700, color: 'var(--cw-color-primary)' }}>
            Request a Quote →
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 900px) {
          .cw-desktop-nav {
            display: flex !important;
          }
          .cw-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
