import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1A1210',
        color: '#ffffff',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingTop: '56px',
        paddingBottom: '0'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Main Grid — 4 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >

          {/* ── Brand Column ── */}
          <div>
            <img
              src="/assets/chaiwale-logo.jpeg"
              alt="Chaiwale"
              style={{ height: '54px', width: 'auto', borderRadius: '10px', marginBottom: '16px' }}
            />
            <p style={{ color: '#B5ADA8', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>
              Authentic Kulhad Chai, wholesome North Indian meals, and institutional catering across Delhi NCR.
            </p>

            {/* Instagram — icon only, no handle text */}
            <a
              href="https://www.instagram.com/chaiwaleofficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chaiwale on Instagram"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                marginBottom: '20px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* FSSAI — on its own line, no overlap */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', letterSpacing: '0.5px' }}>
                FSSAI
              </span>
              <span style={{ fontSize: '11px', color: '#7C6D67', fontFamily: 'monospace' }}>
                23326001003387
              </span>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: 700, marginBottom: '18px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.5 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/menu" style={{ color: '#B5ADA8', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>Full Cafe &amp; Shakes Menu</Link></li>
              <li><Link href="/menu#moms-daawat" style={{ color: '#F87171', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>Mom&apos;s Daawat Specialities</Link></li>
              <li><Link href="/catering#bhandara" style={{ color: '#FBBF24', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>Bhandara &amp; Mass Feasts (50 - 2000+ Pax)</Link></li>
              <li><Link href="/catering#meal-plans" style={{ color: '#B5ADA8', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>Monthly Meal Plans &amp; PG Tiffin</Link></li>
              <li><Link href="/catering" style={{ color: '#B5ADA8', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>Corporate Office Catering</Link></li>
              <li><Link href="/quote" style={{ color: '#B5ADA8', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>Request a Catering Quote</Link></li>
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: 700, marginBottom: '18px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.5 }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{ color: '#7C6D67', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Address</p>
                <p style={{ color: '#B5ADA8', fontSize: '13px', lineHeight: 1.6 }}>
                  G-31, Vardhman Grand Plaza,<br />
                  Rohini Sector-3, New Delhi – 110085
                </p>
              </div>
              <div>
                <p style={{ color: '#7C6D67', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Phone</p>
                <a href="tel:+918800410441" style={{ color: '#E8E0D8', fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'block' }}>+91 88004 10441</a>
                <a href="tel:+919310112564" style={{ color: '#E8E0D8', fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'block', marginTop: '2px' }}>+91 93101 12564</a>
              </div>
              <div>
                <p style={{ color: '#7C6D67', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>WhatsApp</p>
                <a href="https://wa.me/919310112564" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>+91 93101 12564</a>
              </div>
              <div>
                <p style={{ color: '#7C6D67', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Hours</p>
                <p style={{ color: '#B5ADA8', fontSize: '13px' }}>Open Every Day — 8:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* ── Map Embed ── */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: 700, marginBottom: '18px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.5 }}>
              Find Us
            </h4>
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe
                title="Chaiwale — G-31 Vardhman Grand Plaza, Rohini Sector-3"
                src="https://maps.google.com/maps?q=28.6989677,77.1141765&output=embed&z=17"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href="https://maps.google.com/?q=28.6989677,77.1141765"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', marginTop: '8px', color: '#60A5FA', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '18px 0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '12px',
            color: '#5C504A'
          }}
        >
          <span>© 2026 Chaiwale Cafe &amp; Catering. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href="/privacy-policy" style={{ color: '#7C6D67', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: '#7C6D67', textDecoration: 'none' }}>Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
