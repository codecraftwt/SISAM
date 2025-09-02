// Truck.js
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function TruckModel(props) {
  const { scene } = useGLTF("/models/cargotruck.glb"); // model path
  const ref = useRef();

  // हलकासा animation (slow rotation / movement)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return <primitive ref={ref} object={scene} scale={0.7} {...props} />;
}

// 👉 Truck Scene wrapper
export default function TruckScene() {
  return (
    <div className="truck-canvas">
      <Canvas camera={{ position: [3, 2, 6], fov: 50 }}>
        {/* soft light setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <Environment preset="city" />

        {/* Model */}
        <TruckModel />

        {/* Controls (disable zoom if not needed) */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      <style>{`
        .truck-canvas {
          width: 100%;
          height: 100vh;
          position: relative;
          background: #111;
        }
        canvas {
          display: block;
        }
      `}</style>
    </div>
  );
}
