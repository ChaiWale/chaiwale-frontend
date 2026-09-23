'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ThermalReceiptModal, ThermalReceiptData } from '../../components/ui/ThermalReceiptModal';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface InvoiceItem {
  id?: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

interface InvoiceRecord {
  id: string;
  invoice_number: string;
  order_id?: string;
  invoice_type: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  grand_total: number;
  status: string;
  issued_at: string;
  created_at: string;
  paid_amount: number;
  outstanding_amount?: number;
  department?: string;
  orders?: {
    id: string;
    order_number: string;
    order_type: string;
    delivery_address?: string;
    status: string;
    payment_mode?: string;
    payment_status?: string;
    order_items?: InvoiceItem[];
  };
}

interface KhataSummary {
  name: string;
  company?: string;
  balanceDue: number;
  totalConsumption: number;
  totalPayments: number;
  recentEntries: { date: string; item_name: string; quantity: number; total_amount: number }[];
}

function CheckBillContent() {
  const searchParams = useSearchParams();
  const urlPhone = searchParams.get('phone') || '';
  const urlPin = searchParams.get('pin') || '';
  const urlBill = searchParams.get('bill') || '';

  const [phone, setPhone] = useState(urlPhone);
  const [pin, setPin] = useState(urlPin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Loaded data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState('Customer');
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [khataSummary, setKhataSummary] = useState<KhataSummary | null>(null);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<string | null>(urlBill || null);
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');

  // Thermal Receipt Modal
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptModalData, setReceiptModalData] = useState<ThermalReceiptData | null>(null);

  // Live Store Profile
  const [storeProfile, setStoreProfile] = useState<{
    store_name: string;
    address: string;
    phone: string;
    whatsapp: string;
  }>({
    store_name: 'Chaiwale',
    address: 'G-31, Vardhman Grand Plaza, Mangalam Place, Rohini Sector-3, New Delhi - 110085',
    phone: '+91 93101 12564',
    whatsapp: '919310112564'
  });

  useEffect(() => {
    fetch(`${BACKEND}/api/v1/config/store-profile`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && res?.data) setStoreProfile(res.data);
      })
      .catch(() => {});
  }, []);

  // Auto-authenticate if credentials provided via WhatsApp URL
  useEffect(() => {
    if (urlPhone && urlPhone.trim().length >= 7) {
      performLookup(urlPhone.trim(), urlPin.trim(), urlBill.trim());
    }
  }, [urlPhone, urlPin, urlBill]);

  const performLookup = async (lookupPhone: string, lookupPin: string, targetBill?: string) => {
    setLoading(true);
    setError(null);

    const cleanPhone = lookupPhone.replace(/[\s\-]/g, '').replace(/^\+91/, '').replace(/^91/, '').slice(-10);

    try {
      // 1. Fetch customer's full invoice stream
      const invUrl = `${BACKEND}/api/v1/billing/customer-bills?phone=${encodeURIComponent(cleanPhone)}${lookupPin ? `&pin=${encodeURIComponent(lookupPin)}` : ''}`;
      const invRes = await fetch(invUrl);
      const invJson = await invRes.json();

      // 2. Fetch Khata balance if PIN provided
      let khataData: KhataSummary | null = null;
      if (lookupPin) {
        try {
          const khataRes = await fetch(`${BACKEND}/api/v1/khata/customer/lookup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: cleanPhone, pin: lookupPin.toUpperCase() })
          });
          const kJson = await khataRes.json();
          if (kJson.success && kJson.data) {
            khataData = kJson.data;
          }
        } catch {
          // non-blocking
        }
      }

      if (invJson.success && Array.isArray(invJson.data?.invoices) && invJson.data.invoices.length > 0) {
        const fetchedInvoices: InvoiceRecord[] = invJson.data.invoices;
        setInvoices(fetchedInvoices);
        setCustomerName(invJson.data.accountName || khataData?.name || 'Valued Customer');
        setKhataSummary(khataData);
        setIsLoggedIn(true);

        if (targetBill) {
          const found = fetchedInvoices.find((i) => i.invoice_number.toUpperCase() === targetBill.toUpperCase());
          if (found) setSelectedInvoiceNumber(found.invoice_number);
          else setSelectedInvoiceNumber(fetchedInvoices[0].invoice_number);
        } else {
          setSelectedInvoiceNumber(fetchedInvoices[0].invoice_number);
        }
      } else if (khataData) {
        // Customer has Khata but no direct retail invoices
        setKhataSummary(khataData);
        setCustomerName(khataData.name || 'Valued Customer');
        setIsLoggedIn(true);
      } else {
        setError('No bills found matching this phone number. Please verify your phone number and PIN.');
      }
    } catch {
      setError('Could not connect to Chaiwale server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Please enter your mobile number.');
      return;
    }
    performLookup(phone.trim(), pin.trim(), selectedInvoiceNumber || undefined);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInvoices([]);
    setKhataSummary(null);
    setSelectedInvoiceNumber(null);
    setPhone('');
    setPin('');
  };

  // Group invoices by Month
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    invoices.forEach((inv) => {
      const d = new Date(inv.issued_at || inv.created_at);
      if (!isNaN(d.getTime())) {
        const key = d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
        monthsSet.add(key);
      }
    });
    return Array.from(monthsSet);
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    if (selectedMonth === 'ALL') return invoices;
    return invoices.filter((inv) => {
      const d = new Date(inv.issued_at || inv.created_at);
      if (isNaN(d.getTime())) return false;
      const key = d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      return key === selectedMonth;
    });
  }, [invoices, selectedMonth]);

  const activeInvoice = useMemo(() => {
    if (!selectedInvoiceNumber && invoices.length > 0) return invoices[0];
    return invoices.find((i) => i.invoice_number === selectedInvoiceNumber) || invoices[0] || null;
  }, [invoices, selectedInvoiceNumber]);

  // Open 3D Thermal Slip modal
  const handleOpenThermalSlip = (inv: InvoiceRecord) => {
    const rawItems = inv.orders?.order_items || [];
    const items = rawItems.length > 0
      ? rawItems.map((it) => ({
          name: it.item_name,
          quantity: Number(it.quantity || 1),
          unitPrice: Number(it.unit_price || 0),
          lineTotal: Number(it.line_total || it.unit_price * it.quantity)
        }))
      : [
          {
            name: 'Order Items',
            quantity: 1,
            unitPrice: Number(inv.grand_total),
            lineTotal: Number(inv.grand_total)
          }
        ];

    const paymentMode = (inv.orders?.payment_mode || (inv.status === 'UNPAID' ? 'CREDIT' : 'CASH')) as any;

    setReceiptModalData({
      receiptType: 'CUSTOMER_BILL',
      invoiceNumber: inv.invoice_number,
      orderNumber: inv.orders?.order_number,
      date: inv.issued_at || inv.created_at,
      paymentMode,
      customerName: customerName || 'Valued Customer',
      customerPhone: phone,
      customerAddress: inv.orders?.delivery_address || 'Takeaway Counter',
      items,
      subtotal: Number(inv.subtotal),
      tax: Number(inv.tax_amount || 0),
      discount: Number(inv.discount_amount || 0),
      grandTotal: Number(inv.grand_total),
      pdfDownloadUrl: `${BACKEND}/api/v1/documents/pdf/invoice/${encodeURIComponent(inv.invoice_number)}`,
      storeName: storeProfile.store_name,
      storeAddress: storeProfile.address,
      storePhone: storeProfile.phone
    });
    setReceiptModalOpen(true);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'N/A';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ minHeight: '85vh', backgroundColor: '#FAF7F2', padding: '40px 16px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#FFFFFF', color: '#6F432A', boxShadow: '0 4px 12px rgba(33,21,16,0.08)', marginBottom: '12px' }}>
            <span style={{ fontSize: '28px' }}>☕</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#2B170B', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Chaiwale Customer Bill Portal
          </h1>
          <p style={{ color: '#786558', fontSize: '13px' }}>
            Live tax invoices, thermal slips & order history • {storeProfile.address}
          </p>
        </div>

        {/* ── NOT LOGGED IN: Lookup Form ── */}
        {!isLoggedIn ? (
          <form
            onSubmit={handleManualSubmit}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EADBCC',
              padding: '32px 28px',
              boxShadow: '0 8px 30px rgba(33,21,16,0.06)'
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#211510', marginBottom: '8px' }}>
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9650216602"
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #EADBCC',
                  backgroundColor: '#FCFAF7',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#211510' }}>
                  4-Digit Access PIN
                </label>
                <span style={{ fontSize: '11px', color: '#8C7769' }}>Received via WhatsApp on your bill</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4-digit PIN (e.g. 4829)"
                maxLength={4}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #EADBCC',
                  backgroundColor: '#FCFAF7',
                  fontSize: '18px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  letterSpacing: '0.25em',
                  textAlign: 'center',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                borderRadius: '10px',
                color: '#991B1B',
                fontSize: '13px',
                marginBottom: '20px',
                lineHeight: 1.4
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#A88D7E' : '#6F432A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(111,67,42,0.25)'
              }}
            >
              {loading ? 'Verifying & Loading Bills...' : '🔍 View My Bills & Receipts'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#8C7769' }}>
              Need assistance or missing PIN?{' '}
              <a
                href={`https://wa.me/${storeProfile.whatsapp}?text=Hello%20Chaiwale!%20I%20need%20my%20bill%20portal%20access%20PIN.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#16A34A', fontWeight: 700, textDecoration: 'none' }}
              >
                💬 WhatsApp Store Support
              </a>
            </div>
          </form>
        ) : (
          /* ── LOGGED IN: Full Bills & Receipts View ── */
          <div>
            {/* Top User Bar */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EADBCC',
              padding: '16px 20px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(33,21,16,0.04)'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#2B170B' }}>
                  {customerName}
                </div>
                <div style={{ fontSize: '12px', color: '#786558', marginTop: '2px' }}>
                  📱 +91 {phone} {pin ? `• PIN: ${pin}` : ''}
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#F7F2EB',
                  border: '1px solid #EADBCC',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#6F432A',
                  cursor: 'pointer'
                }}
              >
                Exit / Switch Number
              </button>
            </div>

            {/* Optional Khata Summary Card */}
            {khataSummary && khataSummary.totalConsumption > 0 && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EADBCC',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(33,21,16,0.04)'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#8C7769', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Khata Account Summary
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div style={{ textAlign: 'center', backgroundColor: khataSummary.balanceDue > 0 ? '#FEE2E2' : '#DCFCE7', borderRadius: '10px', padding: '12px 8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: khataSummary.balanceDue > 0 ? '#991B1B' : '#15803D' }}>
                      ₹{khataSummary.balanceDue}
                    </div>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#786558', marginTop: '2px' }}>Balance Due</div>
                  </div>
                  <div style={{ textAlign: 'center', backgroundColor: '#F7F2EB', borderRadius: '10px', padding: '12px 8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#6F432A' }}>
                      ₹{khataSummary.totalConsumption}
                    </div>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#786558', marginTop: '2px' }}>Total Orders</div>
                  </div>
                  <div style={{ textAlign: 'center', backgroundColor: '#DCFCE7', borderRadius: '10px', padding: '12px 8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#15803D' }}>
                      ₹{khataSummary.totalPayments}
                    </div>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#786558', marginTop: '2px' }}>Total Settled</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Active Selected Bill Detail ── */}
            {activeInvoice && (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '2px solid #6F432A',
                overflow: 'hidden',
                marginBottom: '28px',
                boxShadow: '0 8px 24px rgba(111,67,42,0.1)'
              }}>
                {/* Bill Header Banner */}
                <div style={{
                  backgroundColor: '#6F432A',
                  color: '#FFFFFF',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>Tax Invoice Details</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>#{activeInvoice.invoice_number}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      backgroundColor: activeInvoice.status === 'PAID' ? '#DCFCE7' : '#FEE2E2',
                      color: activeInvoice.status === 'PAID' ? '#15803D' : '#DC2626'
                    }}>
                      {activeInvoice.status === 'PAID' ? '✓ PAID' : '⏳ CREDIT'}
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '3px' }}>
                      {formatDate(activeInvoice.issued_at || activeInvoice.created_at)}
                    </div>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#8C7769', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Items Ordered
                  </div>

                  {activeInvoice.orders?.order_items && activeInvoice.orders.order_items.length > 0 ? (
                    <div style={{ borderBottom: '1px dashed #E5E7EB', paddingBottom: '12px', marginBottom: '14px' }}>
                      {activeInvoice.orders.order_items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '6px 0',
                            fontSize: '13.5px',
                            color: '#1F2937'
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 700, color: '#6F432A' }}>{item.quantity}x</span> {item.item_name}
                          </div>
                          <div style={{ fontWeight: 700 }}>
                            ₹{Number(item.line_total || item.unit_price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#6B7280', padding: '8px 0', borderBottom: '1px dashed #E5E7EB', marginBottom: '14px' }}>
                      Takeaway counter order #{activeInvoice.orders?.order_number || activeInvoice.invoice_number}
                    </div>
                  )}

                  {/* Financial Summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                      <span>Subtotal</span>
                      <span>₹{Number(activeInvoice.subtotal).toFixed(2)}</span>
                    </div>
                    {Number(activeInvoice.tax_amount || 0) > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                        <span>GST (5%)</span>
                        <span>₹{Number(activeInvoice.tax_amount).toFixed(2)}</span>
                      </div>
                    )}
                    {Number(activeInvoice.discount_amount || 0) > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                        <span>Discount</span>
                        <span>-₹{Number(activeInvoice.discount_amount).toFixed(2)}</span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '17px',
                      fontWeight: 900,
                      color: '#111827',
                      paddingTop: '8px',
                      marginTop: '4px',
                      borderTop: '1.5px solid #E5E7EB'
                    }}>
                      <span>Grand Total</span>
                      <span style={{ color: '#6F432A' }}>₹{Number(activeInvoice.grand_total).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Direct Action Buttons: PDF & Thermal */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                    <button
                      onClick={() => handleOpenThermalSlip(activeInvoice)}
                      style={{
                        padding: '12px',
                        backgroundColor: '#FAF5EE',
                        border: '1.5px solid #6F432A',
                        color: '#6F432A',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      🧾 View Thermal Slip
                    </button>
                    <a
                      href={`${BACKEND}/api/v1/documents/pdf/invoice/${encodeURIComponent(activeInvoice.invoice_number)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '12px',
                        backgroundColor: '#6F432A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      📄 Download Tax Invoice (PDF)
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ── Month-wise & Date-wise Past Bills History ── */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EADBCC',
              padding: '24px 20px',
              boxShadow: '0 4px 16px rgba(33,21,16,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#2B170B', margin: 0 }}>
                  All Your Bills ({invoices.length})
                </h3>

                {/* Month Filters */}
                {availableMonths.length > 1 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedMonth('ALL')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        border: '1px solid',
                        borderColor: selectedMonth === 'ALL' ? '#6F432A' : '#E5E7EB',
                        backgroundColor: selectedMonth === 'ALL' ? '#6F432A' : '#FFFFFF',
                        color: selectedMonth === 'ALL' ? '#FFFFFF' : '#4B5563',
                        cursor: 'pointer'
                      }}
                    >
                      All Months
                    </button>
                    {availableMonths.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMonth(m)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          border: '1px solid',
                          borderColor: selectedMonth === m ? '#6F432A' : '#E5E7EB',
                          backgroundColor: selectedMonth === m ? '#6F432A' : '#FFFFFF',
                          color: selectedMonth === m ? '#FFFFFF' : '#4B5563',
                          cursor: 'pointer'
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {filteredInvoices.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>
                  No bills found for the selected month.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredInvoices.map((inv) => {
                    const isSelected = activeInvoice?.invoice_number === inv.invoice_number;
                    const itemsCount = inv.orders?.order_items?.length || 1;

                    return (
                      <div
                        key={inv.id}
                        onClick={() => setSelectedInvoiceNumber(inv.invoice_number)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid #6F432A' : '1px solid #F3F4F6',
                          backgroundColor: isSelected ? '#FAF5EE' : '#F9FAFB',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '13px', color: '#111827' }}>
                              #{inv.invoice_number}
                            </span>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 800,
                              backgroundColor: inv.status === 'PAID' ? '#DCFCE7' : '#FEE2E2',
                              color: inv.status === 'PAID' ? '#15803D' : '#DC2626'
                            }}>
                              {inv.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                            {formatDate(inv.issued_at || inv.created_at)} • {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 900, fontSize: '15px', color: '#111827' }}>
                            ₹{Number(inv.grand_total).toFixed(2)}
                          </div>
                          <div style={{ fontSize: '11px', color: '#6F432A', fontWeight: 700, marginTop: '2px' }}>
                            {isSelected ? '● Viewing' : 'View Bill ›'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 3D Thermal Receipt Dispenser Modal */}
      <ThermalReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        data={receiptModalData}
      />
    </div>
  );
}

export default function CheckBillPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF7F2' }}>
        <div style={{ textAlign: 'center', color: '#6F432A' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>☕</div>
          <div style={{ fontWeight: 700 }}>Loading Chaiwale Bill Portal...</div>
        </div>
      </div>
    }>
      <CheckBillContent />
    </Suspense>
  );
}
