import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Chaiwale Cafe & Catering Delhi',
  description: 'Privacy Policy and data protection standards for Chaiwale Cafe and institutional catering clients.'
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#FDFBF9', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #ECE4DE', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#6F432A', textDecoration: 'underline', fontWeight: 600 }}>
            ← Back to Home
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1E2328', marginTop: '16px', marginBottom: '8px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '13px', color: '#8A7366' }}>
            Effective Date: January 1, 2026 • FSSAI License: <strong>23326001003387</strong>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px', lineHeight: 1.7, color: '#4B5563' }}>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              1. Information We Collect
            </h2>
            <p>
              When you order from Chaiwale, request an institutional catering quote, register for an office canteen tab, or subscribe to monthly meal plans, we collect contact details including your Name, Mobile/WhatsApp Number, Delivery Address, and Corporate Floor/Cabin details.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              2. How We Use Your Information
            </h2>
            <p>
              Your details are used strictly for:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>Fulfilling food orders, counter billing, and prompt doorstep delivery.</li>
              <li>Sending order updates, KOT receipts, and itemized monthly khata statements via WhatsApp or Email.</li>
              <li>Responding to bulk bhandara inquiries and catering proposals.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              3. Payment & Financial Security
            </h2>
            <p>
              Chaiwale operates on a 100% Zero-Tax transparent pricing model. We do not store credit card or debit card credentials on our servers. All digital payments are processed securely via authorized UPI gateways, QR codes, and certified payment channels.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              4. Contact Us
            </h2>
            <p>
              For any privacy queries, account deletions, or data requests, reach us at:
              <br />
              <strong>Chaiwale Kitchen</strong>: G-31, Vardhman Grand Plaza, Mangalam Place, Rohini Sector-3, New Delhi - 110085
              <br />
              Email: <strong>admin@chaiwale.co.in</strong> | WhatsApp: <strong>+91 88004 10441</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
