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
        // Persist verified phone/pin in session for smooth subsequent viewing
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

  // Format date helper
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
      <div className="min-h-[80vh] flex items-center justify-center bg-[#120905]">
        <ChaiLoader
          label="Fetching Tax Invoice..."
          sublabel={`Verifying records for #${invoiceNumber}`}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120905] text-[#FAF6F0] py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Brand Banner */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D96B27] to-[#8C593B] flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              ☕
            </span>
            <span className="text-2xl font-black font-heading tracking-wide text-[#FAF6F0]">
              CHAIWALE
            </span>
          </Link>
          <p className="text-xs text-[#C5B5A8] tracking-wider uppercase font-semibold">
            Official GST & Retail Tax Invoice
          </p>
        </div>

        {/* ===================================================================
            STATE A: Verification Prompt (When customer hasn't authenticated)
           =================================================================== */}
        {requiresAuth && !invoice ? (
          <div className="bg-[#1C100A] border border-[#8C593B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#8C593B]/30">
              <span className="w-10 h-10 rounded-xl bg-[#D96B27]/20 border border-[#D96B27]/40 flex items-center justify-center text-lg text-[#D96B27]">
                🔒
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#FAF6F0] font-heading">
                  Customer Security Verification
                </h2>
                <p className="text-xs text-[#C5B5A8]">
                  Invoice <span className="text-[#D96B27] font-bold">#{invoiceNumber}</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-[#D4C5B9] mb-5 leading-relaxed">
              Customer privacy aur billing protection ke lie, kripya apna{' '}
              <strong className="text-[#FAF6F0]">Registered 10-digit Mobile Number</strong> ya{' '}
              <strong className="text-[#FAF6F0]">4-digit Khata PIN</strong> enter karein:
            </p>

            {maskedPhone && (
              <div className="mb-4 px-3.5 py-2 rounded-xl bg-[#2D1A10] border border-[#8C593B]/40 flex items-center justify-between text-xs">
                <span className="text-[#C5B5A8]">Registered Mobile:</span>
                <span className="font-mono font-bold text-[#D96B27] tracking-wider">{maskedPhone}</span>
              </div>
            )}

            {/* Error Banner with High Contrast */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-[#BA2525]/20 border border-[#BA2525]/60 text-[#FFD2D2] text-xs font-semibold flex items-start gap-2 shadow-sm animate-shake">
                <span className="text-sm mt-0.5">⚠️</span>
                <span className="leading-snug">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#C5B5A8] uppercase tracking-wider mb-1.5">
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
                  className="w-full px-4 py-3.5 rounded-xl bg-[#120905] border border-[#8C593B]/60 text-[#FAF6F0] placeholder-[#705F55] font-mono text-base focus:outline-none focus:border-[#D96B27] focus:ring-2 focus:ring-[#D96B27]/30 transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 px-4 rounded-xl bg-[#D96B27] hover:bg-[#C05818] active:scale-[0.98] text-[#FAF6F0] font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying Credentials...
                  </>
                ) : (
                  <>
                    <span>🔓</span> View Official Tax Invoice
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#8C593B]/30 flex items-center justify-between text-xs text-[#98877D]">
              <Link href="/check-bill" className="hover:text-[#D96B27] transition-colors underline">
                Know your 4-digit Khata PIN?
              </Link>
              <Link href="/" className="hover:text-[#FAF6F0] transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        ) : null}

        {/* ===================================================================
            STATE B: Verified Invoice Details
           =================================================================== */}
        {invoice ? (
          <div className="bg-[#1C100A] border border-[#8C593B]/50 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
            {/* Invoice Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#8C593B]/40">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5B5A8]">
                  Invoice Reference
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-[#FAF6F0] font-mono tracking-tight">
                  #{invoice.invoiceNumber}
                </h1>
                <p className="text-xs text-[#98877D] mt-0.5">
                  {formatDate(invoice.issuedAt)}
                </p>
              </div>

              {/* Status Pill */}
              <div className="text-right">
                {invoice.status === 'PAID' ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F8844]/20 border border-[#1F8844]/50 text-[#4ADE80] font-bold text-xs uppercase tracking-wider shadow-sm">
                    <span>✓</span> Fully Settled (Paid)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D96B27]/20 border border-[#D96B27]/50 text-[#FDBA74] font-bold text-xs uppercase tracking-wider shadow-sm">
                    <span>⚠</span> Balance Outstanding
                  </span>
                )}
                <div className="text-[11px] text-[#C5B5A8] mt-1 font-mono">
                  Mode: <strong className="text-[#FAF6F0]">{invoice.paymentMode}</strong>
                </div>
              </div>
            </div>

            {/* Customer & Outlet Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-[#8C593B]/30 text-xs">
              <div>
                <span className="text-[#98877D] uppercase font-bold text-[10px] tracking-wider block mb-1">
                  Billed To
                </span>
                <p className="text-sm font-bold text-[#FAF6F0]">
                  {invoice.customerName || 'Direct Customer'}
                </p>
                {invoice.companyName && (
                  <p className="text-[#C5B5A8]">{invoice.companyName}</p>
                )}
                {invoice.phone && (
                  <p className="text-[#D96B27] font-mono font-semibold mt-0.5">
                    📱 +91 {invoice.phone}
                  </p>
                )}
              </div>

              <div className="sm:text-right">
                <span className="text-[#98877D] uppercase font-bold text-[10px] tracking-wider block mb-1">
                  Outlet & Store Desk
                </span>
                <p className="text-sm font-bold text-[#FAF6F0]">Chaiwale Cafe</p>
                <p className="text-[#C5B5A8] leading-tight">
                  Upper Ground Floor, Vardhman Grand Plaza, Rohini, Delhi
                </p>
                <p className="text-[#D96B27] font-mono font-semibold mt-0.5">
                  📞 +91 93101 12564
                </p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-4 border-b border-[#8C593B]/30">
              <span className="text-[#98877D] uppercase font-bold text-[10px] tracking-wider block mb-3">
                Itemized Summary
              </span>

              <div className="space-y-2.5">
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-[#25150E] border border-[#8C593B]/20"
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-bold text-[#FAF6F0] text-sm leading-tight">
                          {it.name}
                        </p>
                        <p className="text-[11px] text-[#98877D]">
                          ₹{it.unitPrice.toFixed(2)} × {it.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#FAF6F0] text-sm">
                          ₹{(it.quantity * it.unitPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#98877D] italic">No items detailed</p>
                )}
              </div>
            </div>

            {/* Financials Breakdown */}
            <div className="py-4 space-y-2 text-xs border-b border-[#8C593B]/40">
              <div className="flex justify-between text-[#C5B5A8]">
                <span>Items Subtotal:</span>
                <span className="font-mono font-semibold text-[#FAF6F0]">₹{invoice.subtotal.toFixed(2)}</span>
              </div>

              {invoice.discountAmount > 0 && (
                <div className="flex justify-between text-[#4ADE80]">
                  <span>Discount Applied:</span>
                  <span className="font-mono font-semibold">-₹{invoice.discountAmount.toFixed(2)}</span>
                </div>
              )}

              {invoice.taxAmount > 0 ? (
                <div className="flex justify-between text-[#C5B5A8]">
                  <span>Restaurant GST (5%):</span>
                  <span className="font-mono font-semibold text-[#FAF6F0]">₹{invoice.taxAmount.toFixed(2)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-[#98877D]">
                  <span>GST:</span>
                  <span className="font-mono">₹0.00 (Exempt/Retail)</span>
                </div>
              )}

              <div className="flex justify-between text-base font-extrabold pt-2 border-t border-[#8C593B]/40 text-[#FAF6F0]">
                <span>Grand Total:</span>
                <span className="font-mono text-[#D96B27]">₹{invoice.grandTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs pt-1 font-semibold text-[#4ADE80]">
                <span>Amount Paid:</span>
                <span className="font-mono">₹{invoice.paidAmount.toFixed(2)}</span>
              </div>

              {invoice.outstandingAmount > 0 && (
                <div className="flex justify-between text-xs pt-1 font-bold text-[#F87171] border-t border-dashed border-[#F87171]/40">
                  <span>Balance Due:</span>
                  <span className="font-mono">₹{invoice.outstandingAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <a
                href={`/api/pdf/invoice/${encodeURIComponent(invoice.invoiceNumber || invoice.id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#D96B27] hover:bg-[#C05818] active:scale-[0.98] text-[#FAF6F0] font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>📄</span> Download Tax Invoice (PDF)
              </a>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Link
                  href={
                    invoice.phone
                      ? `/check-bill?phone=${encodeURIComponent(invoice.phone)}${invoice.clientPin ? `&pin=${encodeURIComponent(invoice.clientPin)}` : ''}`
                      : '/check-bill'
                  }
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2D1A10] hover:bg-[#3D2517] active:scale-[0.98] text-[#FAF6F0] font-semibold text-xs transition-all border border-[#8C593B]/50 flex items-center justify-center gap-1.5"
                >
                  <span>☕</span> View Full Khata Ledger
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const shareText = `Namaste! Here is your official Chaiwale Tax Invoice #${invoice.invoiceNumber} (Total: ₹${invoice.grandTotal.toFixed(2)}). View details: ${window.location.href}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#4ADE80] border border-[#25D366]/40 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>💬</span> Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Global Footer */}
        <p className="text-center text-xs text-[#705F55] mt-8">
          Chaiwale Cafe & Catering Services • Mangalam Place, Sector-3, Rohini, New Delhi
        </p>
      </div>
    </div>
  );
}
