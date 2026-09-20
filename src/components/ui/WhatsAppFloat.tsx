'use client';

import React from 'react';
import { getStoreWhatsAppUrl, DEFAULT_STORE_MESSAGE } from '../../utils/whatsapp';

interface WhatsAppFloatProps {
  customMessage?: string;
}

export function WhatsAppFloat({ customMessage }: WhatsAppFloatProps) {
  // Phone is sourced from NEXT_PUBLIC_WHATSAPP_NUMBER env var or verified store default.
  // No hardcoded construction — centralized via whatsapp.ts utility.
  const waUrl = getStoreWhatsAppUrl(customMessage || DEFAULT_STORE_MESSAGE);

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Chaiwale on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.45)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.45)';
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.06 16.28C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.33C16.32 14.2 15.1 13.6 14.87 13.52C14.65 13.43 14.48 13.39 14.32 13.64C14.15 13.88 13.67 14.45 13.53 14.62C13.38 14.78 13.23 14.8 12.98 14.68C12.73 14.55 11.93 14.29 10.98 13.44C10.23 12.77 9.73 11.95 9.58 11.7C9.44 11.45 9.57 11.31 9.69 11.19C9.8 11.08 9.94 10.9 10.06 10.75C10.19 10.61 10.23 10.5 10.31 10.34C10.39 10.17 10.35 10.03 10.29 9.9C10.23 9.78 9.73 8.56 9.53 8.06C9.33 7.58 9.12 7.64 8.97 7.63C8.82 7.62 8.65 7.62 8.49 7.62C8.32 7.62 8.05 7.68 7.82 7.93C7.59 8.18 6.94 8.79 6.94 10.03C6.94 11.27 7.84 12.47 7.97 12.63C8.09 12.8 9.75 15.36 12.28 16.45C12.88 16.71 13.35 16.87 13.72 16.99C14.33 17.18 14.88 17.15 15.32 17.09C15.81 17.02 16.82 16.48 17.03 15.89C17.24 15.3 17.24 14.8 17.18 14.68C17.12 14.57 16.96 14.47 16.57 14.33Z" />
      </svg>
    </a>
  );
}
