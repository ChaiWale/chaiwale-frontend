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
    switch (status) {
      case 'CONFIRMED':
        return { color: '#0284C7', bg: '#E0F2FE', label: 'Order Confirmed' };
      case 'PREPARING':
        return { color: '#D97706', bg: '#FEF3C7', label: 'Kitchen Preparing' };
      case 'OUT_FOR_DELIVERY':
        return { color: '#7C3AED', bg: '#EDE9FE', label: 'Out For Delivery' };
      case 'COMPLETED':
        return { color: '#16A34A', bg: '#DCFCE7', label: 'Delivered / Completed' };
      case 'CANCELLED':
        return { color: '#DC2626', bg: '#FEE2E2', label: 'Cancelled' };
      default:
        return { color: '#D97706', bg: '#FEF3C7', label: 'Order Placed' };
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

              <p style={{ fontSize: '13px', color: 'var(--cw-color-text-muted)', lineHeight: 1.6, marginTop: '8px' }}>
                {order.status === 'COMPLETED'
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
