'use client';

import React, { useState } from 'react';

import { submitCateringEnquiry } from '../../services/api.client';

export default function CateringPage() {
  const [selectedService, setSelectedService] = useState('corporate');
  const [submitted, setSubmitted] = useState<{ leadNumber: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    company: '',
    eventType: 'OFFICE_LUNCH' as const,
    peopleCount: '50',
    eventDate: '',
    requirements: ''
  });

  const serviceTabs = [
    {
      id: 'corporate',
      serviceType: 'OFFICE_LUNCH' as const,
      title: 'Corporate Catering',
      subtitle: 'Office meals, meetings & events',
      icon: '🏢'
    },
    {
      id: 'bhandara',
      serviceType: 'BHANDARA' as const,
      title: 'Bhandara Catering',
      subtitle: 'For religious & community events',
      icon: '🪔'
    },
    {
      id: 'event',
      serviceType: 'EVENT_BULK' as const,
      title: 'Event Catering',
      subtitle: 'Parties, functions & gatherings',
      icon: '🎉'
    },
    {
      id: 'custom',
      serviceType: 'CUSTOM_EVENT' as const,
      title: 'Custom Food Orders',
      subtitle: 'Bihari, Champaran, Bulk & more',
      icon: '🍲'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const activeTab = serviceTabs.find((t) => t.id === selectedService);
      const serviceType = activeTab ? activeTab.serviceType : 'OFFICE_LUNCH';

      const res = await submitCateringEnquiry({
        customerName: form.name,
        phone: form.phone,
        companyName: form.company || undefined,
        serviceType,
        headcount: parseInt(form.peopleCount, 10) || 50,
        eventDate: form.eventDate || undefined,
        requirements: form.requirements || undefined
      });

      setSubmitted({ leadNumber: res.leadNumber });
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF5EE', paddingBottom: 'var(--cw-space-16)' }}>
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FAF5EE', padding: 'var(--cw-space-10) 0 var(--cw-space-6)', borderBottom: '1px solid #EAE0D2' }}>
        <div className="cw-container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cw-color-primary)', letterSpacing: '0.05em' }}>
            Dedicated Pages for Business & Large Orders
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--cw-color-dark)', marginTop: '6px' }}>
            Catering & Custom Orders
          </h1>
          <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '16px', marginTop: '6px' }}>
            Choose your service type and request a customized menu proposal for your team or event.
          </p>
        </div>
      </section>

      <div className="cw-container" style={{ maxWidth: '960px', marginTop: 'var(--cw-space-8)' }}>
        {/* 4 Interactive Service Category Selector Cards (Panel 4) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: 'var(--cw-space-8)'
          }}
        >
          {serviceTabs.map((s) => {
            const isSelected = selectedService === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                style={{
                  backgroundColor: isSelected ? '#FFFFFF' : '#F4EAE0',
                  border: isSelected ? '2px solid var(--cw-color-primary)' : '1px solid #E5D7C9',
                  borderRadius: 'var(--cw-radius-lg)',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(111, 67, 42, 0.12)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>{s.icon}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--cw-color-dark)', marginBottom: '4px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--cw-color-text-muted)', lineHeight: 1.3 }}>
                  {s.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Direct Quote Request Form (Panel 4) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--cw-radius-xl)',
            border: '1px solid var(--cw-color-border)',
            padding: 'var(--cw-space-8)',
            boxShadow: 'var(--cw-shadow-sm)'
          }}
        >
          <div style={{ borderBottom: '1px solid var(--cw-color-border-light)', paddingBottom: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--cw-color-dark)' }}>
              Request a Catering Quote
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--cw-color-text-muted)', marginTop: '4px' }}>
              Service: <strong style={{ color: 'var(--cw-color-primary)' }}>{serviceTabs.find(t => t.id === selectedService)?.title}</strong>
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <span style={{ fontSize: '48px' }}>✅</span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--cw-color-primary)', marginTop: '12px' }}>
                Requirement Submitted Successfully!
              </h3>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginTop: '6px' }}>
                Lead Reference: #{submitted.leadNumber}
              </p>
              <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '15px', maxWidth: '480px', margin: '8px auto 20px' }}>
                Our Rohini catering coordinator will review your requirements for <strong>{form.peopleCount} people</strong> and send a tailored quotation to <strong>{form.phone}</strong>.
              </p>
              <a
                href={`https://wa.me/919310112564?text=Hello%20Chaiwale,%20I%20have%20submitted%20a%20catering%20quote%20(Ref:%20${submitted.leadNumber})%20for%20${form.peopleCount}%20people.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--cw-color-whatsapp)',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: 'var(--cw-radius-md)',
                  fontWeight: 700,
                  fontSize: '14px'
                }}
              >
                Connect on WhatsApp (+91 93101 12564)
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {submitError && (
                <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--cw-radius-md)', fontSize: '13px' }}>
                  ⚠️ {submitError}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Full Name"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 99999 99999"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. Acme Technologies / RWA Sector 3"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                    Event Type
                  </label>
                  <select
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value as any })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                  >
                    <option value="OFFICE_LUNCH">Corporate Event / Office Lunch</option>
                    <option value="BHANDARA">Temple Bhandara / Religious Feast</option>
                    <option value="EVENT_BULK">Social Gathering / Birthday / Party</option>
                    <option value="CUSTOM_EVENT">Custom Food Order / Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                    No. of People
                  </label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={form.peopleCount}
                    onChange={(e) => setForm({ ...form, peopleCount: e.target.value })}
                    placeholder="e.g. 50"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                  Event Date
                </label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--cw-color-dark)' }}>
                  Your Requirements
                </label>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Tell us what you need (e.g. Pure Jain options, lunch time slot, disposable packaging, delivery address in Rohini...)"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--cw-radius-md)', border: '1px solid var(--cw-color-border)', backgroundColor: '#FAF5EE', fontSize: '14px' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: submitting ? '#94A3B8' : 'var(--cw-color-primary)',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: 'var(--cw-radius-md)',
                  fontFamily: 'var(--cw-font-heading)',
                  fontSize: '16px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(111, 67, 42, 0.2)'
                }}
              >
                {submitting ? 'Submitting Requirement...' : 'Submit Request →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
