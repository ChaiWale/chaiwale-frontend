'use client';

import React, { useState } from 'react';
import { Badge } from './Badge';
import { resolveMediaUrl, MenuItemVariantDto } from '../../services/api.client';
import { ASSETS } from '../../utils/supabaseAssets';

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
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const qty = currentQty !== undefined ? currentQty : localQty;
  const resolvedImage = resolveMediaUrl(imageSrc);

  const hasVariants = Boolean(variants && variants.length > 1);
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
    if (onAddToCart) {
      if (hasVariants && selectedVariant) {
        onAddToCart(id, 1, selectedVariant);
      } else {
        const nextQty = qty + 1;
        setLocalQty(nextQty);
        onAddToCart(id, nextQty);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '16px 16px 22px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '14px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          transition: 'all 0.15s ease',
          position: 'relative'
        }}
      >
        {/* Left Column: Details, Dietary Icon, Tags, Price, Description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Dietary Indicator & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            {/* Zomato-Style Veg / Non-Veg / Egg Square Icon */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                border: `1.5px solid ${isEgg ? '#D97706' : isVeg ? '#16A34A' : '#DC2626'}`,
                borderRadius: '3px',
                backgroundColor: '#FFFFFF',
                padding: '2px',
                boxSizing: 'border-box'
              }}
              title={isEgg ? 'Egg' : isVeg ? 'Pure Veg' : 'Non-Veg'}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: isVeg || isEgg ? '50%' : '1px',
                  backgroundColor: isEgg ? '#D97706' : isVeg ? '#16A34A' : '#DC2626'
                }}
              />
            </span>

            {/* Bestseller / Signature Tag */}
            {tags && tags.some(t => t.toLowerCase().includes('bestseller') || t.toLowerCase().includes('must try') || t.toLowerCase().includes('special')) && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#92400E',
                  backgroundColor: '#FEF3C7',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                ★ Bestseller
              </span>
            )}

            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              {category}
            </span>

            {spiceLevel && spiceLevel !== 'NONE' && (
              <span style={{ fontSize: '11px' }} title={`Spice: ${spiceLevel}`}>
                {spiceLevel === 'HOT' ? '🌶️🌶️🌶️' : spiceLevel === 'MEDIUM' ? '🌶️🌶️' : '🌶️'}
              </span>
            )}
          </div>

          {/* Dish Title */}
          <h4
            onClick={() => setIsModalOpen(true)}
            title="Click to view details"
            style={{
              fontSize: '15.5px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '4px',
              lineHeight: 1.3,
              cursor: 'pointer'
            }}
          >
            {name}
          </h4>

          {/* Price & Portions */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937' }}>
              ₹{price}
            </span>

            {hasVariants && variants && (
              <span style={{ fontSize: '11.5px', color: '#B45309', fontWeight: 600 }}>
                ({variants.length} portions • from ₹{price})
              </span>
            )}
          </div>

          {/* Description with read more */}
          {description && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  lineHeight: 1.45,
                  margin: 0,
                  display: isDescExpanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: isDescExpanded ? undefined : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  wordBreak: 'break-word'
                }}
              >
                {description}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDescExpanded(!isDescExpanded);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginTop: '3px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#6F432A',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                {isDescExpanded ? 'Less ▲' : 'more ▼'}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Zomato Square Photo + Overlapping ADD Button */}
        <div
          style={{
            position: 'relative',
            width: '116px',
            minWidth: '116px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '14px'
          }}
        >
          {/* Square Dish Image */}
          <div
            onClick={() => setIsModalOpen(true)}
            title="Click to view full dish details"
            style={{
              width: '116px',
              height: '104px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
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
                  e.currentTarget.src = ASSETS.logo;
                  e.currentTarget.style.objectFit = 'contain';
                  e.currentTarget.style.padding = '8px';
                }}
              />
            ) : (
              <img
                src={ASSETS.logo}
                alt="Chaiwale"
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
                loading="lazy"
              />
            )}
          </div>

          {/* Overlapping Zomato-Style ADD Button */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2
            }}
          >
            {qty === 0 ? (
              <button
                type="button"
                onClick={handleAddClick}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#16A34A',
                  border: '1.5px solid #16A34A',
                  borderRadius: '8px',
                  padding: '6px 20px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}
              >
                ADD
              </button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '94px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '5px 8px',
                  boxShadow: '0 2px 8px rgba(22, 163, 74, 0.35)'
                }}
              >
                <button
                  type="button"
                  onClick={handleSubtract}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    padding: '0 4px',
                    lineHeight: 1
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: '13.5px', fontWeight: 800 }}>{qty}</span>
                <button
                  type="button"
                  onClick={handleAddClick}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    padding: '0 4px',
                    lineHeight: 1
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Customisable Pill Below Button */}
          {hasVariants && (
            <span
              onClick={() => setIsModalOpen(true)}
              style={{
                fontSize: '9.5px',
                color: '#6B7280',
                fontWeight: 600,
                marginTop: '12px',
                cursor: 'pointer'
              }}
            >
              customisable
            </span>
          )}
        </div>
      </div>

      {/* Smart Dish Details & Portion Modal */}
      {isModalOpen && (
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
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 48px rgba(33, 21, 16, 0.35)',
              position: 'relative',
              animation: 'cwPop 0.2s ease-out',
              maxHeight: '90vh',
              overflowY: 'auto'
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
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--cw-color-dark)', margin: 0 }}>
                  {name}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
                  {hasVariants ? 'Choose your preferred portion / size' : 'Freshly prepared authentic dish'}
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

            {/* What's Inside Box */}
            {description && (
              <div
                style={{
                  margin: '12px 0 16px 0',
                  padding: '12px 14px',
                  backgroundColor: '#FAF5EE',
                  borderRadius: '14px',
                  border: '1px solid #EADBCC'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--cw-color-primary)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  🍛 What&apos;s Inside / Details:
                </span>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                  {description}
                </p>
              </div>
            )}

            {/* Options List for Multi-Variant */}
            {hasVariants && variants && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '16px 0' }}>
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
            )}

            {/* Single Item Pricing Card */}
            {!hasVariants && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  backgroundColor: '#FFF8F3',
                  border: '1.5px solid #FBD5B5',
                  margin: '16px 0'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>
                    Standard Fresh Portion
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Prepared fresh to order
                  </div>
                </div>
                <span style={{ fontWeight: 900, fontSize: '18px', color: 'var(--cw-color-primary)', fontFamily: 'var(--cw-font-heading)' }}>
                  ₹{price}
                </span>
              </div>
            )}

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
