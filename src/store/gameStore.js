import { create } from 'zustand';

const loadState = () => {
  try {
    const saved = localStorage.getItem('dwello-state');
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

const initialState = {
  screen: 'menu',
  selectedHouse: null,
  selectedRoom: null,
  selectedTheme: null,
  activeCategory: 'living-room',
  activeSubCategory: 'furniture',
  selectedItem: null,
  placements: [],
  score: 0,
  designSummary: null,
  wallColor: '#F5F5F5',
  floorColor: '#D5D8DC',
};

export const useGameStore = create((set, get) => ({
  ...(loadState() || initialState),

  setScreen: (screen) => set({ screen }),

  selectHouse: (house) => set({ selectedHouse: house, selectedRoom: null }),

  selectRoom: (room) => set({ selectedRoom: room }),

  selectTheme: (theme) => {
    const colors = theme.colors;
    set({
      selectedTheme: theme,
      wallColor: colors.wall,
      floorColor: colors.floor,
    });
  },

  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setActiveSubCategory: (cat) => set({ activeSubCategory: cat }),
  setSelectedItem: (item) => set({ selectedItem: item }),

  placeItem: (item, position = { x: 0, z: 0 }, rotation = 0) => {
    const placements = [...get().placements, { ...item, position, rotation, id: `${item.id}-${Date.now()}` }];
    set({ placements });
    get().recalculateScore();
    get().saveState();
  },

  removeItem: (placementId) => {
    const placements = get().placements.filter(p => p.id !== placementId);
    set({ placements });
    get().recalculateScore();
    get().saveState();
  },

  clearPlacements: () => {
    set({ placements: [], score: 0 });
    get().saveState();
  },

  setWallColor: (color) => set({ wallColor: color }),
  setFloorColor: (color) => set({ floorColor: color }),

  recalculateScore: () => {
    const { placements, selectedTheme } = get();
    let score = 0;
    score += placements.length * 10;
    if (selectedTheme) {
      const themeMatch = placements.filter(p => {
        const itemColor = p.color?.toLowerCase() || '';
        const themeColorValues = Object.values(selectedTheme.colors).map(c => c.toLowerCase());
        return themeColorValues.some(tc => itemColor.includes(tc) || tc.includes(itemColor));
      }).length;
      score += themeMatch * 15;
    }
    set({ score });
  },

  finishDesign: () => {
    const { selectedTheme, placements, score, selectedHouse, selectedRoom } = get();
    set({
      designSummary: {
        theme: selectedTheme?.name || 'None',
        furnitureCount: placements.length,
        decorationCount: placements.length,
        totalScore: score,
        house: selectedHouse?.name,
        room: selectedRoom,
      },
      screen: 'summary',
    });
    get().saveState();
  },

  saveState: () => {
    const state = get();
    const toSave = {
      screen: state.screen,
      selectedHouse: state.selectedHouse,
      selectedRoom: state.selectedRoom,
      selectedTheme: state.selectedTheme,
      placements: state.placements,
      score: state.score,
      designSummary: state.designSummary,
      wallColor: state.wallColor,
      floorColor: state.floorColor,
      activeCategory: state.activeCategory,
      activeSubCategory: state.activeSubCategory,
    };
    localStorage.setItem('dwello-state', JSON.stringify(toSave));
  },

  resetGame: () => {
    localStorage.removeItem('dwello-state');
    set(initialState);
  },
}));
