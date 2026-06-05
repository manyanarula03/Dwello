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
    overflow: 'hidden',
    position: 'relative',
  },
  bgOrbs: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%)',
    top: '-200px',
    right: '-200px',
    pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(118,75,162,0.06) 0%, transparent 70%)',
    bottom: '-150px',
    left: '-150px',
    pointerEvents: 'none',
  },
  title: {
    fontSize: '72px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '8px',
    marginBottom: '8px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  subtitle: {
    fontSize: '18px',
    color: '#8899aa',
    letterSpacing: '12px',
    textTransform: 'uppercase',
    marginBottom: '60px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  features: {
    display: 'flex',
    gap: '24px',
    marginBottom: '50px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '600px',
  },
  feature: {
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#7f8c8d',
    fontSize: '13px',
    fontFamily: "'Segoe UI', sans-serif",
  },
};

export function MainMenu() {
  const setScreen = useGameStore(s => s.setScreen);
  const placements = useGameStore(s => s.placements);

  const features = [
    'Modern UI', 'Smooth Animations', 'Multiple House Types',
    'Theme Customization', 'Furniture Placement', '3D Isometric View',
  ];

  return (
    <div style={styles.container}>
      <div style={styles.bgOrbs} />
      <div style={styles.bgOrb2} />
      <div style={styles.title}>DWELLO</div>
      <div style={styles.subtitle}>Interior Designer</div>
      <div style={styles.features}>
        {features.map(f => (
          <span key={f} style={styles.feature}>{f}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Button variant="primary" onClick={() => setScreen('houseSelect')}>
          PLAY
        </Button>
        <Button variant="ghost" onClick={() => window.close()}>
          QUIT
        </Button>
      </div>
    </div>
  );
}
