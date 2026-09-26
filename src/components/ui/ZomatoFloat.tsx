'use client';

import React from 'react';

export function ZomatoFloat() {
  const zomatoUrl = 'https://zomato.onelink.me/xqzv/zmfs3x6y';

  return (
    <a
      href={zomatoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order Chaiwale on Zomato"
      title="Order on Zomato"
      id="zomato-floating-button"
      style={{
        position: 'fixed',
        bottom: '92px',
        right: '24px',
        zIndex: 999,
        backgroundColor: '#E23744',
        color: '#FFFFFF',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(226, 55, 68, 0.45)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 6px 22px rgba(226, 55, 68, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(226, 55, 68, 0.45)';
      }}
    >
      {/* Delivery Rider / Boy Icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 13c0-.55.45-1 1-1h2v2H5v-1zm12.65-2H15V9h2.35l.3 2z" />
        <circle cx="17" cy="16" r="2" />
        <circle cx="7" cy="16" r="2" />
      </svg>
    </a>
  );
}
