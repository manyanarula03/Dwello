export const decorationCategories = [
  {
    id: 'decoration',
    name: 'Decoration',
    items: [
      { id: 'curtains', name: 'Curtains', shape: 'box', size: [2, 1.5, 0.05], color: '#E74C3C', gridSize: [2, 1] },
      { id: 'wall-painting', name: 'Wall Painting', shape: 'box', size: [0.8, 0.6, 0.05], color: '#F39C12', gridSize: [1, 1] },
      { id: 'photo-frame', name: 'Photo Frame', shape: 'box', size: [0.4, 0.5, 0.03], color: '#8B4513', gridSize: [1, 1] },
      { id: 'rug', name: 'Rug', shape: 'box', size: [2, 0.05, 1.5], color: '#9B59B6', gridSize: [2, 2] },
      { id: 'wall-clock', name: 'Wall Clock', shape: 'cylinder', size: [0.3, 0.05, 0.3], color: '#2C3E50', gridSize: [1, 1] },
      { id: 'candles', name: 'Candles', shape: 'box', size: [0.2, 0.3, 0.2], color: '#F5CBA7', gridSize: [1, 1] },
      { id: 'vase', name: 'Decorative Vase', shape: 'cylinder', size: [0.2, 0.4, 0.2], color: '#1ABC9C', gridSize: [1, 1] },
      { id: 'indoor-plant', name: 'Indoor Plant', shape: 'cylinder', size: [0.3, 0.6, 0.3], color: '#27AE60', gridSize: [1, 1] },
      { id: 'sculpture', name: 'Sculpture', shape: 'box', size: [0.3, 0.6, 0.3], color: '#D4A574', gridSize: [1, 1] },
    ],
  },
  {
    id: 'lighting',
    name: 'Lighting',
    items: [
      { id: 'ceiling-light', name: 'Ceiling Light', shape: 'sphere', size: [0.3, 0.3, 0.3], color: '#F9E79F', gridSize: [1, 1] },
      { id: 'chandelier', name: 'Chandelier', shape: 'box', size: [0.8, 0.5, 0.8], color: '#D4A574', gridSize: [1, 1] },
      { id: 'wall-lamp', name: 'Wall Lamp', shape: 'box', size: [0.2, 0.3, 0.15], color: '#F5B041', gridSize: [1, 1] },
      { id: 'floor-lamp', name: 'Floor Lamp', shape: 'box', size: [0.2, 1.2, 0.2], color: '#566573', gridSize: [1, 1] },
      { id: 'led-strip', name: 'LED Strip', shape: 'box', size: [2, 0.05, 0.05], color: '#3498DB', gridSize: [2, 1] },
      { id: 'table-lamp', name: 'Table Lamp', shape: 'box', size: [0.2, 0.4, 0.2], color: '#F39C12', gridSize: [1, 1] },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    items: [
      { id: 'television', name: 'Television', shape: 'box', size: [1.5, 0.8, 0.08], color: '#1C1C1C', gridSize: [2, 1] },
      { id: 'sound-system', name: 'Sound System', shape: 'box', size: [0.6, 0.3, 0.3], color: '#2C3E50', gridSize: [1, 1] },
      { id: 'ac', name: 'Air Conditioner', shape: 'box', size: [1, 0.3, 0.2], color: '#ECF0F1', gridSize: [1, 1] },
      { id: 'smart-speaker', name: 'Smart Speaker', shape: 'cylinder', size: [0.15, 0.2, 0.15], color: '#566573', gridSize: [1, 1] },
      { id: 'computer', name: 'Computer Setup', shape: 'box', size: [1.2, 0.7, 0.6], color: '#2C3E50', gridSize: [2, 1] },
      { id: 'gaming-console', name: 'Gaming Console', shape: 'box', size: [0.3, 0.1, 0.3], color: '#1C1C1C', gridSize: [1, 1] },
    ],
  },
  {
    id: 'plants',
    name: 'Plants',
    items: [
      { id: 'snake-plant', name: 'Snake Plant', shape: 'cylinder', size: [0.25, 0.7, 0.25], color: '#1E8449', gridSize: [1, 1] },
      { id: 'bamboo', name: 'Bamboo Plant', shape: 'cylinder', size: [0.15, 0.8, 0.15], color: '#27AE60', gridSize: [1, 1] },
      { id: 'palm', name: 'Palm Plant', shape: 'cylinder', size: [0.4, 1, 0.4], color: '#229954', gridSize: [1, 1] },
      { id: 'bonsai', name: 'Bonsai', shape: 'cylinder', size: [0.2, 0.4, 0.2], color: '#196F3D', gridSize: [1, 1] },
      { id: 'hanging-plant', name: 'Hanging Plant', shape: 'sphere', size: [0.25, 0.25, 0.25], color: '#2ECC71', gridSize: [1, 1] },
    ],
  },
];

export const allDecorations = decorationCategories.flatMap(c => c.items);
