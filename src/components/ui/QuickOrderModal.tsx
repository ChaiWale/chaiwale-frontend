'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PhoneNumberOption {
  id: string;
  display: string;
  raw: string;
  label: string;
  isDefault?: boolean;
}

const PHONE_OPTIONS: PhoneNumberOption[] = [
  {
    id: 'primary',
    display: '+91 93101 12564',
    raw: '919310112564',
    label: 'Main Line (Fastest)',
    isDefault: true
  },
  {
    id: 'secondary',
    display: '+91 93101 10414',
    raw: '919310110414',
    label: 'Support / Helpline',
    isDefault: false
  }
];

export function QuickOrderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Expanded accordion sections: 'none' | 'whatsapp' | 'call'
  const [expandedSection, setExpandedSection] = useState<'none' | 'whatsapp' | 'call'>('none');

  // Selected phone number IDs (defaulting to 'primary')
  const [selectedWaNumber, setSelectedWaNumber] = useState<string>('919310112564');
  const [selectedCallNumber, setSelectedCallNumber] = useState<string>('919310112564');

  const zomatoUrl = 'https://zomato.onelink.me/xqzv/zmfs3x6y';

  useEffect(() => {
    setMounted(true);
    const hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem('chaiwale_order_modal_dismissed') : null;
    const forceShow = typeof window !== 'undefined' && window.location.search.includes('order=now');

    if (!hasSeen || forceShow) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chaiwale_order_modal_dismissed', '1');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleWhatsAppClick = () => {
    const defaultMsg = encodeURIComponent('Hello Chaiwale! I would like to place an order.');
    const waUrl = `https://wa.me/${selectedWaNumber}?text=${defaultMsg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const handleCallClick = () => {
    const telUrl = `tel:+${selectedCallNumber}`;
    window.location.href = telUrl;
    handleClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(20, 14, 10, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '450px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '26px 20px 20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35), 0 0 1px rgba(0, 0, 0, 0.15)',
          animation: 'slideUpScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          color: '#2B1810',
          fontFamily: 'inherit'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close order options"
          id="close-order-modal-btn"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#F3EFEA',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6F432A',
            fontSize: '18px',
            fontWeight: 700,
            transition: 'background-color 0.2s, transform 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E5DCD3';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F3EFEA';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          {/* Chaiwale Brand Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <img
              src="/assets/chaiwale-logo.jpeg"
              alt="Chaiwale"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 14px rgba(111, 67, 42, 0.22)',
                border: '2.5px solid #F3ECE5'
              }}
            />
          </div>

          <h2
            id="order-modal-title"
            style={{
              fontSize: '21px',
              fontWeight: 800,
              color: '#2B1810',
              lineHeight: 1.25,
              margin: '0 0 6px 0'
            }}
          >
            How would you like to order?
          </h2>
          <p
            style={{
              fontSize: '12.5px',
              color: '#6F5B50',
              lineHeight: 1.4,
              margin: 0
            }}
          >
            Authentic Kulhad Chai, North Indian meals, snacks & catering delivered fresh!
          </p>
        </div>

        {/* 4 Action Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
          
          {/* 1. ORDER ON ZOMATO */}
          <a
            href={zomatoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            id="modal-order-zomato"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 15px',
              borderRadius: '16px',
              backgroundColor: '#FFF5F5',
              border: '1.5px solid #FBC7C9',
              textDecoration: 'none',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(226, 55, 68, 0.18)';
              e.currentTarget.style.borderColor = '#E23744';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#FBC7C9';
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#E23744',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 13c0-.55.45-1 1-1h2v2H5v-1zm12.65-2H15V9h2.35l.3 2z" />
                <circle cx="17" cy="16" r="2" />
                <circle cx="7" cy="16" r="2" />
              </svg>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#E23744', lineHeight: 1.2 }}>
                Order on Zomato
              </div>
              <div style={{ fontSize: '11.5px', color: '#7A6264', marginTop: '2px' }}>
                Live tracking • Offers • Fast delivery
              </div>
            </div>

            <div style={{ color: '#E23744', fontWeight: 700, fontSize: '16px' }}>➔</div>
          </a>

          {/* 2. ORDER ON WHATSAPP (WITH 2 NUMBER SELECTOR) */}
          <div
            style={{
              borderRadius: '16px',
              backgroundColor: '#F0FDF4',
              border: `1.5px solid ${expandedSection === 'whatsapp' ? '#25D366' : '#BBF7D0'}`,
              overflow: 'hidden',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            {/* Header / Toggle */}
            <div
              onClick={() => setExpandedSection(expandedSection === 'whatsapp' ? 'none' : 'whatsapp')}
              id="modal-order-whatsapp"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 15px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.59c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.12.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#16A34A', lineHeight: 1.2 }}>
                  Order on WhatsApp
                </div>
                <div style={{ fontSize: '11.5px', color: '#556E5D', marginTop: '2px' }}>
                  {expandedSection === 'whatsapp' ? 'Select number below' : 'Chat with store • Custom orders'}
                </div>
              </div>

              <div style={{ color: '#16A34A', fontWeight: 700, fontSize: '14px' }}>
                {expandedSection === 'whatsapp' ? '▲' : '▼'}
              </div>
            </div>

            {/* Expandable 2-Number Selector */}
            {expandedSection === 'whatsapp' && (
              <div
                style={{
                  padding: '4px 14px 14px 14px',
                  borderTop: '1px solid #DCFCE7',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#166534', margin: '8px 0 6px' }}>
                  Select WhatsApp Number:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {PHONE_OPTIONS.map((opt) => {
                    const isSelected = selectedWaNumber === opt.raw;
                    return (
                      <div
                        key={`wa-${opt.id}`}
                        onClick={() => setSelectedWaNumber(opt.raw)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          backgroundColor: isSelected ? '#F0FDF4' : '#F9FAFB',
                          border: `1.5px solid ${isSelected ? '#22C55E' : '#E5E7EB'}`,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="radio"
                            name="wa_number_choice"
                            checked={isSelected}
                            onChange={() => setSelectedWaNumber(opt.raw)}
                            style={{ accentColor: '#16A34A', cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1F2937' }}>
                            {opt.display}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: isSelected ? '#15803D' : '#6B7280',
                            backgroundColor: isSelected ? '#DCFCE7' : '#F3F4F6',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          {opt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Direct Action Button with Selected Number */}
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  id="btn-confirm-whatsapp"
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '11px',
                    borderRadius: '12px',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.15s ease, background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1EBE5D')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                >
                  <span>Chat on WhatsApp ({selectedWaNumber === '919310112564' ? '+91 93101 12564' : '+91 93101 10414'})</span>
                  <span>➔</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. CALL STORE DIRECTLY (WITH 2 NUMBER SELECTOR) */}
          <div
            style={{
              borderRadius: '16px',
              backgroundColor: '#EFF6FF',
              border: `1.5px solid ${expandedSection === 'call' ? '#3B82F6' : '#BFDBFE'}`,
              overflow: 'hidden',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            {/* Header / Toggle */}
            <div
              onClick={() => setExpandedSection(expandedSection === 'call' ? 'none' : 'call')}
              id="modal-order-call"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 15px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1D4ED8', lineHeight: 1.2 }}>
                  Call Store to Order
                </div>
                <div style={{ fontSize: '11.5px', color: '#4B6B94', marginTop: '2px' }}>
                  {expandedSection === 'call' ? 'Select number below' : 'Direct phone call • Instant booking'}
                </div>
              </div>

              <div style={{ color: '#1D4ED8', fontWeight: 700, fontSize: '14px' }}>
                {expandedSection === 'call' ? '▲' : '▼'}
              </div>
            </div>

            {/* Expandable 2-Number Selector */}
            {expandedSection === 'call' && (
              <div
                style={{
                  padding: '4px 14px 14px 14px',
                  borderTop: '1px solid #DBEAFE',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#1E40AF', margin: '8px 0 6px' }}>
                  Select Calling Number:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {PHONE_OPTIONS.map((opt) => {
                    const isSelected = selectedCallNumber === opt.raw;
                    return (
                      <div
                        key={`call-${opt.id}`}
                        onClick={() => setSelectedCallNumber(opt.raw)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          backgroundColor: isSelected ? '#EFF6FF' : '#F9FAFB',
                          border: `1.5px solid ${isSelected ? '#3B82F6' : '#E5E7EB'}`,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="radio"
                            name="call_number_choice"
                            checked={isSelected}
                            onChange={() => setSelectedCallNumber(opt.raw)}
                            style={{ accentColor: '#2563EB', cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1F2937' }}>
                            {opt.display}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: isSelected ? '#1D4ED8' : '#6B7280',
                            backgroundColor: isSelected ? '#DBEAFE' : '#F3F4F6',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          {opt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Direct Call Button with Selected Number */}
                <button
                  type="button"
                  onClick={handleCallClick}
                  id="btn-confirm-call"
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '11px',
                    borderRadius: '12px',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
                    transition: 'transform 0.15s ease, background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
                >
                  <span>Call ({selectedCallNumber === '919310112564' ? '+91 93101 12564' : '+91 93101 10414'})</span>
                  <span>➔</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. ORDER ON WEBSITE / BROWSE MENU */}
          <Link
            href="/menu"
            onClick={handleClose}
            id="modal-order-website"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 15px',
              borderRadius: '16px',
              backgroundColor: '#FAF6F2',
              border: '1.5px solid #E4D8CE',
              textDecoration: 'none',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(111, 67, 42, 0.18)';
              e.currentTarget.style.borderColor = '#6F432A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#E4D8CE';
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#6F432A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
              </svg>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#6F432A', lineHeight: 1.2 }}>
                Order on Website
              </div>
              <div style={{ fontSize: '11.5px', color: '#7C675B', marginTop: '2px' }}>
                Browse 80+ items • Thalis & combos
              </div>
            </div>

            <div style={{ color: '#6F432A', fontWeight: 700, fontSize: '16px' }}>➔</div>
          </Link>
        </div>

        {/* Footer Dismiss Link */}
        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#8C7769',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '4px 10px'
            }}
          >
            Or browse website directly
          </button>
        </div>
      </div>
    </div>
  );
}
