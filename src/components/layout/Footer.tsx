import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1C1917',
        color: '#ffffff',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '48px',
        paddingBottom: '32px'
      }}
    >
      <div className="cw-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '36px',
            marginBottom: '40px'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/assets/chaiwale-logo.jpeg"
                alt="Chaiwale"
                style={{ height: '48px', width: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <div>
                <span style={{ fontFamily: 'var(--cw-font-heading)', fontSize: '20px', fontWeight: 800, color: '#ffffff', display: 'block', letterSpacing: '0.5px' }}>
                  CHAIWALE
                </span>
                <span style={{ fontSize: '11px', color: '#D97706', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Meals • Chai • More
                </span>
              </div>
            </div>
            <p style={{ color: '#D6D3D1', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Sip, Bite, Repeat. Authentic Kulhad Chai, wholesome North Indian meals, Mom's Daawat non-veg handi specialties, and institutional catering across Delhi NCR.
            </p>

            {/* Instagram Link with Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <a
                href="https://www.instagram.com/chaiwaleofficial/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#F3F4F6', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
              >
                Instagram: <span style={{ color: '#F472B6', textDecoration: 'underline' }}>@chaiwaleofficial</span>
              </a>
            </div>

            {/* FSSAI Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '6px 12px',
                borderRadius: '6px'
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B', letterSpacing: '0.5px' }}>
                FSSAI
              </span>
              <span style={{ fontSize: '12px', color: '#E5E7EB', fontFamily: 'monospace', fontWeight: 600 }}>
                Lic. No. 23326001003387
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Food & Catering Menu
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#D6D3D1' }}>
              <li><Link href="/menu" style={{ color: 'inherit', textDecoration: 'none' }}>☕ Full Cafe & Shakes Menu</Link></li>
              <li><Link href="/menu#moms-daawat" style={{ color: '#F87171', fontWeight: 600, textDecoration: 'none' }}>🍗 Mom's Daawat Specialities</Link></li>
              <li><Link href="/catering#bhandara" style={{ color: '#FBBF24', fontWeight: 600, textDecoration: 'none' }}>🙏 Bhandara Service (51 Plates @ ₹3,999)</Link></li>
              <li><Link href="/catering#meal-plans" style={{ color: '#34D399', fontWeight: 600, textDecoration: 'none' }}>🍱 Monthly Meal Plans & PG Tiffin</Link></li>
              <li><Link href="/catering" style={{ color: 'inherit', textDecoration: 'none' }}>🏢 Corporate Office Catering</Link></li>
              <li><Link href="/quote" style={{ color: 'inherit', textDecoration: 'none' }}>📝 Request Bulk Catering Quote</Link></li>
            </ul>
          </div>

          {/* Kitchen Location & Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Kitchen Location & Contact
            </h4>
            <p style={{ color: '#D6D3D1', fontSize: '13px', lineHeight: 1.6, marginBottom: '12px' }}>
              📍 G-31 & G-48, Vardhman Grand Plaza, Mangalam Palace, M2K Road, Rohini Sector-3, New Delhi - 110085
            </p>
            <p style={{ color: '#D6D3D1', fontSize: '13px', marginBottom: '8px' }}>
              📞 Phone: <a href="tel:+918800410441" style={{ color: '#ffffff', fontWeight: 700 }}>+91 88004 10441</a> / <a href="tel:+919310112564" style={{ color: '#ffffff', fontWeight: 700 }}>+91 93101 12564</a>
            </p>
            <p style={{ color: '#D6D3D1', fontSize: '13px', marginBottom: '8px' }}>
              💬 WhatsApp: <a href="https://wa.me/918800410441" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 700 }}>+91 88004 10441</a>
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '8px' }}>
              🕒 Hours: Open Everyday 08:00 AM – 11:00 PM
            </p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
            fontSize: '12px',
            color: '#A8A29E'
          }}
        >
          <div>
            © 2026 Chaiwale Cafe & Catering. All rights reserved. • 100% Zero-Tax Registered Kitchen.
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: '#D97706', fontWeight: 600 }}>FSSAI: 23326001003387</span>
            <span>•</span>
            <Link href="/privacy-policy" style={{ color: '#D6D3D1', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" style={{ color: '#D6D3D1', textDecoration: 'underline' }}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
