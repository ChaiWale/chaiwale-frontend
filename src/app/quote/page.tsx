'use client';

import React, { useState } from 'react';

import { submitCateringEnquiry } from '../../services/api.client';

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState<{ leadNumber: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    serviceType: 'OFFICE_LUNCH' as const,
    guestCount: '25',
    eventDate: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await submitCateringEnquiry({
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        companyName: formData.company || undefined,
        serviceType: formData.serviceType,
        headcount: parseInt(formData.guestCount, 10) || 25,
        eventDate: formData.eventDate || undefined,
        requirements: formData.notes || undefined
      });

      setSubmitted({ leadNumber: res.leadNumber });
    } catch (err: any) {
      setError(err.message || 'Failed to submit catering request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 'var(--cw-space-12) 0 var(--cw-space-20)' }}>
      <div className="cw-container" style={{ maxWidth: '720px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--cw-space-8)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cw-color-primary)', letterSpacing: '0.06em' }}>
            Corporate & Bulk Service
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, marginTop: '6px' }}>
            Request a Catering Quote
          </h1>
          <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '15px', marginTop: '8px' }}>
            Fill out your requirements below. Our catering coordinator will contact you with a customized menu proposal and quotation within 2 business hours.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--cw-color-surface)',
            borderRadius: 'var(--cw-radius-xl)',
            border: '1px solid var(--cw-color-border)',
            padding: 'var(--cw-space-8)',
            boxShadow: 'var(--cw-shadow-sm)'
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: 'var(--cw-space-8) 0' }}>
              <span style={{ fontSize: '48px' }}>✅</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '16px', color: 'var(--cw-color-primary)' }}>
                Quote Request Received!
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginTop: '6px' }}>
                Lead Reference: #{submitted.leadNumber}
              </p>
              <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '15px', marginTop: '8px', maxWidth: '480px', margin: '8px auto 20px' }}>
                Thank you, <strong>{formData.name}</strong>. Our team in Rohini will contact you on <strong>{formData.phone}</strong> shortly.
              </p>
              <a
                href={`https://wa.me/919310112564?text=Hello,%20I%20just%20submitted%20a%20catering%20quote%20request%20(Ref:%20${submitted.leadNumber})%20for%20${encodeURIComponent(formData.serviceType)}%20(${formData.guestCount}%20guests).`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--cw-color-whatsapp)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: 'var(--cw-radius-md)',
                  fontWeight: 700,
                  fontSize: '14px'
                }}
              >
                Expedite via WhatsApp (+91 93101 12564)
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {error && (
                <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--cw-radius-md)', fontSize: '13px' }}>
                  ⚠️ {error}
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--cw-radius-md)',
                    border: '1px solid var(--cw-color-border)',
                    backgroundColor: 'var(--cw-color-canvas)'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                    Phone Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 99999 99999"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--cw-radius-md)',
                      border: '1px solid var(--cw-color-border)',
                      backgroundColor: 'var(--cw-color-canvas)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Tech Solutions Pvt Ltd"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--cw-radius-md)',
                      border: '1px solid var(--cw-color-border)',
                      backgroundColor: 'var(--cw-color-canvas)'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                    Catering Service Required *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--cw-radius-md)',
                      border: '1px solid var(--cw-color-border)',
                      backgroundColor: 'var(--cw-color-canvas)'
                    }}
                  >
                    <option value="OFFICE_LUNCH">Daily Office Lunch Thalis</option>
                    <option value="BHANDARA">Community / Bhandara Feast</option>
                    <option value="EVENT_BULK">Event High-Tea / Snack Boxes</option>
                    <option value="CUSTOM_EVENT">Custom Gathering / Event</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                    Estimated Daily / Event Headcount *
                  </label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    placeholder="e.g. 50"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--cw-radius-md)',
                      border: '1px solid var(--cw-color-border)',
                      backgroundColor: 'var(--cw-color-canvas)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                  Specific Requirements or Dietary Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Pure Jain / No onion-garlic options needed, preferred delivery time 1:00 PM, Sector 3 Rohini location..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--cw-radius-md)',
                    border: '1px solid var(--cw-color-border)',
                    backgroundColor: 'var(--cw-color-canvas)'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#94A3B8' : 'var(--cw-color-primary)',
                  color: '#ffffff',
                  padding: '15px 24px',
                  borderRadius: 'var(--cw-radius-md)',
                  fontFamily: 'var(--cw-font-heading)',
                  fontSize: '16px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  marginTop: '10px'
                }}
              >
                {submitting ? 'Submitting Requirement...' : 'Submit Catering Requirement →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
