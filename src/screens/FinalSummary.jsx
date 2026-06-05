import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 50%, #16213e 100%)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: 'rgba(20, 20, 30, 0.95)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '48px',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#ecf0f1',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '36px',
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 32px',
    fontSize: '32px',
    fontWeight: 800,
    color: '#fff',
    boxShadow: '0 0 40px rgba(102,126,234,0.3)',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '14px',
  },
  statLabel: {
    color: '#7f8c8d',
  },
  statValue: {
    color: '#ecf0f1',
    fontWeight: 600,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '36px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

export function FinalSummary() {
  const { designSummary, setScreen, resetGame, selectedHouse, selectedRoom, selectedTheme } = useGameStore();

  if (!designSummary) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ color: '#7f8c8d', marginBottom: '20px' }}>No design to summarize</div>
          <Button onClick={() => setScreen('menu')}>MAIN MENU</Button>
        </div>
      </div>
    );
  }

  const handleEditAgain = () => {
    setScreen('editor');
  };

  const handleMainMenu = () => {
    resetGame();
    setScreen('menu');
  };

  const handleSave = () => {
    const data = {
      ...designSummary,
      date: new Date().toISOString(),
      house: selectedHouse?.name,
      room: selectedRoom,
      theme: selectedTheme?.name,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dwello-design-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Design Complete!</div>
        <div style={styles.subtitle}>Your dream room has been designed</div>

        <div style={styles.scoreCircle}>
          {designSummary.totalScore}
        </div>

        <div style={styles.statRow}>
          <span style={styles.statLabel}>House</span>
          <span style={styles.statValue}>{designSummary.house || '—'}</span>
        </div>
        <div style={styles.statRow}>
          <span style={styles.statLabel}>Room</span>
          <span style={styles.statValue}>{designSummary.room || '—'}</span>
        </div>
        <div style={styles.statRow}>
          <span style={styles.statLabel}>Theme</span>
          <span style={styles.statValue}>{designSummary.theme || 'None'}</span>
        </div>
        <div style={styles.statRow}>
          <span style={styles.statLabel}>Items Placed</span>
          <span style={styles.statValue}>{designSummary.furnitureCount}</span>
        </div>

        <div style={styles.actions}>
          <Button variant="primary" onClick={handleEditAgain}>
            EDIT AGAIN
          </Button>
          <Button variant="secondary" onClick={handleSave}>
            SAVE DESIGN
          </Button>
          <Button variant="ghost" onClick={handleMainMenu}>
            MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  );
}
