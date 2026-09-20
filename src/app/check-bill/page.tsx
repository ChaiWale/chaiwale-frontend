'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface BillData {
  name: string;
  company?: string;
  balanceDue: number;
  totalConsumption: number;
  totalPayments: number;
  recentEntries: { date: string; item_name: string; quantity: number; total_amount: number }[];
}

export default function CheckBillPage() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bill, setBill] = useState<BillData | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBill(null);
    try {
      const res = await fetch(`${BACKEND}/api/v1/khata/customer/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), pin: pin.trim().toUpperCase() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || 'Account not found. Please check your phone and PIN.');
      } else {
        setBill(data.data);
      }
    } catch {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FAF5EE', padding: '48px 16px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: '#6F432A', boxShadow: '0 2px 8px rgba(33,21,16,0.08)', marginBottom: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#6F432A', marginBottom: '6px' }}>
            Check Your Bill
          </h1>
          <p style={{ color: '#705F55', fontSize: '14px' }}>
            Enter your registered phone number and the PIN provided by Chaiwale to view your account balance.
          </p>
        </div>

        {/* Lookup Form */}
        {!bill && (
          <form
            onSubmit={handleLookup}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EAE0D2',
              padding: '32px',
              boxShadow: '0 4px 16px rgba(33,21,16,0.06)'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#211510', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your registered mobile number"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #EAE0D2',
                  backgroundColor: '#FAF5EE',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#211510', marginBottom: '6px' }}>
                4-Digit PIN (provided by Chaiwale)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4-digit PIN (e.g. 4829)"
                maxLength={4}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #EAE0D2',
                  backgroundColor: '#FAF5EE',
                  fontSize: '18px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 14px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                color: '#991B1B',
                fontSize: '13px',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                backgroundColor: loading ? '#C5A090' : '#6F432A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Checking...' : 'View My Bill'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#98877D' }}>
              Don&apos;t have a PIN? Contact us on{' '}
              <a href="https://wa.me/919310112564" style={{ color: '#25D366', fontWeight: 600 }}>WhatsApp</a>
            </p>
          </form>
        )}

        {/* Bill Result */}
        {bill && (
          <div>
            {/* Account Summary */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EAE0D2',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(33,21,16,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#211510' }}>{bill.name}</h2>
                  {bill.company && <p style={{ fontSize: '13px', color: '#705F55', marginTop: '2px' }}>{bill.company}</p>}
                </div>
                <button
                  onClick={() => { setBill(null); setPhone(''); setPin(''); }}
                  style={{ fontSize: '12px', color: '#6F432A', background: 'none', border: '1px solid #EAE0D2', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ textAlign: 'center', backgroundColor: bill.balanceDue > 0 ? '#FEF2F2' : '#ECFDF5', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: bill.balanceDue > 0 ? '#991B1B' : '#065F46' }}>
                    ₹{bill.balanceDue.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '11px', color: '#705F55', marginTop: '2px', fontWeight: 600 }}>Balance Due</div>
                </div>
                <div style={{ textAlign: 'center', backgroundColor: '#F5EFE6', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#6F432A' }}>
                    ₹{bill.totalConsumption.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '11px', color: '#705F55', marginTop: '2px', fontWeight: 600 }}>Total Orders</div>
                </div>
                <div style={{ textAlign: 'center', backgroundColor: '#ECFDF5', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#065F46' }}>
                    ₹{bill.totalPayments.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '11px', color: '#705F55', marginTop: '2px', fontWeight: 600 }}>Total Paid</div>
                </div>
              </div>

              {bill.balanceDue > 0 && (
                <a
                  href={`https://wa.me/919310112564?text=Hi%20Chaiwale%2C%20I%20would%20like%20to%20clear%20my%20balance%20of%20%E2%82%B9${bill.balanceDue}%20for%20account%20%22${encodeURIComponent(bill.name)}%22.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '16px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  Pay ₹{bill.balanceDue.toLocaleString('en-IN')} via WhatsApp
                </a>
              )}
            </div>

            {/* Recent Entries */}
            {bill.recentEntries.length > 0 && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EAE0D2',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(33,21,16,0.06)'
              }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #EAE0D2' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#211510' }}>Recent Orders</h3>
                </div>
                <div>
                  {bill.recentEntries.map((entry, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 20px',
                        borderBottom: i < bill.recentEntries.length - 1 ? '1px solid #F5EFE6' : 'none'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#211510' }}>{entry.item_name}</div>
                        <div style={{ fontSize: '12px', color: '#98877D', marginTop: '2px' }}>
                          {formatDate(entry.date)} &middot; Qty: {entry.quantity}
                        </div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#6F432A' }}>
                        ₹{entry.total_amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
