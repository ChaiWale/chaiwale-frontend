'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FoodCard } from '../../components/ui/FoodCard';
import { fetchCategories, fetchMenuItems, submitOrder, fetchUpiConfig, CategoryDto, MenuItemDto, UpiConfigDto } from '../../services/api.client';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [items, setItems] = useState<MenuItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderNumber: string; paymentMode?: string } | null>(null);
  const [upiConfig, setUpiConfig] = useState<UpiConfigDto | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    orderType: 'DIRECT_DELIVERY' as const,
    paymentMode: 'CASH' as 'CASH' | 'UPI' | 'CREDIT',
    transactionRef: '',
    instructions: ''
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, itms, upi] = await Promise.all([
        fetchCategories(),
        fetchMenuItems(),
        fetchUpiConfig().catch(() => null)
      ]);
      setCategories(cats);
      setItems(itms);
      if (upi) setUpiConfig(upi);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = (id: string, qty: number) => {
    const item = items.find((it) => it.id === id);
    if (!item) return;

    setCart((prev) => {
      const updated = { ...prev };
      if (qty <= 0) {
        delete updated[id];
      } else {
        updated[id] = {
          id: item.id,
          name: item.name,
          price: Number(item.base_price),
          qty
        };
      }
      return updated;
    });
  };

  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  // Group items by category
  const groupedItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    // Filter items first by search
    let filtered = items;
    if (query) {
      filtered = items.filter((it) =>
        it.name.toLowerCase().includes(query) || (it.description && it.description.toLowerCase().includes(query))
      );
    }

    // Map categories to items
    const catMap = new Map<string, { category: string; slug: string; items: MenuItemDto[] }>();

    // Prepare active category buckets
    categories.forEach((cat) => {
      if (selectedCategory === 'All' || selectedCategory === cat.name || selectedCategory === cat.id) {
        catMap.set(cat.id, { category: cat.name, slug: cat.slug, items: [] });
      }
    });

    // Bucket items into their categories
    filtered.forEach((it) => {
      if (catMap.has(it.category_id)) {
        catMap.get(it.category_id)!.items.push(it);
      }
    });

    return Array.from(catMap.values()).filter((group) => group.items.length > 0);
  }, [categories, items, selectedCategory, searchQuery]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCartCount === 0) return;

    setOrderSubmitting(true);
    try {
      const orderPayloadItems = Object.values(cart).map((it) => ({
        productId: it.id,
        name: it.name,
        unitPrice: it.price,
        quantity: it.qty
      }));

      const res = await submitOrder({
        orderType: checkoutForm.orderType,
        deliveryAddress: checkoutForm.address,
        specialInstructions: checkoutForm.instructions ? `${checkoutForm.instructions} (Customer: ${checkoutForm.name}, Phone: ${checkoutForm.phone})` : `Customer: ${checkoutForm.name}, Phone: ${checkoutForm.phone}`,
        paymentMode: checkoutForm.paymentMode,
        transactionRef: checkoutForm.paymentMode === 'UPI' ? checkoutForm.transactionRef : undefined,
        items: orderPayloadItems
      });

      setOrderSuccess({ orderNumber: res.orderNumber, paymentMode: checkoutForm.paymentMode });
      setCart({});
    } catch (err: any) {
      alert(`Order placement failed: ${err.message}`);
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: 'var(--cw-space-20)', backgroundColor: '#FAF5EE', minHeight: '80vh' }}>
      {/* Search & Sticky Category Selector */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--cw-color-border)',
          padding: '20px 0 14px',
          position: 'sticky',
          top: 'var(--cw-header-height)',
          zIndex: 900,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <div className="cw-container">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search for chai, samosa, momos, thali..."
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 'var(--cw-radius-pill)',
                  border: '1px solid var(--cw-color-border)',
                  backgroundColor: '#FAF5EE',
                  fontSize: '14px'
                }}
              />
            </div>
            {totalCartCount > 0 && (
              <button
                onClick={() => setIsCheckoutOpen(true)}
                style={{
                  backgroundColor: 'var(--cw-color-primary)',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: 'var(--cw-radius-pill)',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🛒 Cart ({totalCartCount})
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none'
            }}
          >
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                whiteSpace: 'nowrap',
                padding: '7px 16px',
                borderRadius: 'var(--cw-radius-pill)',
                border: '1px solid',
                borderColor: selectedCategory === 'All' ? 'var(--cw-color-primary)' : 'var(--cw-color-border)',
                backgroundColor: selectedCategory === 'All' ? 'var(--cw-color-primary)' : '#FFFFFF',
                color: selectedCategory === 'All' ? '#FFFFFF' : 'var(--cw-color-text-main)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '7px 16px',
                  borderRadius: 'var(--cw-radius-pill)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.name ? 'var(--cw-color-primary)' : 'var(--cw-color-border)',
                  backgroundColor: selectedCategory === cat.name ? 'var(--cw-color-primary)' : '#FFFFFF',
                  color: selectedCategory === cat.name ? '#FFFFFF' : 'var(--cw-color-text-main)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="cw-container" style={{ marginTop: 'var(--cw-space-8)' }}>
        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--cw-color-text-muted)' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>☕</div>
            <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--cw-color-dark)' }}>
              Loading Chaiwale Menu...
            </p>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Connecting to central database</p>
          </div>
        )}

        {/* Error State with Retry */}
        {error && !loading && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #F87171',
              borderRadius: 'var(--cw-radius-lg)',
              padding: '24px',
              textAlign: 'center',
              margin: '30px auto',
              maxWidth: '520px'
            }}
          >
            <span style={{ fontSize: '32px' }}>⚠️</span>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#991B1B', marginTop: '8px' }}>
              Unable to Load Menu
            </h3>
            <p style={{ fontSize: '13px', color: '#7F1D1D', marginTop: '4px', marginBottom: '16px' }}>
              {error}
            </p>
            <button
              onClick={loadData}
              style={{
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                padding: '8px 20px',
                borderRadius: 'var(--cw-radius-md)',
                fontWeight: 600,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && groupedItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--cw-color-text-muted)' }}>
            <span style={{ fontSize: '40px' }}>🔍</span>
            <p style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px', color: 'var(--cw-color-dark)' }}>
              No matching items found
            </p>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>
              Try searching with a different term or select another category.
            </p>
          </div>
        )}

        {/* Dynamic Category Sections */}
        {!loading &&
          !error &&
          groupedItems.map(({ category, items: categoryItems }) => (
            <section key={category} style={{ marginBottom: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px',
                  marginBottom: '16px',
                  borderBottom: '2px solid var(--cw-color-border-light)',
                  paddingBottom: '6px'
                }}
              >
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--cw-color-dark)' }}>
                  {category}
                </h2>
                <span style={{ fontSize: '13px', color: 'var(--cw-color-text-muted)', fontWeight: 600 }}>
                  ({categoryItems.length} items)
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '14px'
                }}
              >
                {categoryItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={Number(item.base_price)}
                    category={category}
                    isVeg={item.is_veg}
                    description={item.description || undefined}
                    imageSrc={item.image_path || undefined}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          ))}
      </div>

      {/* Floating Bottom Cart Bar */}
      {totalCartCount > 0 && !isCheckoutOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--cw-color-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--cw-radius-pill)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 8px 24px rgba(111, 67, 42, 0.35)',
            zIndex: 1000
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 700 }}>
            {totalCartCount} item{totalCartCount > 1 ? 's' : ''} added
          </span>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--cw-color-primary)',
              padding: '8px 18px',
              borderRadius: 'var(--cw-radius-pill)',
              fontWeight: 800,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Review & Order →
          </button>
        </div>
      )}

      {/* Checkout Drawer / Modal */}
      {isCheckoutOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--cw-radius-xl)',
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderSuccess(null);
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              ✕
            </button>

            {orderSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <span style={{ fontSize: '48px' }}>🎉</span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--cw-color-primary)', marginTop: '12px' }}>
                  Order Confirmed!
                </h3>
                <p style={{ fontSize: '15px', color: '#1E293B', marginTop: '6px' }}>
                  Order Number: <strong>#{orderSuccess.orderNumber}</strong>
                </p>
                {orderSuccess.paymentMode === 'UPI' && (
                  <div style={{ padding: '12px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 'var(--cw-radius-md)', margin: '14px 0', fontSize: '13px', color: '#92400E' }}>
                    📱 <strong>UPI Payment Status: PENDING VERIFICATION</strong><br />
                    Your transaction reference has been logged. Our kitchen & billing staff will verify the credit with our Paytm merchant bank before dispatch.
                  </div>
                )}
                {orderSuccess.paymentMode === 'CREDIT' && (
                  <div style={{ padding: '12px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--cw-radius-md)', margin: '14px 0', fontSize: '13px', color: '#1E40AF' }}>
                    📑 <strong>Payment Mode: CREDIT / UDHAAR</strong><br />
                    This order will be added to your outstanding balance register and issued with an official udhaar invoice.
                  </div>
                )}
                {orderSuccess.paymentMode === 'CASH' && (
                  <div style={{ padding: '12px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--cw-radius-md)', margin: '14px 0', fontSize: '13px', color: '#166534' }}>
                    💵 <strong>Payment Mode: CASH ON DELIVERY / PICKUP</strong><br />
                    Please keep exact cash ready upon order arrival or store pickup.
                  </div>
                )}
                <p style={{ fontSize: '13px', color: 'var(--cw-color-text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                  Your order has been transmitted directly to our Rohini kitchen. Authoritative billing calculations have been stored in the database.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <Link
                    href={`/track?order=${orderSuccess.orderNumber}`}
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--cw-color-primary)',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      padding: '12px',
                      borderRadius: 'var(--cw-radius-md)',
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    Track Order Live →
                  </Link>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setOrderSuccess(null);
                    }}
                    style={{
                      padding: '12px 18px',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: 'var(--cw-radius-md)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--cw-color-dark)', marginBottom: '4px' }}>
                  Complete Your Order
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--cw-color-text-muted)', marginBottom: '18px' }}>
                  Item prices and 5% GST are computed authoritatively by the central billing engine.
                </p>

                {/* Items Summary */}
                <div style={{ maxHeight: '140px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: 'var(--cw-radius-md)', padding: '10px', marginBottom: '16px', fontSize: '13px' }}>
                  {Object.values(cart).map((it) => (
                    <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                      <span>{it.qty}x {it.name}</span>
                      <span style={{ fontWeight: 600 }}>₹{it.price * it.qty}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px dashed #CBD5E1', marginTop: '6px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B' }}>
                    <span>Estimated 5% Restaurant GST</span>
                    <span>₹{(Object.values(cart).reduce((sum, it) => sum + it.price * it.qty, 0) * 0.05).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '14px', color: '#0F172A', marginTop: '4px' }}>
                    <span>Estimated Total</span>
                    <span>₹{(Object.values(cart).reduce((sum, it) => sum + it.price * it.qty, 0) * 1.05).toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--cw-radius-md)', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      placeholder="+91 99999 99999"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--cw-radius-md)', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Delivery Address (Rohini)</label>
                    <input
                      type="text"
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      placeholder="House/Plot no., Sector 3 / DC Chowk"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--cw-radius-md)', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Special Instructions</label>
                    <input
                      type="text"
                      value={checkoutForm.instructions}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, instructions: e.target.value })}
                      placeholder="e.g. Less sugar in chai, extra spicy samosa chutney"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--cw-radius-md)', border: '1px solid #CBD5E1', fontSize: '13px' }}
                    />
                  </div>

                  {/* Payment Mode Selection */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>
                      Select Payment Mode *
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      <label
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px 6px',
                          borderRadius: 'var(--cw-radius-md)',
                          border: checkoutForm.paymentMode === 'CASH' ? '2px solid var(--cw-color-primary)' : '1px solid #CBD5E1',
                          backgroundColor: checkoutForm.paymentMode === 'CASH' ? '#FFFBEB' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMode"
                          value="CASH"
                          checked={checkoutForm.paymentMode === 'CASH'}
                          onChange={() => setCheckoutForm({ ...checkoutForm, paymentMode: 'CASH' })}
                          style={{ display: 'none' }}
                        />
                        <span style={{ fontSize: '18px', marginBottom: '2px' }}>💵</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>CASH / COD</span>
                        <span style={{ fontSize: '10px', color: '#64748B' }}>Pay on Delivery</span>
                      </label>

                      <label
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px 6px',
                          borderRadius: 'var(--cw-radius-md)',
                          border: checkoutForm.paymentMode === 'UPI' ? '2px solid var(--cw-color-primary)' : '1px solid #CBD5E1',
                          backgroundColor: checkoutForm.paymentMode === 'UPI' ? '#FFFBEB' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMode"
                          value="UPI"
                          checked={checkoutForm.paymentMode === 'UPI'}
                          onChange={() => setCheckoutForm({ ...checkoutForm, paymentMode: 'UPI' })}
                          style={{ display: 'none' }}
                        />
                        <span style={{ fontSize: '18px', marginBottom: '2px' }}>📱</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>UPI SCAN</span>
                        <span style={{ fontSize: '10px', color: '#64748B' }}>Paytm / GPay QR</span>
                      </label>

                      <label
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '10px 6px',
                          borderRadius: 'var(--cw-radius-md)',
                          border: checkoutForm.paymentMode === 'CREDIT' ? '2px solid var(--cw-color-primary)' : '1px solid #CBD5E1',
                          backgroundColor: checkoutForm.paymentMode === 'CREDIT' ? '#FFFBEB' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMode"
                          value="CREDIT"
                          checked={checkoutForm.paymentMode === 'CREDIT'}
                          onChange={() => setCheckoutForm({ ...checkoutForm, paymentMode: 'CREDIT' })}
                          style={{ display: 'none' }}
                        />
                        <span style={{ fontSize: '18px', marginBottom: '2px' }}>📑</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>CREDIT / UDHAAR</span>
                        <span style={{ fontSize: '10px', color: '#64748B' }}>Regular Account</span>
                      </label>
                    </div>
                  </div>

                  {/* UPI QR & Reference Capture Box */}
                  {checkoutForm.paymentMode === 'UPI' && (
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--cw-radius-md)', padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                        Scan Genuine Chaiwale Paytm QR
                      </div>
                      <p style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>
                        Account: {upiConfig?.accountName || 'Shubham Sharma'} • UPI ID: {upiConfig?.upiId || 'chaiwale@ptyes'}
                      </p>
                      <div style={{ display: 'inline-block', backgroundColor: '#FFFFFF', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '10px' }}>
                        <img
                          src={upiConfig?.qrUrl || 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public/branding/chaiwale-upi-qr.jpeg'}
                          alt="Chaiwale Paytm UPI QR"
                          style={{ width: '160px', height: '160px', objectFit: 'contain', display: 'block' }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                        <code style={{ fontSize: '12px', backgroundColor: '#E2E8F0', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {upiConfig?.upiId || 'chaiwale@ptyes'}
                        </code>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(upiConfig?.upiId || 'chaiwale@ptyes');
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                          }}
                          style={{
                            fontSize: '11px',
                            padding: '4px 10px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          {copiedUpi ? '✓ Copied' : '📋 Copy UPI ID'}
                        </button>
                      </div>

                      <div style={{ textAlign: 'left', marginTop: '8px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                          12-Digit UPI UTR / Reference ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.transactionRef}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, transactionRef: e.target.value })}
                          placeholder="e.g. 423401928312 (From Paytm / GPay / PhonePe)"
                          style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--cw-radius-md)', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        />
                        <p style={{ fontSize: '11px', color: '#B45309', marginTop: '4px' }}>
                          ⚠️ Orders remain in PENDING status until verified by kitchen/store billing staff against merchant bank records.
                        </p>
                      </div>
                    </div>
                  )}

                  {checkoutForm.paymentMode === 'CREDIT' && (
                    <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--cw-radius-md)', padding: '12px', fontSize: '12px', color: '#1E40AF' }}>
                      ℹ️ <strong>Credit / Udhaar Billing:</strong> Available for authorized corporate partners and regular registered patrons. The bill will be added to your account ledger and can be settled partially or fully via BillBook.
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={orderSubmitting}
                  style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '13px',
                    backgroundColor: orderSubmitting ? '#94A3B8' : 'var(--cw-color-primary)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '15px',
                    borderRadius: 'var(--cw-radius-md)',
                    border: 'none',
                    cursor: orderSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {orderSubmitting ? 'Transmitting to Kitchen...' : `Confirm & Place Order (₹${(Object.values(cart).reduce((sum, it) => sum + it.price * it.qty, 0) * 1.05).toFixed(2)}) →`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
