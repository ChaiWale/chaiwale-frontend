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
  onAddToCart?: (id: string, qty: number, variant?: MenuItemVariantDto) => void;
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

  const hasVariants = Boolean(variants && variants.length > 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<MenuItemVariantDto | null>(
    hasVariants && variants ? variants[0] : null
  );

  const handleAddClick = () => {
    if (hasVariants) {
      setIsModalOpen(true);
    } else {
      const nextQty = qty + 1;
      setLocalQty(nextQty);
      if (onAddToCart) onAddToCart(id, nextQty);
    }
  };

  const handleSubtract = () => {
    if (qty > 0) {
      const nextQty = qty - 1;
      setLocalQty(nextQty);
      if (onAddToCart) onAddToCart(id, nextQty);
    }
  };

  const handleConfirmVariant = () => {
    if (onAddToCart && selectedVariant) {
      onAddToCart(id, 1, selectedVariant);
    }
    setIsModalOpen(false);
  };

  return (
    <>
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
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/chaiwale-logo.jpeg';
                e.currentTarget.style.objectFit = 'contain';
                e.currentTarget.style.padding = '8px';
              }}
            />
          ) : (
            <img
              src="/assets/chaiwale-logo.jpeg"
              alt="Chaiwale"
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
              loading="lazy"
            />
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

            {hasVariants && variants && (
              <span style={{ fontSize: '11.5px', color: 'var(--cw-color-accent)', fontWeight: 700 }}>
                ({variants.map((v) => `${v.name}: ₹${v.price}`).join(' • ')})
              </span>
            )}
          </div>
        </div>

        {/* Right: + ADD / Quantity Control */}
        <div style={{ minWidth: '94px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          {qty === 0 ? (
            <button
              type="button"
              onClick={handleAddClick}
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--cw-color-primary)',
                border: '1.5px solid var(--cw-color-primary)',
                borderRadius: 'var(--cw-radius-pill)',
                padding: '7px 18px',
                fontSize: '13px',
                fontWeight: 800,
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
                width: '88px',
                backgroundColor: 'var(--cw-color-primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--cw-radius-pill)',
                padding: '5px 10px',
                boxShadow: '0 2px 6px rgba(111, 67, 42, 0.2)'
              }}
            >
              <button
                type="button"
                onClick={handleSubtract}
                style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '16px', fontWeight: 800, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
              >
                -
              </button>
              <span style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'var(--cw-font-heading)' }}>{qty}</span>
              <button
                type="button"
                onClick={handleAddClick}
                style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '16px', fontWeight: 800, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
              >
                +
              </button>
            </div>
          )}

          {hasVariants && (
            <span
              onClick={() => setIsModalOpen(true)}
              style={{
                fontSize: '10px',
                color: 'var(--cw-color-accent)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: 'pointer'
              }}
            >
              Customisable
            </span>
          )}
        </div>
      </div>

      {/* Smart Variant Selection Modal */}
      {isModalOpen && hasVariants && variants && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18, 9, 5, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '420px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 48px rgba(33, 21, 16, 0.35)',
              position: 'relative',
              animation: 'cwPop 0.2s ease-out'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Badge variant={isEgg ? 'accent' : isVeg ? 'veg' : 'non-veg'}>
                    {isEgg ? 'Egg' : isVeg ? 'Veg' : 'Non-Veg'}
                  </Badge>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{category}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--cw-color-dark)', margin: 0 }}>
                  {name}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
                  Choose your preferred portion / size
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  fontSize: '15px',
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '18px 0' }}>
              {variants.map((v) => {
                const isSelected = selectedVariant?.name === v.name;
                return (
                  <div
                    key={v.id || v.name}
                    onClick={() => setSelectedVariant(v)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid var(--cw-color-accent)' : '1.5px solid #E2E8F0',
                      backgroundColor: isSelected ? '#FFF8F3' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '6px solid var(--cw-color-accent)' : '2px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          boxSizing: 'border-box',
                          transition: 'all 0.15s ease'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>
                          {v.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          Authentic fresh portion
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontWeight: 900,
                          fontSize: '16px',
                          color: 'var(--cw-color-primary)',
                          fontFamily: 'var(--cw-font-heading)'
                        }}
                      >
                        ₹{v.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confirm & Add Button */}
            <button
              type="button"
              onClick={handleConfirmVariant}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: 'var(--cw-color-primary)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(111, 67, 42, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.15s ease'
              }}
            >
              <span>Add to Cart • ₹{selectedVariant ? selectedVariant.price : price}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
