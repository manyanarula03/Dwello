import { useGameStore } from '../../store/gameStore';

export function ScoreBar() {
  const score = useGameStore(s => s.score);
  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        background: 'rgba(20, 20, 30, 0.9)',
        borderRadius: '12px',
        padding: '10px 20px',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#f1c40f',
        fontWeight: 700,
        fontSize: '16px',
        fontFamily: "'Segoe UI', sans-serif",
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>⭐</span>
      <span>{score}</span>
    </div>
  );
}
