'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FoodCard } from '../ui/FoodCard';
import ChaiLoader from '../ui/ChaiLoader';
import { fetchMenuItems, fetchCategories, MenuItemDto, CategoryDto } from '../../services/api.client';

interface CartItem {
  id: string; // compound key: `${itemId}_${variantId || 'base'}`
  itemId: string;
  variantId?: string;
  variantName?: string;
  name: string;
  price: number;
  qty: number;
}

export function HomeFeaturedItems() {
  const router = useRouter();
  const [allItems, setAllItems] = useState<MenuItemDto[]>([]);
  const [featuredItems, setFeaturedItems] = useState<MenuItemDto[]>([]);
  const [catMap, setCatMap] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Helper to pick 6 diverse, randomized items across categories
  const selectRandomDiverseItems = useCallback((itemsList: MenuItemDto[], categories: CategoryDto[]) => {
    if (!itemsList || itemsList.length === 0) return [];

    // Group items by category
    const byCategory: Record<string, MenuItemDto[]> = {};
    itemsList.forEach((it) => {
      const catId = it.category_id;
      if (!byCategory[catId]) byCategory[catId] = [];
      byCategory[catId].push(it);
    });

    // Shuffle categories to get a varied spread
    const catKeys = Object.keys(byCategory).sort(() => Math.random() - 0.5);
    const chosen: MenuItemDto[] = [];
    const usedIds = new Set<string>();

    // Pass 1: Pick 1 item from each shuffled category (preferring Bestseller if any)
    for (const cKey of catKeys) {
      if (chosen.length >= 6) break;
      const catItems = byCategory[cKey];
      if (!catItems || catItems.length === 0) continue;

      // Shuffle items within this category
      const shuffledCatItems = [...catItems].sort(() => Math.random() - 0.5);
      // Prefer items with Bestseller tag, else any random item
      const best = shuffledCatItems.find((it) => it.tags && it.tags.some((t) => t.toLowerCase().includes('bestseller')));
      const pick = best || shuffledCatItems[0];

      if (pick && !usedIds.has(pick.id)) {
        chosen.push(pick);
        usedIds.add(pick.id);
      }
    }

    // Pass 2: If we still have fewer than 6, fill from remaining items randomly
    if (chosen.length < 6) {
      const remaining = itemsList.filter((it) => !usedIds.has(it.id)).sort(() => Math.random() - 0.5);
      for (const it of remaining) {
        if (chosen.length >= 6) break;
        chosen.push(it);
        usedIds.add(it.id);
      }
    }

    return chosen;
  }, []);

  // Fetch menu data on mount
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchMenuItems(), fetchCategories()])
      .then(([itms, cats]) => {
        setAllItems(itms);
        setCatMap(Object.fromEntries(cats.map((c: any) => [c.id, c.name])));
        const selected = selectRandomDiverseItems(itms, cats);
        setFeaturedItems(selected);
      })
      .catch((err) => {
        console.error('Failed to load featured menu items:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectRandomDiverseItems]);

  // Handle re-shuffle on user demand
  const handleShuffle = () => {
    if (allItems.length > 0) {
      const dummyCats = Object.keys(catMap).map((id) => ({ id, name: catMap[id] } as any));
      const newlySelected = selectRandomDiverseItems(allItems, dummyCats);
      setFeaturedItems(newlySelected);
    }
  };

  // Load saved cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cw_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') setCart(parsed);
      }
    } catch {}
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cw_cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch {}
  }, [cart]);

  // Support both single-price items and multi-portion variants (Half / Full)
  const handleAddToCart = (id: string, qty: number, variant?: any) => {
    const item = allItems.find((it) => it.id === id) || featuredItems.find((it) => it.id === id);
    if (!item) return;

    setCart((prev) => {
      const updated = { ...prev };

      // Case 1: Specific variant selected (e.g. from Customisation modal)
      if (variant) {
        const cartKey = `${item.id}_${variant.id || variant.name}`;
        const displayName = `${item.name} (${variant.name})`;
        const unitPrice = Number(variant.price);
        const existing = updated[cartKey];
        const nextQty = existing ? existing.qty + qty : qty;

        if (nextQty <= 0) {
          delete updated[cartKey];
        } else {
          updated[cartKey] = {
            id: cartKey,
            itemId: item.id,
            variantId: variant.id,
            variantName: variant.name,
            name: displayName,
            price: unitPrice,
            qty: nextQty
          };
        }
        return updated;
      }

      // Case 2: Decrementing an item that has variants in cart
      const matchingItems = Object.values(updated).filter(
        (c) => c.itemId === item.id || c.id === item.id
      );

      if (matchingItems.length > 0 && matchingItems.some((c) => c.variantId || c.variantName)) {
        if (qty <= 0) {
          matchingItems.forEach((c) => delete updated[c.id]);
        } else {
          // Decrement the last added variant portion
          const lastVariant = matchingItems[matchingItems.length - 1];
          if (lastVariant.qty > 1) {
            updated[lastVariant.id] = { ...lastVariant, qty: lastVariant.qty - 1 };
          } else {
            delete updated[lastVariant.id];
          }
        }
        return updated;
      }

      // Case 3: Regular dish without variants
      if (qty <= 0) {
        delete updated[item.id];
      } else {
        updated[item.id] = {
          id: item.id,
          itemId: item.id,
          name: item.name,
          price: Number(item.base_price),
          qty
        };
      }
      return updated;
    });
  };

  const totalCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

  if (isLoading) {
    return (
      <div style={{ padding: '24px 0' }}>
        <ChaiLoader
          label="Brewing handpicked favorites..."
          sublabel="Authentic taste & fresh kitchen picks"
        />
      </div>
    );
  }

  if (featuredItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '36px 12px' }}>
        <p style={{ color: 'var(--cw-color-text-muted)', fontSize: '14px', marginBottom: '14px' }}>
          Unable to fetch favorites at the moment.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: '9px 20px',
            backgroundColor: 'var(--cw-color-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--cw-radius-pill)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🔄 Tap to Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header controls with Shuffle button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
        <button
          type="button"
          onClick={handleShuffle}
          title="See different kitchen recommendations"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FAF5EE',
            border: '1px solid #EAE0D2',
            color: 'var(--cw-color-primary)',
            padding: '6px 14px',
            borderRadius: 'var(--cw-radius-pill)',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🎲 Shuffle Picks</span>
        </button>
      </div>

      {/* Featured Items Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '16px'
        }}
      >
        {featuredItems.map((item) => {
          // Calculate total quantity of all portions of this dish currently in cart
          const dishCartQty = Object.values(cart)
            .filter((c) => c.itemId === item.id || c.id === item.id)
            .reduce((sum, c) => sum + c.qty, 0);

          return (
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
              currentQty={dishCartQty}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar */}
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
            whiteSpace: 'nowrap',
            animation: 'cwPop 0.2s ease-out'
          }}
          onClick={() => router.push('/menu?cart=open')}
        >
          {`🛒 ${totalCount} item${totalCount > 1 ? 's' : ''} • ₹${totalPrice.toFixed(0)} → View Cart`}
        </div>
      )}
    </>
  );
}
