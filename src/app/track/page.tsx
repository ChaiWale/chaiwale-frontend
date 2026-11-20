'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackOrder } from '../../services/api.client';

interface TrackedOrder {
  id: string;
  order_number: string;
  order_type: string;
  grand_total: number;
  status: string;
  payment_status: string;
  created_at: string;
  items?: Array<{
    item_name: string;
    unit_price: number;
    quantity: number;
    line_total: number;
  }>;
}

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get('order') || '';

  const [orderId, setOrderId] = useState(initialOrder);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (targetId: string) => {
    if (!targetId.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const data = await trackOrder(targetId.trim());
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Order not found. Please check your order number.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) {
      handleTrack(initialOrder);
    }
  }, [initialOrder]);

  const getStatusColor = (status: string) => {
    const s = (status || '').toUpperCase();
    switch (s) {
      case 'PENDING':
      case 'NEW':
        return { color: '#D97706', bg: '#FEF3C7', label: '🟡 Order Placed • Awaiting Store Confirmation' };
      case 'CONFIRMED':
        return { color: '#0284C7', bg: '#E0F2FE', label: '🔵 Order Confirmed by Store' };
      case 'PREPARING':
        return { color: '#D97706', bg: '#FEF3C7', label: '🍳 Kitchen Preparing Your Food' };
      case 'READY':
        return { color: '#0D9488', bg: '#CCFBF1', label: '🥡 Food Ready for Pickup / Dispatch' };
      case 'OUT_FOR_DELIVERY':
        return { color: '#7C3AED', bg: '#EDE9FE', label: '🛵 Out For Delivery' };
      case 'DELIVERED':
      case 'COMPLETED':
        return { color: '#16A34A', bg: '#DCFCE7', label: '✅ Delivered • Enjoy Your Meal!' };
      case 'CANCELLED':
        return { color: '#DC2626', bg: '#FEE2E2', label: '❌ Cancelled' };
      default:
        return { color: '#D97706', bg: '#FEF3C7', label: 'Order Received' };
    }
  };

  return (
    <div style={{ padding: 'var(--cw-space-12) 0 var(--cw-space-20)', backgroundColor: '#FAF5EE', minHeight: '80vh' }}>
      <div className="cw-container" style={{ maxWidth: '640px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--cw-space-8)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cw-color-primary)', letterSpacing: '0.06em' }}>
            Live Dispatch Status
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginTop: '6px', color: 'var(--cw-color-dark)' }}>
            Track Your Order
          </h1>
          <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '15px', marginTop: '6px' }}>
            Enter your Chaiwale order number to check preparation and delivery dispatch status in real-time.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--cw-radius-xl)',
            border: '1px solid var(--cw-color-border)',
            padding: '24px',
            boxShadow: 'var(--cw-shadow-sm)'
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack(orderId);
            }}
            style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}
          >
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. CW-123456"
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '12px 16px',
                borderRadius: 'var(--cw-radius-md)',
                border: '1px solid var(--cw-color-border)',
                backgroundColor: '#FAF5EE',
                fontSize: '14px',
                fontWeight: 600
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#94A3B8' : 'var(--cw-color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 'var(--cw-radius-md)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {error && (
            <div style={{ padding: '14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--cw-radius-md)', fontSize: '13px', textAlign: 'center' }}>
              ⚠️ {error}
            </div>
          )}

          {order && (
            <div style={{ borderTop: '1px dashed var(--cw-color-border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--cw-color-dark)' }}>
                    Order: #{order.order_number}
                  </span>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Type: <strong>{order.order_type}</strong> • Total: <strong>₹{order.grand_total}</strong>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: getStatusColor(order.status).color,
                    backgroundColor: getStatusColor(order.status).bg,
                    padding: '6px 14px',
                    borderRadius: 'var(--cw-radius-pill)'
                  }}
                >
                  {getStatusColor(order.status).label}
                </span>
              </div>

              {/* Items in Order */}
              {order.items && order.items.length > 0 && (
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: 'var(--cw-radius-md)', padding: '12px', margin: '14px 0', fontSize: '13px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '8px', color: '#334155' }}>Items Snapshot:</div>
                  {order.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                      <span>{it.quantity}x {it.item_name}</span>
                      <span style={{ fontWeight: 600 }}>₹{it.line_total}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Google Review Callout when Delivered/Completed */}
              {(order.status === 'COMPLETED' || order.status === 'DELIVERED') && (
                <div style={{
                  backgroundColor: '#FFFBEB',
                  border: '2px solid #F59E0B',
                  borderRadius: 'var(--cw-radius-lg)',
                  padding: '18px',
                  margin: '18px 0',
                  textAlign: 'center',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.18)'
                }}>
                  <div style={{ fontSize: '24px', letterSpacing: '4px', marginBottom: '6px' }}>
                    ⭐⭐⭐⭐⭐
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#92400E', marginBottom: '4px' }}>
                    Loved Your Food & Chai?
                  </div>
                  <p style={{ fontSize: '13px', color: '#78350F', margin: '0 0 14px 0' }}>
                    Please take 30 seconds to rate us and share your review on Google. It means everything to our kitchen team!
                  </p>
                  <a
                    href="https://g.page/r/Ca1qOd1BBfkEEBM/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      padding: '11px 22px',
                      borderRadius: 'var(--cw-radius-md)',
                      fontWeight: 800,
                      fontSize: '13px',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.3)'
                    }}
                  >
                    ⭐ Rate Chaiwale on Google
                  </a>
                </div>
              )}

              <p style={{ fontSize: '13px', color: 'var(--cw-color-text-muted)', lineHeight: 1.6, marginTop: '8px' }}>
                {order.status === 'COMPLETED' || order.status === 'DELIVERED'
                  ? 'Your order has been completed. Thank you for dining with Chaiwale!'
                  : 'Your order is being prepared freshly at our Rohini kitchen. For urgent queries or modifications, connect with us on WhatsApp.'}
              </p>

              <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919310112564'}?text=${encodeURIComponent(`Hi Chaiwale team, I have a query regarding my order #${order.order_number}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--cw-color-whatsapp)',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: 'var(--cw-radius-md)',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  💬 Query Order on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading tracker...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
