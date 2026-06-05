import { useGameStore } from '../../store/gameStore';

const baseStyle = {
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontFamily: "'Segoe UI', sans-serif",
  fontWeight: 600,
  transition: 'all 0.2s ease',
};

const variants = {
  primary: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '14px 40px',
    fontSize: '18px',
    letterSpacing: '1px',
  },
  secondary: {
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '10px 24px',
    fontSize: '14px',
  },
  ghost: {
    background: 'transparent',
    color: '#bdc3c7',
    padding: '8px 16px',
    fontSize: '13px',
  },
  danger: {
    background: '#e74c3c',
    color: '#fff',
    padding: '10px 24px',
    fontSize: '14px',
  },
};

export function Button({ children, variant = 'primary', onClick, style, disabled }) {
  const handleClick = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);
    onClick?.(e);
  };

  return (
    <button
      style={{ ...baseStyle, ...variants[variant], opacity: disabled ? 0.5 : 1, ...style }}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children}
    </button>
  );
}

export function NavButton({ children, active, onClick }) {
  return (
    <button
      style={{
        padding: '8px 18px',
        borderRadius: '20px',
        border: active ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.2)',
        background: active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
        color: active ? '#667eea' : '#bdc3c7',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: "'Segoe UI', sans-serif",
        transition: 'all 0.2s',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function IconButton({ children, onClick, label, active }) {
  return (
    <button
      title={label}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        border: active ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
        background: active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
        color: active ? '#667eea' : '#ecf0f1',
        cursor: 'pointer',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
