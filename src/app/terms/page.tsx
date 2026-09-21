import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Chaiwale Cafe & Catering Delhi',
  description: 'Terms of service, catering terms, cancellation policies and Khata billing guidelines for Chaiwale.'
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: '#FDFBF9', minHeight: '80vh', padding: '60px 24px' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', border: '1px solid #ECE4DE', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#6F432A', textDecoration: 'underline', fontWeight: 600 }}>
            ← Back to Home
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1E2328', marginTop: '16px', marginBottom: '8px' }}>
            Terms & Conditions
          </h1>
          <p style={{ fontSize: '13px', color: '#8A7366' }}>
            Last Updated: January 1, 2026 • FSSAI License: <strong>23326001003387</strong>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px', lineHeight: 1.7, color: '#4B5563' }}>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              1. General Service Terms
            </h2>
            <p>
              Chaiwale operates cafe dine-in, takeaway, office delivery, monthly tiffin meal plans, and bulk religious/event catering (Bhandara) in Rohini and Delhi NCR. By placing an order via counter, website, or WhatsApp, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              2. Bhandara & Bulk Catering Bookings
            </h2>
            <p>
              Bhandara packages (custom headcount from 50 to 2000+ pax) and custom bulk catering require prior booking confirmation via WhatsApp (+91 88004 10441). Food is freshly prepared with 100% hygienic and satvik standards. Advance booking deposits are adjusted towards the final invoice.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              3. Monthly Meal Plans & PG Tiffin
            </h2>
            <p>
              Monthly meal plans (Basic ₹3,499, Standard ₹5,499, Premium ₹6,999) provide daily fresh on-time delivery. 3-Day Trial Meals (₹79) are available once per customer. Plan pause or date adjustments should be communicated 12 hours in advance.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              4. Canteen Khata & Corporate Accounts
            </h2>
            <p>
              Approved office and corporate clients may avail running canteen tabs. Itemized statements are sent weekly or monthly via WhatsApp. Khata settlements must be cleared within the agreed billing window via UPI or cash.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2328', marginBottom: '8px' }}>
              5. Governing Law & Kitchen Compliance
            </h2>
            <p>
              Chaiwale is fully compliant with food safety regulations under FSSAI License No. 23326001003387. All legal matters are subject to the jurisdiction of the courts of Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
