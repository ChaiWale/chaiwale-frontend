'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FoodCard } from '../ui/FoodCard';
import { fetchMenuItems, fetchCategories } from '../../services/api.client';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export function HomeFeaturedItems() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [catMap, setCatMap] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  useEffect(() => {
    Promise.all([fetchMenuItems(), fetchCategories()])
      .then(([itms, cats]) => {
        setItems(itms.slice(0, 6));
        setCatMap(Object.fromEntries(cats.map((c: any) => [c.id, c.name])));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cw_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') setCart(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cw_cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch {}
  }, [cart]);

  const handleAddToCart = (id: string, qty: number) => {
    const item = items.find((it) => it.id === id);
    if (!item) return;
    setCart((prev) => {
      const updated = { ...prev };
      if (qty <= 0) {
        delete updated[id];
      } else {
        updated[id] = { id: item.id, name: item.name, price: Number(item.base_price), qty };
      }
      return updated;
    });
  };

  const totalCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

  if (items.length === 0) {
    return <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '14px' }}>Menu loading... </p>;
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
        {items.map((item) => (
          <FoodCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={Number(item.base_price)}
            category={catMap[item.category_id] || 'Chaiwale'}
            isVeg={item.is_veg}
            isEgg={item.is_egg}
            spiceLevel={item.spice_level}
            tags={item.tags}
            variants={item.variants}
            description={item.description || undefined}
            imageSrc={item.image_path || undefined}
            currentQty={cart[item.id]?.qty || 0}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {totalCount > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--cw-color-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--cw-radius-pill)',
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 6px 20px rgba(111, 67, 42, 0.35)',
            zIndex: 999,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '15px',
            whiteSpace: 'nowrap'
          }}
          onClick={() => router.push('/menu?cart=open')}
        >
          {`🛒 ${totalCount} item${totalCount > 1 ? 's' : ''} • ₹${totalPrice.toFixed(0)} → View Cart`}
        </div>
      )}
    </>
  );
}
