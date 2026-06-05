import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { furnitureCategories } from '../data/furniture';
import { decorationCategories } from '../data/decorations';
import { IsometricRoom } from '../components/canvas/IsometricRoom';
import { Button, NavButton, IconButton } from '../components/ui/Button';
import { Panel, Card } from '../components/ui/Panel';
import { ScoreBar } from '../components/ui/ScoreBar';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    background: '#0c0c1d',
    fontFamily: "'Segoe UI', sans-serif",
    overflow: 'hidden',
  },
  toolbar: {
    width: '72px',
    background: 'rgba(20, 20, 30, 0.95)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 0',
    gap: '8px',
    zIndex: 10,
  },
  sidebar: {
    width: '300px',
    background: 'rgba(20, 20, 30, 0.95)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
    overflow: 'hidden',
  },
  sidebarHeader: {
    padding: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#ecf0f1',
    marginBottom: '4px',
  },
  sidebarSub: {
    fontSize: '12px',
    color: '#7f8c8d',
  },
  categoryTabs: {
    display: 'flex',
    gap: '4px',
    padding: '10px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    overflowX: 'auto',
    flexShrink: 0,
  },
  itemList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px',
  },
  itemCard: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer',
    marginBottom: '6px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  itemPreview: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  itemName: {
    fontSize: '13px',
    color: '#bdc3c7',
    fontWeight: 500,
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  colorBar: {
    display: 'flex',
    gap: '6px',
    padding: '8px 12px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    alignItems: 'center',
    flexShrink: 0,
  },
};

const subCategories = [
  { id: 'furniture', label: 'Furniture', icon: '🪑' },
  { id: 'decoration', label: 'Decoration', icon: '🎨' },
  { id: 'lighting', label: 'Lighting', icon: '💡' },
  { id: 'electronics', label: 'Electronics', icon: '📺' },
  { id: 'plants', label: 'Plants', icon: '🌿' },
];

function getCategoryData(subCatId) {
  if (subCatId === 'furniture') return furnitureCategories;
  return decorationCategories.filter(c => c.id === subCatId);
}

function getItemsForSubCategory(subCatId) {
  if (subCatId === 'furniture') {
    return furnitureCategories.flatMap(c => c.items);
  }
  const cat = decorationCategories.find(c => c.id === subCatId);
  return cat?.items || [];
}

export function RoomEditor() {
  const {
    activeSubCategory, setActiveSubCategory,
    activeCategory, setActiveCategory,
    selectedItem, setSelectedItem,
    placements, removeItem,
    setScreen, finishDesign, clearPlacements,
    wallColor, setWallColor, floorColor, setFloorColor,
  } = useGameStore();

  const categories = getCategoryData(activeSubCategory);
  const items = getItemsForSubCategory(activeSubCategory);
  const currentCat = categories.find(c => c.id === activeCategory);
  const catItems = activeSubCategory === 'furniture'
    ? currentCat?.items || []
    : items;

  const [showColors, setShowColors] = useState(false);

  const colorOptions = [
    '#FFFFFF', '#F5F5F5', '#E8E8E8', '#D5D8DC', '#BDC3C7',
    '#95A5A6', '#7F8C8D', '#566573', '#2C3E50', '#1A252F',
    '#F5CBA7', '#E59866', '#D4A574', '#A0522D', '#8B4513',
    '#F1948A', '#E74C3C', '#C0392B', '#8E44AD', '#6C3483',
    '#85C1E9', '#3498DB', '#2874A6', '#1ABC9C', '#27AE60',
  ];

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        {subCategories.map(sc => (
          <IconButton
            key={sc.id}
            label={sc.label}
            active={activeSubCategory === sc.id}
            onClick={() => { setActiveSubCategory(sc.id); setSelectedItem(null); }}
          >
            {sc.icon}
          </IconButton>
        ))}
        <div style={{ flex: 1 }} />
        <IconButton label="Colors" active={showColors} onClick={() => setShowColors(!showColors)}>
          🎨
        </IconButton>
        <IconButton label="Clear All" onClick={clearPlacements}>
          🗑️
        </IconButton>
      </div>

      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarTitle}>
            {activeSubCategory === 'furniture' ? 'Furniture' : 'Decorations'}
          </div>
          <div style={styles.sidebarSub}>
            {placements.length} items placed | Click on room to place
          </div>
        </div>

        {activeSubCategory === 'furniture' && (
          <div style={styles.categoryTabs}>
            {categories.map(c => (
              <NavButton
                key={c.id}
                active={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.name}
              </NavButton>
            ))}
          </div>
        )}

        <div style={styles.itemList}>
          {catItems.map(item => (
            <div
              key={item.id}
              style={{
                ...styles.itemCard,
                borderColor: selectedItem?.id === item.id ? '#667eea' : 'rgba(255,255,255,0.06)',
                background: selectedItem?.id === item.id ? 'rgba(102,126,234,0.12)' : 'rgba(255,255,255,0.03)',
              }}
              onClick={() => setSelectedItem(item)}
            >
              <div style={{ ...styles.itemPreview, background: item.color }}>
                {item.shape === 'sphere' ? '⬤' : item.shape === 'cylinder' ? '⬤' : '▣'}
              </div>
              <span style={styles.itemName}>{item.name}</span>
            </div>
          ))}
        </div>

        {showColors && (
          <div style={styles.colorBar}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
              <div style={{ fontSize: '11px', color: '#7f8c8d' }}>Wall</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {colorOptions.slice(0, 10).map(c => (
                  <div
                    key={c}
                    style={{
                      width: '20px', height: '20px', borderRadius: '4px',
                      background: c, cursor: 'pointer',
                      border: wallColor === c ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.2)',
                    }}
                    onClick={() => setWallColor(c)}
                  />
                ))}
              </div>
              <div style={{ fontSize: '11px', color: '#7f8c8d', marginTop: '4px' }}>Floor</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {colorOptions.slice(0, 10).map(c => (
                  <div
                    key={c}
                    style={{
                      width: '20px', height: '20px', borderRadius: '4px',
                      background: c, cursor: 'pointer',
                      border: floorColor === c ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.2)',
                    }}
                    onClick={() => setFloorColor(c)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="secondary" style={{ flex: 1, fontSize: '12px', padding: '8px' }} onClick={() => setScreen('themeSelect')}>
            BACK
          </Button>
          <Button variant="primary" style={{ flex: 1, fontSize: '12px', padding: '8px' }} onClick={finishDesign}>
            FINISH
          </Button>
        </div>
      </div>

      <div style={styles.canvas}>
        <IsometricRoom />
        <ScoreBar />
      </div>
    </div>
  );
}
