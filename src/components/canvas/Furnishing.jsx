import * as THREE from 'three';

function getGeometry(shape, size) {
  switch (shape) {
    case 'sphere':
      return <sphereGeometry args={[size[0], 16, 16]} />;
    case 'cylinder':
      return <cylinderGeometry args={[size[0], size[0], size[1], 16]} />;
    default:
      return <boxGeometry args={size} />;
  }
}

export function Furnishing({ placement }) {
  const { position, rotation = 0, size = [0.8, 0.5, 0.6], color = '#8E44AD', shape = 'box' } = placement;
  const floorY = size[1] / 2;

  return (
    <group position={[position.x, floorY, position.z]} rotation={[0, rotation, 0]}>
      <mesh>
        {getGeometry(shape, size)}
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
