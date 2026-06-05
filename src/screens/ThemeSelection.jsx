import { useGameStore } from '../store/gameStore';
import { themes } from '../data/themes';
import { Button } from '../components/ui/Button';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 50%, #16213e 100%)',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '40px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#ecf0f1',
    marginBottom: '8px',
  },
  subheading: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
    flex: 1,
  },
  card: {
    borderRadius: '14px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
  },
  preview: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  colorDot: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.3)',
  },
  info: {
    padding: '16px',
    background: 'rgba(255,255,255,0.04)',
  },
  name: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ecf0f1',
    marginBottom: '6px',
  },
  desc: {
    fontSize: '13px',
    color: '#7f8c8d',
    lineHeight: '1.4',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'right',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
};

export function ThemeSelection() {
  const { selectedTheme, selectTheme, setScreen } = useGameStore();

  return (
    <div style={styles.container}>
      <div style={styles.heading}>Choose Interior Theme</div>
      <div style={styles.subheading}>Select a style that matches your vision</div>
      <div style={styles.grid}>
        {themes.map(t => {
          const isSelected = selectedTheme?.id === t.id;
          const colors = Object.values(t.colors).slice(0, 4);
          return (
            <div
              key={t.id}
              style={{
                ...styles.card,
                borderColor: isSelected ? '#667eea' : 'transparent',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isSelected ? '0 0 30px rgba(102,126,234,0.2)' : 'none',
              }}
              onClick={() => selectTheme(t)}
            >
              <div style={{ ...styles.preview, background: `linear-gradient(135deg, ${t.colors.wall} 0%, ${t.colors.primary} 100%)` }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {colors.map(c => (
                    <div key={c} style={{ ...styles.colorDot, background: c }} />
                  ))}
                </div>
              </div>
              <div style={styles.info}>
                <div style={styles.name}>{t.name}</div>
                <div style={styles.desc}>{t.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={styles.footer}>
        <Button variant="ghost" onClick={() => setScreen('houseSelect')}>BACK</Button>
        <Button variant="primary" disabled={!selectedTheme} onClick={() => setScreen('editor')}>
          APPLY THEME
        </Button>
      </div>
    </div>
  );
}
