import React from 'react';

export interface BadgeProps {
  variant?: 'veg' | 'non-veg' | 'accent' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children }) => {
  const styles: Record<string, React.CSSProperties> = {
    veg: {
      backgroundColor: 'var(--cw-color-veg-bg)',
      color: 'var(--cw-color-veg)',
      border: '1px solid rgba(31, 136, 68, 0.25)'
    },
    'non-veg': {
      backgroundColor: 'var(--cw-color-nonveg-bg)',
      color: 'var(--cw-color-nonveg)',
      border: '1px solid rgba(186, 37, 37, 0.25)'
    },
    accent: {
      backgroundColor: 'var(--cw-color-accent-subtle)',
      color: 'var(--cw-color-accent)',
      border: '1px solid rgba(217, 107, 39, 0.25)'
    },
    neutral: {
      backgroundColor: 'var(--cw-color-surface-muted)',
      color: 'var(--cw-color-text-muted)',
      border: '1px solid var(--cw-color-border)'
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        borderRadius: 'var(--cw-radius-sm)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        ...styles[variant]
      }}
    >
      {variant === 'veg' && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--cw-color-veg)' }} />
      )}
      {variant === 'non-veg' && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--cw-color-nonveg)' }} />
      )}
      {children}
    </span>
  );
};
