'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import ChaiLoader from '@/components/ui/ChaiLoader';

interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  invoiceType: string;
  status: string;
  issuedAt: string;
  customerName?: string;
  companyName?: string;
  phone?: string;
  clientPin?: string;
  paymentMode: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  paidAmount: number;
  outstandingAmount: number;
  items: InvoiceItem[];
}

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rawId = resolvedParams?.id || '';

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState<string | undefined>();
  const [invoiceNumber, setInvoiceNumber] = useState<string>(rawId);
  const [userInput, setUserInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initial lookup (and auto-check if phone in query or localStorage)
  useEffect(() => {
    if (!rawId) return;

    const urlParams = new URLSearchParams(window.location.search);
    const queryPhone = urlParams.get('phone') || localStorage.getItem('cw_customer_phone') || '';
    const queryPin = urlParams.get('pin') || localStorage.getItem('cw_customer_pin') || '';

    checkInvoice(queryPhone, queryPin);
  }, [rawId]);

  const checkInvoice = async (phone = '', pin = '') => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const query = new URLSearchParams();
      if (phone) query.set('phone', phone);
      if (pin) query.set('pin', pin);

      const res = await fetch(`/api/invoice/${encodeURIComponent(rawId)}?${query.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setRequiresAuth(true);
          setInvoiceNumber(json.data?.invoiceNumber || rawId);
          setMaskedPhone(json.data?.maskedPhone);
          setErrorMsg(json.message || 'Entered Mobile Number or PIN did not match.');
        } else {
          setErrorMsg(json.message || 'Invoice not found. Please verify the URL.');
        }
        setLoading(false);
        return;
      }

      if (json.data?.verified && json.data?.invoice) {
        setInvoice(json.data.invoice);
        setRequiresAuth(false);
        if (json.data.invoice.phone) {
          localStorage.setItem('cw_customer_phone', json.data.invoice.phone);
        }
        if (json.data.invoice.clientPin) {
          localStorage.setItem('cw_customer_pin', json.data.invoice.clientPin);
        }
      } else if (json.data?.requiresAuth) {
        setRequiresAuth(true);
        setInvoiceNumber(json.data.invoiceNumber || rawId);
        setMaskedPhone(json.data.maskedPhone);
      }
    } catch (err: any) {
      setErrorMsg('Failed to connect to billing server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) {
      setErrorMsg('Please enter your 10-digit registered mobile number or 4-digit PIN.');
      return;
    }

    setVerifying(true);
    setErrorMsg(null);
    try {
      const cleanInput = userInput.trim();
      const isPin = cleanInput.length <= 6 && !cleanInput.startsWith('+91');
      const payload: { phone?: string; pin?: string } = isPin
        ? { pin: cleanInput }
        : { phone: cleanInput };

      const res = await fetch(`/api/invoice/${encodeURIComponent(rawId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.message || 'Mobile number ya PIN match nahi hua. Kripya apna registered number dalein.');
        setVerifying(false);
        return;
      }

      if (json.data?.verified && json.data?.invoice) {
        setInvoice(json.data.invoice);
        setRequiresAuth(false);
        if (json.data.invoice.phone) {
          localStorage.setItem('cw_customer_phone', json.data.invoice.phone);
        }
        if (json.data.invoice.clientPin) {
          localStorage.setItem('cw_customer_pin', json.data.invoice.clientPin);
        }
      } else {
        setErrorMsg('Verification failed. Please try with your 10-digit phone number.');
      }
    } catch (err: any) {
      setErrorMsg('Error verifying credentials. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#120905'
        }}
      >
        <ChaiLoader
          label="Fetching Tax Invoice..."
          sublabel={`Verifying records for #${invoiceNumber}`}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '90vh',
        backgroundColor: '#FAF6F0',
        padding: '32px 16px 64px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* Brand Banner */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              marginBottom: '6px'
            }}
          >
            <span
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #D96B27 0%, #8C593B 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 4px 12px rgba(217, 107, 39, 0.3)'
              }}
            >
              ☕
            </span>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                color: '#211510',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              CHAIWALE
            </span>
          </Link>
          <p
            style={{
              fontSize: '12px',
              color: '#8C593B',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              margin: 0
            }}
          >
            Official GST & Retail Tax Invoice
          </p>
        </div>

        {/* ===================================================================
            STATE A: Verification Prompt (When customer hasn't authenticated)
           =================================================================== */}
        {requiresAuth && !invoice ? (
          <div
            style={{
              backgroundColor: '#1C100A',
              border: '1px solid rgba(217, 107, 39, 0.4)',
              borderRadius: '24px',
              padding: '32px 28px',
              boxShadow: '0 24px 60px rgba(33, 21, 16, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04)',
              color: '#FAF6F0'
            }}
          >
            {/* Header / Security Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
                paddingBottom: '18px',
                borderBottom: '1px solid rgba(140, 89, 59, 0.35)'
              }}
            >
              <span
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(217, 107, 39, 0.15)',
                  border: '1px solid rgba(217, 107, 39, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}
              >
                🔒
              </span>
              <div>
                <h2
                  style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    color: '#FAF6F0',
                    margin: '0 0 3px 0',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  Customer Security Verification
                </h2>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#C5B5A8',
                    margin: 0
                  }}
                >
                  Invoice <span style={{ color: '#D96B27', fontWeight: 800, fontFamily: 'monospace' }}>#{invoiceNumber}</span>
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: '14px',
                color: '#D4C5B9',
                marginBottom: '18px',
                lineHeight: 1.6
              }}
            >
              Customer privacy aur billing protection ke liye, kripya apna{' '}
              <strong style={{ color: '#FAF6F0' }}>Registered 10-digit Mobile Number</strong> ya{' '}
              <strong style={{ color: '#FAF6F0' }}>4-digit Khata PIN</strong> enter karein:
            </p>

            {/* Masked Phone Pill */}
            {maskedPhone && (
              <div
                style={{
                  marginBottom: '18px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#2D1A10',
                  border: '1px solid rgba(217, 107, 39, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}
              >
                <span style={{ color: '#C5B5A8', fontWeight: 500 }}>Registered Mobile:</span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: '#D96B27',
                    letterSpacing: '0.12em',
                    fontSize: '14px'
                  }}
                >
                  {maskedPhone}
                </span>
              </div>
            )}

            {/* Error Banner with High Contrast */}
            {errorMsg && (
              <div
                style={{
                  marginBottom: '18px',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(186, 37, 37, 0.25)',
                  border: '1.5px solid #BA2525',
                  color: '#FFD2D2',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  boxShadow: '0 4px 12px rgba(186, 37, 37, 0.2)'
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>⚠️</span>
                <span style={{ lineHeight: 1.4 }}>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifySubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#C5B5A8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '8px'
                  }}
                >
                  Mobile Number / Khata PIN
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="e.g. 9876907553 or 9349"
                  autoFocus
                  className="cw-invoice-input"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#120905',
                    border: '1.5px solid rgba(140, 89, 59, 0.6)',
                    color: '#FAF6F0',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    letterSpacing: '0.04em',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="cw-invoice-btn"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #D96B27 0%, #B85316 100%)',
                  color: '#FAF6F0',
                  fontWeight: 800,
                  fontSize: '15px',
                  letterSpacing: '0.03em',
                  border: 'none',
                  cursor: verifying ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(217, 107, 39, 0.35)',
                  transition: 'transform 0.15s ease, background 0.2s ease, opacity 0.2s ease',
                  opacity: verifying ? 0.7 : 1
                }}
              >
                {verifying ? (
                  <>
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #FAF6F0',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'cwSpin 0.8s linear infinite'
                      }}
                    />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '17px' }}>🔓</span>
                    <span>View Official Tax Invoice</span>
                  </>
                )}
              </button>
            </form>

            {/* Verification Footer Links */}
            <div
              style={{
                marginTop: '22px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(140, 89, 59, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px'
              }}
            >
              <Link
                href="/check-bill"
                style={{
                  color: '#D96B27',
                  textDecoration: 'underline',
                  fontWeight: 600
                }}
              >
                Know your 4-digit Khata PIN?
              </Link>
              <Link
                href="/"
                style={{
                  color: '#C5B5A8',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                Back to Home →
              </Link>
            </div>
          </div>
        ) : null}

        {/* ===================================================================
            STATE B: Verified Invoice Details
           =================================================================== */}
        {invoice ? (
          <div
            style={{
              backgroundColor: '#1C100A',
              border: '1px solid rgba(217, 107, 39, 0.45)',
              borderRadius: '24px',
              padding: '32px 28px',
              boxShadow: '0 24px 60px rgba(33, 21, 16, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04)',
              color: '#FAF6F0'
            }}
          >
            {/* Invoice Top Status Bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(140, 89, 59, 0.35)'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#C5B5A8',
                    display: 'block'
                  }}
                >
                  Invoice Reference
                </span>
                <h1
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#FAF6F0',
                    fontFamily: 'monospace',
                    letterSpacing: '-0.02em',
                    margin: '2px 0 0 0'
                  }}
                >
                  #{invoice.invoiceNumber}
                </h1>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#98877D',
                    margin: '4px 0 0 0'
                  }}
                >
                  {formatDate(invoice.issuedAt)}
                </p>
              </div>

              {/* Status Pill */}
              <div style={{ textAlign: 'right' }}>
                {invoice.status === 'PAID' ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(31, 136, 68, 0.2)',
                      border: '1px solid rgba(31, 136, 68, 0.55)',
                      color: '#4ADE80',
                      fontWeight: 800,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    <span>✓</span> Fully Settled (Paid)
                  </span>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(217, 107, 39, 0.2)',
                      border: '1px solid rgba(217, 107, 39, 0.55)',
                      color: '#FDBA74',
                      fontWeight: 800,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    <span>⚠</span> Balance Outstanding
                  </span>
                )}
                <div
                  style={{
                    fontSize: '11px',
                    color: '#C5B5A8',
                    marginTop: '5px',
                    fontFamily: 'monospace'
                  }}
                >
                  Mode: <strong style={{ color: '#FAF6F0' }}>{invoice.paymentMode}</strong>
                </div>
              </div>
            </div>

            {/* Customer & Outlet Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '18px 0',
                borderBottom: '1px solid rgba(140, 89, 59, 0.3)',
                fontSize: '13px'
              }}
            >
              <div>
                <span
                  style={{
                    color: '#98877D',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  Billed To
                </span>
                <p style={{ fontWeight: 800, color: '#FAF6F0', margin: '0 0 2px 0' }}>
                  {invoice.customerName || 'Direct Customer'}
                </p>
                {invoice.companyName && (
                  <p style={{ color: '#C5B5A8', margin: '0 0 2px 0' }}>{invoice.companyName}</p>
                )}
                {invoice.phone && (
                  <p
                    style={{
                      color: '#D96B27',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      margin: '2px 0 0 0'
                    }}
                  >
                    📱 +91 {invoice.phone}
                  </p>
                )}
              </div>

              <div>
                <span
                  style={{
                    color: '#98877D',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  Outlet & Store Desk
                </span>
                <p style={{ fontWeight: 800, color: '#FAF6F0', margin: '0 0 2px 0' }}>
                  Chaiwale Cafe
                </p>
                <p style={{ color: '#C5B5A8', margin: '0 0 2px 0', lineHeight: 1.4 }}>
                  Upper Ground Floor, Vardhman Grand Plaza, Rohini, Delhi
                </p>
                <p
                  style={{
                    color: '#D96B27',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    margin: '2px 0 0 0'
                  }}
                >
                  📞 +91 93101 12564
                </p>
              </div>
            </div>

            {/* Line Items Table */}
            <div style={{ padding: '18px 0', borderBottom: '1px solid rgba(140, 89, 59, 0.3)' }}>
              <span
                style={{
                  color: '#98877D',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                Itemized Summary
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: '#25150E',
                        border: '1px solid rgba(140, 89, 59, 0.25)'
                      }}
                    >
                      <div style={{ flex: 1, paddingRight: '12px' }}>
                        <p
                          style={{
                            fontWeight: 700,
                            color: '#FAF6F0',
                            fontSize: '14px',
                            margin: '0 0 3px 0'
                          }}
                        >
                          {it.name}
                        </p>
                        <p
                          style={{
                            fontSize: '11px',
                            color: '#98877D',
                            margin: 0
                          }}
                        >
                          ₹{it.unitPrice.toFixed(2)} × {it.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: '#FAF6F0',
                            fontSize: '14px'
                          }}
                        >
                          ₹{(it.quantity * it.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '13px', color: '#98877D', fontStyle: 'italic', margin: 0 }}>
                    No items detailed
                  </p>
                )}
              </div>
            </div>

            {/* Financials Breakdown */}
            <div
              style={{
                padding: '18px 0',
                borderBottom: '1px solid rgba(140, 89, 59, 0.4)',
                fontSize: '13px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C5B5A8' }}>
                <span>Items Subtotal:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#FAF6F0' }}>
                  ₹{invoice.subtotal.toFixed(2)}
                </span>
              </div>

              {invoice.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ADE80' }}>
                  <span>Discount Applied:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    -₹{invoice.discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              {invoice.taxAmount > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C5B5A8' }}>
                  <span>Restaurant GST (5%):</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#FAF6F0' }}>
                    ₹{invoice.taxAmount.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#98877D' }}>
                  <span>GST:</span>
                  <span style={{ fontFamily: 'monospace' }}>₹0.00 (Exempt/Retail)</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '17px',
                  fontWeight: 900,
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(140, 89, 59, 0.4)',
                  color: '#FAF6F0'
                }}
              >
                <span>Grand Total:</span>
                <span style={{ fontFamily: 'monospace', color: '#D96B27' }}>
                  ₹{invoice.grandTotal.toFixed(2)}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#4ADE80'
                }}
              >
                <span>Amount Paid:</span>
                <span style={{ fontFamily: 'monospace' }}>₹{invoice.paidAmount.toFixed(2)}</span>
              </div>

              {invoice.outstandingAmount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#F87171',
                    paddingTop: '6px',
                    borderTop: '1px dashed rgba(248, 113, 113, 0.4)'
                  }}
                >
                  <span>Balance Due:</span>
                  <span style={{ fontFamily: 'monospace' }}>
                    ₹{invoice.outstandingAmount.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ paddingTop: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`/api/pdf/invoice/${encodeURIComponent(invoice.invoiceNumber || invoice.id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-invoice-btn"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #D96B27 0%, #B85316 100%)',
                  color: '#FAF6F0',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.03em',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(217, 107, 39, 0.35)',
                  boxSizing: 'border-box'
                }}
              >
                <span>📄</span> Download Tax Invoice (PDF)
              </a>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Link
                  href={
                    invoice.phone
                      ? `/check-bill?phone=${encodeURIComponent(invoice.phone)}${invoice.clientPin ? `&pin=${encodeURIComponent(invoice.clientPin)}` : ''}`
                      : '/check-bill'
                  }
                  style={{
                    flex: '1 1 180px',
                    padding: '13px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#2D1A10',
                    color: '#FAF6F0',
                    fontWeight: 700,
                    fontSize: '12px',
                    textDecoration: 'none',
                    border: '1px solid rgba(140, 89, 59, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>☕</span> View Full Khata Ledger
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const shareText = `Namaste! Here is your official Chaiwale Tax Invoice #${invoice.invoiceNumber} (Total: ₹${invoice.grandTotal.toFixed(2)}). View details: ${window.location.href}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
                  }}
                  style={{
                    flex: '1 1 180px',
                    padding: '13px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(37, 211, 102, 0.15)',
                    color: '#4ADE80',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>💬</span> Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Global Footer */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#8C7769',
            marginTop: '28px',
            lineHeight: 1.5
          }}
        >
          Chaiwale Cafe & Catering Services • Mangalam Place, Sector-3, Rohini, New Delhi
        </p>
      </div>

      {/* Scoped CSS for Interactions */}
      <style jsx global>{`
        .cw-invoice-input:focus {
          border-color: #D96B27 !important;
          box-shadow: 0 0 0 3px rgba(217, 107, 39, 0.25) !important;
        }
        .cw-invoice-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.06);
        }
        .cw-invoice-btn:active {
          transform: translateY(1px);
        }
        @keyframes cwSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
