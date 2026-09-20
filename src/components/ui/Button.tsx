import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  style,
  disabled,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--cw-font-heading)',
    fontWeight: 600,
    borderRadius: 'var(--cw-radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--cw-transition-fast)',
    border: '1px solid transparent',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    lineHeight: 1
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 14px', fontSize: '13px' },
    md: { padding: '12px 20px', fontSize: '15px' },
    lg: { padding: '15px 28px', fontSize: '17px' }
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--cw-color-primary)',
      color: '#ffffff',
      boxShadow: 'var(--cw-shadow-sm)'
    },
    secondary: {
      backgroundColor: 'var(--cw-color-dark)',
      color: '#ffffff'
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: 'var(--cw-color-primary)',
      color: 'var(--cw-color-primary)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--cw-color-text-main)'
    },
    whatsapp: {
      backgroundColor: 'var(--cw-color-whatsapp)',
      color: '#ffffff',
      boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
    }
  };

  return (
    <button
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant], ...style }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
