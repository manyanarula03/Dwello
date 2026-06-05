export function Panel({ title, children, style, width = '320px' }) {
  return (
    <div
      style={{
        width,
        background: 'rgba(20, 20, 30, 0.95)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            fontSize: '15px',
            fontWeight: 700,
            color: '#ecf0f1',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </div>
      )}
      <div style={{ padding: '12px 16px', overflowY: 'auto', flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export function Card({ children, selected, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '12px 16px',
        borderRadius: '10px',
        border: selected ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.06)',
        background: selected ? 'rgba(102, 126, 234, 0.12)' : 'rgba(255,255,255,0.03)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        marginBottom: '8px',
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.background = 'rgba(102, 126, 234, 0.08)'; }}
      onMouseLeave={(e) => { if (onClick) e.currentTarget.style.background = selected ? 'rgba(102, 126, 234, 0.12)' : 'rgba(255,255,255,0.03)'; }}
    >
      {children}
    </div>
  );
}
