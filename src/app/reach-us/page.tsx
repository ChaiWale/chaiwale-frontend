import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reach Us | Chaiwale - Vardhman Grand Plaza, Rohini Delhi',
  description: 'Visit Chaiwale at Vardhman Grand Plaza, Rohini Sector-3, New Delhi. Call, WhatsApp or order online. Open 8 AM - 6 PM daily.'
};

export default function ReachUsPage() {
  return (
    <div style={{ backgroundColor: '#FAF5EE', minHeight: '80vh', paddingBottom: '64px' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#FAF5EE', padding: '48px 24px 32px', borderBottom: '1px solid #EAE0D2', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#D96B27', letterSpacing: '0.06em' }}>
          Find Us
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#211510', marginTop: '6px', marginBottom: '8px' }}>
          Reach Us
        </h1>
        <p style={{ color: '#705F55', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
          Dine in, takeaway, or order on WhatsApp. We are open every day.
        </p>
      </section>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Address */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAE0D2', padding: '24px', boxShadow: '0 2px 8px rgba(33,21,16,0.04)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FAF5EE', color: '#6F432A', marginBottom: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#211510', marginBottom: '6px' }}>Our Location</h2>
              <p style={{ fontSize: '14px', color: '#705F55', lineHeight: 1.6 }}>
                G-31, Vardhman Grand Plaza,<br />
                Mangalam Place, M2K Road,<br />
                Rohini Sector-3, New Delhi – 110085
              </p>
              <a
                href="https://www.google.com/maps/dir//Vardhman+Grand+Plaza,+Mangalam+Place,+Rohini,+Delhi,+110085/@28.6989677,77.1141765,17z"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '12px',
                  backgroundColor: '#4285F4',
                  color: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Phone */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAE0D2', padding: '24px', boxShadow: '0 2px 8px rgba(33,21,16,0.04)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FAF5EE', color: '#6F432A', marginBottom: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#211510', marginBottom: '10px' }}>Call Us</h2>
              <a href="tel:+918800410441" style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#6F432A', textDecoration: 'none', marginBottom: '4px' }}>
                +91 88004 10441
              </a>
              <a href="tel:+919310112564" style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#6F432A', textDecoration: 'none', marginBottom: '4px' }}>
                +91 93101 12564
              </a>
              <a href="tel:+919310110414" style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#6F432A', textDecoration: 'none' }}>
                +91 93101 10414
              </a>
              <p style={{ fontSize: '12px', color: '#98877D', marginTop: '8px' }}>Open Every Day: 08:00 AM – 06:00 PM</p>
            </div>

            {/* WhatsApp Order */}
            <a
              href="https://wa.me/919310112564?text=Hi%20Chaiwale%21%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37,211,102,0.25)'
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882l6.197-1.625A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.954a9.93 9.93 0 01-5.065-1.381l-.361-.215-3.759.986.999-3.658-.238-.374A9.93 9.93 0 012.046 12C2.046 6.508 6.508 2.046 12 2.046S21.954 6.508 21.954 12 17.492 21.954 12 21.954z"/>
              </svg>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800 }}>Order on WhatsApp</div>
                <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>+91 93101 12564 · Instant Reply</div>
              </div>
            </a>
          </div>

          {/* Google Map Embed */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #EAE0D2', minHeight: '400px', boxShadow: '0 2px 8px rgba(33,21,16,0.04)' }}>
            <iframe
              title="Chaiwale Location - G-31 Vardhman Grand Plaza Rohini"
              src="https://maps.google.com/maps?q=28.6989677,77.1141765&output=embed&z=17"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Hours Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAE0D2', padding: '24px', marginTop: '24px', boxShadow: '0 2px 8px rgba(33,21,16,0.04)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#211510', marginBottom: '16px' }}>Operating Hours</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { day: 'Monday – Friday', hours: '08:00 AM – 06:00 PM' },
              { day: 'Saturday', hours: '08:00 AM – 06:00 PM' },
              { day: 'Sunday', hours: '08:00 AM – 06:00 PM' },
              { day: 'Holidays', hours: 'Open as usual' }
            ].map((row) => (
              <div key={row.day} style={{ backgroundColor: '#FAF5EE', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#6F432A' }}>{row.day}</div>
                <div style={{ fontSize: '13px', color: '#705F55', marginTop: '3px' }}>{row.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
