import { useMemo, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { furnitureCategories } from '../../data/furniture';
import { decorationCategories } from '../../data/decorations';
import { Furnishing } from './Furnishing';

function RoomFloor({ wallColor, floorColor, roomSize }) {
  const [w, d] = roomSize || [8, 8];
  return (
    <group>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      <mesh position={[0, 1.25, -d / 2]}>
        <planeGeometry args={[w, 2.5]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.25, d / 2]}>
        <planeGeometry args={[w, 2.5]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-w / 2, 1.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[d, 2.5]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[w / 2, 1.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[d, 2.5]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function GridHelper({ size }) {
  const [w, d] = size || [8, 8];
  const lines = useMemo(() => {
    const result = [];
    for (let i = -w / 2; i <= w / 2; i++) {
      result.push({
        points: [[i, 0.01, -d / 2], [i, 0.01, d / 2]],
        key: `v-${i}`,
      });
    }
    for (let j = -d / 2; j <= d / 2; j++) {
      result.push({
        points: [[-w / 2, 0.01, j], [w / 2, 0.01, j]],
        key: `h-${j}`,
      });
    }
    return result;
  }, [w, d]);

  return (
    <group>
      {lines.map(l => (
        <Line key={l.key} points={l.points} color="rgba(255,255,255,0.08)" lineWidth={1} />
      ))}
    </group>
  );
}

function SceneContent({ roomSize }) {
  const { wallColor, floorColor, placements, placeItem, selectedItem } = useGameStore();

  const handleClick = useCallback((e) => {
    if (!selectedItem) return;
    e.stopPropagation();
    if (!e.intersections?.length) return;
    const point = e.intersections[0].point;
    if (!point) return;
    const snapped = {
      x: Math.round(point.x),
      z: Math.round(point.z),
    };
    const [w, d] = roomSize;
    const halfW = w / 2 - 0.5;
    const halfD = d / 2 - 0.5;
    if (Math.abs(snapped.x) > halfW || Math.abs(snapped.z) > halfD) return;
    placeItem(selectedItem, snapped);
  }, [roomSize, selectedItem, placeItem]);

  return (
    <group onClick={handleClick}>
      <RoomFloor wallColor={wallColor} floorColor={floorColor} roomSize={roomSize} />
      <GridHelper size={roomSize} />
      {placements.map(p => (
        <Furnishing key={p.id} placement={p} />
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} />
      <directionalLight position={[-5, 10, -5]} intensity={0.3} />
    </group>
  );
}

export function IsometricRoom() {
  const selectedHouse = useGameStore(s => s.selectedHouse);
  const roomSize = selectedHouse?.gridSize || [8, 8];
  const [w, d] = roomSize;
  const maxDim = Math.max(w, d);
  const dist = maxDim * 1.2;

  return (
    <Canvas
      style={{ flex: 1, background: '#0c0c1d' }}
      orthographic
      camera={{
        position: [dist * 0.7, dist * 0.7, dist * 0.7],
        zoom: 50,
        near: 0.1,
        far: 100,
      }}
    >
      <SceneContent roomSize={roomSize} />
    </Canvas>
  );
}
