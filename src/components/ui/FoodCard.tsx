'use client';

import React, { useState } from 'react';
import { Badge } from './Badge';
import { resolveMediaUrl, MenuItemVariantDto } from '../../services/api.client';

export interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  isVeg: boolean;
  isEgg?: boolean;
  spiceLevel?: string;
  tags?: string[];
  description?: string;
  imageSrc?: string;
  variants?: MenuItemVariantDto[];
  currentQty?: number;
  onAddToCart?: (id: string, qty: number) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  price,
  category,
  isVeg,
  isEgg,
  spiceLevel,
  tags,
  description,
  imageSrc,
  variants,
  currentQty,
  onAddToCart
}) => {
  const [localQty, setLocalQty] = useState(0);
  const qty = currentQty !== undefined ? currentQty : localQty;
  const resolvedImage = resolveMediaUrl(imageSrc);

  const handleAdd = () => {
    const nextQty = qty + 1;
    setLocalQty(nextQty);
    if (onAddToCart) onAddToCart(id, nextQty);
  };

  const handleSubtract = () => {
    if (qty > 0) {
      const nextQty = qty - 1;
      setLocalQty(nextQty);
      if (onAddToCart) onAddToCart(id, nextQty);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--cw-radius-lg)',
        border: '1px solid var(--cw-color-border-light)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: 'var(--cw-shadow-sm)',
        transition: 'all var(--cw-transition-fast)',
        position: 'relative'
      }}
    >
      {/* Food Thumbnail on Left */}
      <div
        style={{
          width: '84px',
          height: '84px',
          minWidth: '84px',
          borderRadius: 'var(--cw-radius-md)',
          overflow: 'hidden',
          backgroundColor: '#F2EBE1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--cw-color-border-light)'
        }}
      >
        {resolvedImage ? (
          <img
            src={resolvedImage}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <span style={{ fontSize: '26px' }}>
            {category === 'Tea' ? '☕' : category === 'Snacks' ? '🥟' : category === 'Momos' ? '🥟' : '🍲'}
          </span>
        )}
      </div>

      {/* Middle: Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <Badge variant={isEgg ? 'accent' : isVeg ? 'veg' : 'non-veg'}>
            {isEgg ? 'Egg' : isVeg ? 'Veg' : 'Non-Veg'}
          </Badge>
          <span style={{ fontSize: '11px', color: 'var(--cw-color-text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
            {category}
          </span>
          {spiceLevel && spiceLevel !== 'NONE' && (
            <span style={{ fontSize: '11px' }} title={`Spice: ${spiceLevel}`}>
              {spiceLevel === 'HOT' ? '🌶️🌶️🌶️' : spiceLevel === 'MEDIUM' ? '🌶️🌶️' : '🌶️'}
            </span>
          )}
        </div>

        <h4
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--cw-color-text-main)',
            marginBottom: '4px',
            lineHeight: 1.3
          }}
        >
          {name}
        </h4>

        {description && (
          <p
            style={{
              fontSize: '13px',
              color: 'var(--cw-color-text-muted)',
              lineHeight: 1.4,
              marginBottom: '6px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '6px', flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  fontWeight: 700
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontSize: '12px', color: 'var(--cw-color-text-muted)' }}>₹</span>
            <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--cw-color-primary)', fontFamily: 'var(--cw-font-heading)' }}>
              {price}
            </span>
          </div>

          {variants && variants.length > 0 && (
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              ({variants.map((v) => `${v.name} ₹${v.price}`).join(' • ')})
            </span>
          )}
        </div>
      </div>

      {/* Right: + ADD / Quantity Control */}
      <div style={{ minWidth: '90px', display: 'flex', justifyContent: 'flex-end' }}>
        {qty === 0 ? (
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--cw-color-primary)',
              border: '1.5px solid var(--cw-color-primary)',
              borderRadius: 'var(--cw-radius-pill)',
              padding: '7px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(111, 67, 42, 0.08)',
              transition: 'all 0.15s ease',
              fontFamily: 'var(--cw-font-heading)'
            }}
          >
            + ADD
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '84px',
              backgroundColor: 'var(--cw-color-primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--cw-radius-pill)',
              padding: '5px 10px',
              boxShadow: '0 2px 6px rgba(111, 67, 42, 0.2)'
            }}
          >
            <button
              onClick={handleSubtract}
              style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '16px', fontWeight: 700, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
            >
              -
            </button>
            <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--cw-font-heading)' }}>{qty}</span>
            <button
              onClick={handleAdd}
              style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '16px', fontWeight: 700, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
