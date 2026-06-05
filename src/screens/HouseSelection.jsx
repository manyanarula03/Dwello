import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { houses } from '../data/houses';
import { Button } from '../components/ui/Button';
import { Panel, Card } from '../components/ui/Panel';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 50%, #16213e 100%)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  leftPanel: {
    width: '380px',
    padding: '40px 30px',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  rightPanel: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
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
  houseCard: {
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  houseIcon: {
    fontSize: '28px',
  },
  houseName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ecf0f1',
  },
  roomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '10px',
    marginTop: '16px',
  },
  roomCard: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
    color: '#bdc3c7',
    fontSize: '14px',
  },
};

export function HouseSelection() {
  const { selectedHouse, selectHouse, selectedRoom, selectRoom, setScreen } = useGameStore();

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.heading}>Select House</div>
        <div style={styles.subheading}>Choose the type of home to design</div>
        {houses.map(h => (
          <div
            key={h.id}
            style={{
              ...styles.houseCard,
              borderColor: selectedHouse?.id === h.id ? '#667eea' : 'rgba(255,255,255,0.06)',
              background: selectedHouse?.id === h.id ? 'rgba(102,126,234,0.12)' : 'rgba(255,255,255,0.03)',
            }}
            onClick={() => selectHouse(h)}
          >
            <span style={styles.houseIcon}>{h.icon}</span>
            <span style={styles.houseName}>{h.name}</span>
          </div>
        ))}
      </div>
      <div style={styles.rightPanel}>
        {selectedHouse ? (
          <>
            <div style={styles.heading}>
              {selectedHouse.icon} {selectedHouse.name}
            </div>
            <div style={styles.subheading}>Available Rooms</div>
            <div style={styles.roomGrid}>
              {selectedHouse.rooms.map(r => (
                <div
                  key={r}
                  style={{
                    ...styles.roomCard,
                    borderColor: selectedRoom === r ? '#667eea' : 'rgba(255,255,255,0.06)',
                    background: selectedRoom === r ? 'rgba(102,126,234,0.12)' : 'rgba(255,255,255,0.03)',
                    color: selectedRoom === r ? '#667eea' : '#bdc3c7',
                  }}
                  onClick={() => selectRoom(r)}
                >
                  {r}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', textAlign: 'right' }}>
              <Button
                variant="primary"
                disabled={!selectedRoom}
                onClick={() => setScreen('themeSelect')}
              >
                SELECT ROOM
              </Button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#555', fontSize: '16px' }}>
            Select a house type to see available rooms
          </div>
        )}
      </div>
    </div>
  );
}
