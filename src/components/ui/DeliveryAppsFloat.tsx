'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DELIVERY_PARTNERS, DeliveryPartner } from '../../utils/deliveryPartners';

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
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2B1810', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🛵</span>
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
          backgroundColor: isOpen ? '#211510' : '#D96B27',
          color: '#FFFFFF',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isOpen
            ? '0 6px 20px rgba(33, 21, 16, 0.5)'
            : '0 4px 16px rgba(217, 107, 39, 0.45)',
          border: '2px solid #FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.22s ease',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 22px rgba(217, 107, 39, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isOpen
            ? '0 6px 20px rgba(33, 21, 16, 0.5)'
            : '0 4px 16px rgba(217, 107, 39, 0.45)';
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '20px', fontWeight: 800 }}>✕</span>
        ) : (
          <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Delivery Rider / Bike Icon */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 13c0-.55.45-1 1-1h2v2H5v-1zm12.65-2H15V9h2.35l.3 2z" />
              <circle cx="17" cy="16" r="2" />
              <circle cx="7" cy="16" r="2" />
            </svg>

            {/* Notification Badge indicating 4 Apps */}
            <span
              style={{
                position: 'absolute',
                top: '-7px',
                right: '-7px',
                backgroundColor: '#E23744',
                color: '#FFFFFF',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 800,
                padding: '1px 5px',
                border: '1.5px solid #FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
