'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DELIVERY_PARTNERS, DeliveryPartner } from '../../utils/deliveryPartners';
import { DeliveryRiderIcon } from './DeliveryRiderIcon';

export function DeliveryAppsFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Outside Click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: '92px',
        right: '24px',
        zIndex: 999
      }}
    >
      {/* ── EXPANDED SPEED-DIAL POPOVER TRAY ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose food delivery app"
          style={{
            position: 'absolute',
            bottom: '68px',
            right: '0',
            width: '310px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.22), 0 0 1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #F0E6D8',
            animation: 'fadeInUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'inherit',
            color: '#2B1810'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '10px',
              borderBottom: '1px solid #F5EFE6'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2B1810', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DeliveryRiderIcon size={24} riderColor="#D96B27" scooterColor="#2E1F18" speedLineColor="#D96B27" />
                <span>Order on Food Apps</span>
              </div>
              <div style={{ fontSize: '11px', color: '#705F55', marginTop: '1px' }}>
                Tap your preferred delivery app
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close delivery menu"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#F5EFE6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#6F432A',
                fontSize: '14px',
                fontWeight: 700
              }}
            >
              ✕
            </button>
          </div>

          {/* Partner Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DELIVERY_PARTNERS.map((partner: DeliveryPartner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                id={`float-partner-${partner.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '9px 12px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: `1.5px solid ${partner.borderColor}`,
                  textDecoration: 'none',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = partner.lightBg;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${partner.borderColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Official Brand Logo */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Partner Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: partner.brandColor }}>
                      {partner.displayName}
                    </span>
                    {partner.badge && (
                      <span
                        style={{
                          fontSize: '9.5px',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: partner.lightBg,
                          color: partner.brandColor,
                          border: `1px solid ${partner.borderColor}`
                        }}
                      >
                        {partner.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#705F55', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {partner.tagline}
                  </div>
                </div>

                {/* Action Arrow */}
                <div style={{ color: partner.brandColor, fontWeight: 800, fontSize: '14px' }}>
                  ➔
                </div>
              </a>
            ))}
          </div>

          {/* Micro Footer Note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid #F5EFE6',
              fontSize: '10.5px',
              color: '#98877D'
            }}
          >
            Direct store delivery &amp; live kitchen tracking
          </div>
        </div>
      )}

      {/* ── FLOATING ACTION BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Order Chaiwale on Food Delivery Apps"
        aria-expanded={isOpen}
        id="delivery-apps-floating-button"
        style={{
          backgroundColor: isOpen ? '#211510' : '#6F432A',
          color: '#FFFFFF',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isOpen
            ? '0 6px 20px rgba(33, 21, 16, 0.5)'
            : '0 6px 20px rgba(111, 67, 42, 0.55)',
          border: '2px solid #FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.22s ease',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isOpen ? '#211510' : '#5A3520';
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(111, 67, 42, 0.65)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isOpen ? '#211510' : '#6F432A';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isOpen
            ? '0 6px 20px rgba(33, 21, 16, 0.5)'
            : '0 6px 20px rgba(111, 67, 42, 0.55)';
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '20px', fontWeight: 800 }}>✕</span>
        ) : (
          <div style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Custom Brand Delivery Rider Scooter Icon */}
            <DeliveryRiderIcon
              size={34}
              riderColor="#F59E0B"
              scooterColor="#FFFFFF"
              speedLineColor="#F59E0B"
            />

            {/* Notification Badge indicating 4 Apps */}
            <span
              style={{
                position: 'absolute',
                top: '-7px',
                right: '-7px',
                backgroundColor: '#D96B27',
                color: '#FFFFFF',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 5px',
                border: '1.5px solid #FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
              }}
            >
              4
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
