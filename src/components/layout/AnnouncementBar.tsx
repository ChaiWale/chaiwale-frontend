import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      aria-label="Service Announcements"
      style={{
        backgroundColor: 'var(--cw-color-dark)',
        color: '#ffffff',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: 500,
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="cw-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span>📍 Serving Rohini, Pitampura, and Delhi NCR</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>Corporate Lunch & Bhandara Catering Orders Open</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <a
          href="https://wa.me/919310112564"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#F3ECE5', textDecoration: 'underline', fontWeight: 600 }}
        >
          WhatsApp: +91 93101 12564
        </a>
      </div>
    </aside>
  );
};
