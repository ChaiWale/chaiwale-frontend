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
    <div className="relative flex flex-col items-center justify-center text-center p-8 select-none">
      {/* Ambient Warm Golden Halo Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#D96B27]/30 via-[#8C593B]/20 to-transparent blur-3xl -z-10 animate-pulse" />

      {/* Chaiwale Logo Zoom-in / Zoom-out Container */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Soft Animated Outer Glow Ring */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#D96B27]/40 via-[#F5EFE6]/10 to-[#8C593B]/40 blur-md animate-cw-logo-glow" />

        {/* Circular Logo Card with Zoom-in / Zoom-out Breathing Keyframes */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-[#1C100A] border-2 border-[#D96B27]/60 shadow-[0_0_30px_rgba(217,107,39,0.35)] animate-cw-zoom flex items-center justify-center">
          <Image
            src="/assets/chaiwale-logo.jpeg"
            alt="Chaiwale"
            width={112}
            height={112}
            className="w-full h-full object-cover rounded-full"
            priority
          />
        </div>
      </div>

      {/* Brand Typography */}
      <h3 className="text-lg font-black text-[#FAF6F0] tracking-wider uppercase mb-1 font-heading">
        {label}
      </h3>
      {sublabel && (
        <p className="text-xs text-[#C5B5A8] font-medium tracking-normal max-w-xs leading-relaxed">
          {sublabel}
        </p>
      )}

      {/* Zoom in - Zoom out Smooth Breathing Animation */}
      <style jsx global>{`
        @keyframes cwZoom {
          0%, 100% {
            transform: scale(0.92);
            box-shadow: 0 0 20px rgba(217, 107, 39, 0.25);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 45px rgba(217, 107, 39, 0.55);
          }
        }
        @keyframes cwGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
        .animate-cw-zoom {
          animation: cwZoom 2.2s infinite ease-in-out;
        }
        .animate-cw-logo-glow {
          animation: cwGlow 2.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#120905]/85 backdrop-blur-xl">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center backdrop-blur-md rounded-2xl bg-[#120905]/60">
      {content}
    </div>
  );
}
