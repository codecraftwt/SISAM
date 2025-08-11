import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import truck from '../models/Truck.glb';

export function TruckModel({ startX = -5, stopX = 0 }) {
  const truckRef = useRef();
  const { scene } = useGLTF(truck);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame(() => {
    if (truckRef.current) {
      if (truckRef.current.position.x < stopX) {
        truckRef.current.position.x += 0.26;
        if (truckRef.current.position.x > stopX) {
          truckRef.current.position.x = stopX;
        }
      }
    }
  });

  return (
    <group>
      <group ref={truckRef} position={[startX, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

export default function TruckScene() {
  const asphaltTexture = new THREE.CanvasTexture(createAsphaltTexture());
  asphaltTexture.wrapS = THREE.RepeatWrapping;
  asphaltTexture.wrapT = THREE.RepeatWrapping;
  asphaltTexture.repeat.set(20, 1);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[200, 8]} />
        <meshStandardMaterial 
          map={asphaltTexture}
          color="#2a2a2a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -6]}>
        <planeGeometry args={[200, 2]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 6]}>
        <planeGeometry args={[200, 2]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.9} />
      </mesh>

      {Array.from({ length: 100 }, (_, i) => (
        <mesh key={`center-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[i * 2 - 100, 0.01, 0]}>
          <planeGeometry args={[1, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3.5]}>
        <planeGeometry args={[200, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 3.5]}>
        <planeGeometry args={[200, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {Array.from({ length: 50 }, (_, i) => (
        <mesh key={`crack-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[
          Math.random() * 200 - 100,
          0.005, 
          (Math.random() - 0.5) * 6
        ]}>
          <planeGeometry args={[Math.random() * 2 + 0.5, Math.random() * 0.5 + 0.1]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
}

function createAsphaltTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const size = Math.random() * 3 + 1;
    const alpha = Math.random() * 0.3 + 0.1;
    ctx.fillStyle = `rgba(${Math.random() * 20 + 30}, ${Math.random() * 20 + 30}, ${Math.random() * 20 + 30}, ${alpha})`;
    ctx.fillRect(x, y, size, size);
  }

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const size = Math.random() * 20 + 10;
    ctx.fillStyle = `rgba(${Math.random() * 40 + 20}, ${Math.random() * 40 + 20}, ${Math.random() * 40 + 20}, 0.2)`;
    ctx.fillRect(x, y, size, size);
  }

  return canvas;
}
