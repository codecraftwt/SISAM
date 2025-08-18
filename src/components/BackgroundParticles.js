import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export default function BackgroundParticles() {
  const pointsRef = useRef();
  const count = 1000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    pointsRef.current.rotation.y = t / 3;
    pointsRef.current.rotation.x = t / 5;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        size={0.04}
        color="#0077ff"
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
