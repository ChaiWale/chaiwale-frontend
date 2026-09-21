'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  const updateCartCount = () => {
    try {
      const saved = localStorage.getItem('cw_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const count = Object.values(parsed).reduce(
            (sum: number, item: any) => sum + (Number(item?.qty) || 0),
            0
          );
          setCartCount(count);
          return;
        }
      }
      setCartCount(0);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    if (pathname === '/menu') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-cart'));
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('#')[0]);
  };

  const linkStyle = (href: string): React.CSSProperties => ({
    fontSize: '15px',
    fontWeight: 600,
    color: isActive(href) ? '#6F432A' : '#2D221D',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: isActive(href) ? '#F3ECE5' : 'transparent',
    transition: 'all 0.15s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center'
  });

  return (
    <>
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EAE0D2',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 6px rgba(33,21,16,0.06)'
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          gap: '24px'
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/assets/chaiwale-logo.jpeg"
              alt="Chaiwale"
              style={{ height: '48px', width: 'auto', borderRadius: '8px' }}
            />
          </Link>

          {/* Desktop Nav — Centered and balanced */}
          <nav className="cw-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}>

            <Link href="/menu" className="cw-nav-item" style={linkStyle('/menu')}>Menu</Link>

            {/* Book Events Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setEventsOpen(true)}
              onMouseLeave={() => setEventsOpen(false)}
            >
              <button
                className="cw-nav-item"
                style={{
                  ...linkStyle('/catering'),
                  backgroundColor: (pathname.startsWith('/catering') || pathname.startsWith('/quote')) ? '#F3ECE5' : 'transparent',
                  color: (pathname.startsWith('/catering') || pathname.startsWith('/quote')) ? '#6F432A' : '#2D221D',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Book Events
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {eventsOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAE0D2',
                  borderRadius: '12px',
                  padding: '8px',
                  minWidth: '220px',
                  boxShadow: '0 8px 24px rgba(33,21,16,0.12)',
                  zIndex: 100
                }}>
                  {[
                    { href: '/catering#bhandara', label: 'Bhandara Catering', sub: 'Religious & community feasts' },
                    { href: '/catering', label: 'Corporate / Office', sub: 'Team meals & office catering' },
                    { href: '/catering#event', label: 'Party & Events', sub: 'Birthdays, functions & more' },
                    { href: '/quote', label: 'Get a Custom Quote', sub: 'Tell us your requirement' }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setEventsOpen(false)}
                      style={{
                        display: 'block',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#211510',
                        transition: 'background 0.12s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF5EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: '11px', color: '#98877D', marginTop: '2px' }}>{item.sub}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/check-bill" className="cw-nav-item" style={linkStyle('/check-bill')}>Check Your Bill</Link>
            <Link href="/quote" className="cw-nav-item" style={linkStyle('/quote')}>Request a Quote</Link>
            <Link href="/reach-us" className="cw-nav-item" style={linkStyle('/reach-us')}>Reach Us</Link>
          </nav>

          {/* Right CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <Link
              href="/menu?cart=open"
              onClick={handleCartClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: cartCount > 0 ? '#6F432A' : '#FAF5EE',
                border: '1px solid ' + (cartCount > 0 ? '#6F432A' : '#EAE0D2'),
                color: cartCount > 0 ? '#FFFFFF' : '#6F432A',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                cursor: 'pointer'
              }}
            >
              <span>🛒 Cart</span>
              {cartCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#E65100',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '1px 6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    lineHeight: '14px'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/919310112564?text=Hi%20Chaiwale%21%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="cw-wa-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                padding: '9px 18px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(37,211,102,0.25)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882l6.197-1.625A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.954a9.93 9.93 0 01-5.065-1.381l-.361-.215-3.759.986.999-3.658-.238-.374A9.93 9.93 0 012.046 12C2.046 6.508 6.508 2.046 12 2.046S21.954 6.508 21.954 12 17.492 21.954 12 21.954z"/>
              </svg>
              Order on WhatsApp
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="cw-mobile-toggle"
              style={{ display: 'none', flexDirection: 'column', justifyContent: 'center', gap: '5px', width: '40px', height: '40px', backgroundColor: '#FAF6F0', border: '1px solid #EAE0D2', borderRadius: '8px', cursor: 'pointer', padding: '8px' }}
            >
              <span style={{ height: '2px', backgroundColor: '#6F432A', borderRadius: '2px', display: 'block' }} />
              <span style={{ height: '2px', backgroundColor: '#6F432A', borderRadius: '2px', display: 'block', width: '75%' }} />
              <span style={{ height: '2px', backgroundColor: '#6F432A', borderRadius: '2px', display: 'block' }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EAE0D2', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* View Cart in Mobile Menu */}
            <Link
              href="/menu?cart=open"
              onClick={(e) => {
                setMobileOpen(false);
                handleCartClick(e);
              }}
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#6F432A',
                backgroundColor: '#FAF5EE',
                padding: '11px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px'
              }}
            >
              <span>🛒 View Cart</span>
              {cartCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#6F432A',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                >
                  {cartCount} items
                </span>
              )}
            </Link>

            {[
              { href: '/', label: 'Home' },
              { href: '/menu', label: 'Menu' },
              { href: '/catering#bhandara', label: 'Bhandara Catering' },
              { href: '/catering', label: 'Corporate & Office Catering' },
              { href: '/quote', label: 'Request a Quote' },
              { href: '/check-bill', label: 'Check Your Bill' },
              { href: '/reach-us', label: 'Reach Us' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#4B3B35',
                  padding: '11px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919310112564"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
            >
              Order on WhatsApp
            </a>
          </div>
        )}
      </header>

      <style>{`
        .cw-nav-item:hover {
          background-color: #FAF5EE !important;
          color: #6F432A !important;
        }
        .cw-wa-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(37,211,102,0.4) !important;
        }
        @media (min-width: 900px) {
          .cw-desktop-nav { display: flex !important; }
          .cw-mobile-toggle { display: none !important; }
        }
        @media (max-width: 899px) {
          .cw-desktop-nav { display: none !important; }
          .cw-mobile-toggle { display: flex !important; }
          .cw-wa-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};
