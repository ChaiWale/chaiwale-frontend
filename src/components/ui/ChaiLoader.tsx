'use client';

import React from 'react';
import Image from 'next/image';

interface ChaiLoaderProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
}

export default function ChaiLoader({
  label = 'Brewing your details...',
  sublabel = 'Authentic taste & fresh calculations',
  fullScreen = false
}: ChaiLoaderProps) {
  const content = (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px',
        userSelect: 'none'
      }}
    >
      {/* Ambient Warm Golden Halo Glow */}
      <div
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 107, 39, 0.35) 0%, rgba(140, 89, 59, 0.15) 50%, transparent 70%)',
          filter: 'blur(32px)',
          zIndex: 0,
          animation: 'cwHaloPulse 2.4s infinite ease-in-out'
        }}
      />

      {/* Chaiwale Logo Zoom-in / Zoom-out Container */}
      <div
        style={{
          position: 'relative',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        {/* Soft Animated Outer Glow Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 107, 39, 0.45) 0%, rgba(245, 239, 230, 0.1) 60%, transparent 80%)',
            filter: 'blur(12px)',
            animation: 'cwGlowRing 2.2s infinite ease-in-out'
          }}
        />

        {/* Circular Logo Card with Zoom-in / Zoom-out Breathing Keyframes */}
        <div
          className="cw-zoom-pulse"
          style={{
            position: 'relative',
            width: '104px',
            height: '104px',
            borderRadius: '50%',
            overflow: 'hidden',
            padding: '4px',
            backgroundColor: '#1C100A',
            border: '2px solid rgba(217, 107, 39, 0.65)',
            boxShadow: '0 0 35px rgba(217, 107, 39, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            src="/assets/chaiwale-logo.jpeg"
            alt="Chaiwale"
            width={112}
            height={112}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%'
            }}
            priority
          />
        </div>
      </div>

      {/* Brand Typography */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#FAF6F0',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '6px',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
          zIndex: 1
        }}
      >
        {label}
      </h3>
      {sublabel && (
        <p
          style={{
            fontSize: '13px',
            color: '#C5B5A8',
            fontWeight: 500,
            maxWidth: '300px',
            lineHeight: 1.5,
            zIndex: 1
          }}
        >
          {sublabel}
        </p>
      )}

      {/* Zoom in - Zoom out Smooth Breathing Animation */}
      <style jsx global>{`
        @keyframes cwZoomPulse {
          0%, 100% {
            transform: scale(0.93);
            box-shadow: 0 0 20px rgba(217, 107, 39, 0.3);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 45px rgba(217, 107, 39, 0.65);
          }
        }
        @keyframes cwGlowRing {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.12);
          }
        }
        @keyframes cwHaloPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
          }
        }
        .cw-zoom-pulse {
          animation: cwZoomPulse 2.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(18, 9, 5, 0.88)',
          backdropFilter: 'blur(16px)'
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        backgroundColor: 'rgba(18, 9, 5, 0.6)'
      }}
    >
      {content}
    </div>
  );
}
