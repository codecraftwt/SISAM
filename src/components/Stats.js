// Stats3D.jsx
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Text,
  Ring,
  useCursor,
} from "@react-three/drei";
import gsap from "gsap";

export default function Stats3D() {
  const labels = ["Industry Expertise", "Satisfied Clients", "Shipments Handled"];
  const stats   = ["50+", "250+", "20000+"];
  const colors  = ["#00ffff", "#ff00ff", "#00ff88"];
  const positions = [
    [-6, 0, 0],
    [ 0, 0, 0],
    [ 6, 0, 0],
  ];

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#001020" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <hemisphereLight skyColor="#4444ff" groundColor="#220022" intensity={0.4}/>
        <pointLight position={[10, 10, 10]} intensity={1.2} />

        <Suspense fallback={null}>
          {stats.map((text, i) => (
            <Counter3D
              key={i}
              text={text}
              position={positions[i]}
              color={colors[i]}
            />
          ))}
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: "5%",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          color: "white",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {labels.map((lbl, i) => (
          <span key={i}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}

function Counter3D({ text, position, color }) {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(text.replace(/\D/g, ""), 10);

  const groupRef = useRef();
  const ringRef  = useRef();
  const [hovered, setHovered] = useState(false);

  // Count-up on mount
  useEffect(() => {
    const counter = { val: 0 };
    gsap.to(counter, {
      val: targetValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setDisplayValue(Math.floor(counter.val)),
    });
  }, [targetValue]);

  // Change cursor on hover
  useCursor(hovered);

  // Per-frame hover scale & ring rotation
  useFrame((_, delta) => {
    const scale = hovered
      ? 1 + Math.sin(Date.now() * 0.005) * 0.1
      : 1;
    groupRef.current.scale.lerp(
      { x: scale, y: scale, z: scale },
      0.1
    );
    ringRef.current.rotation.z += delta * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={()  => setHovered(false)}
      >
        <Ring
          ref={ringRef}
          args={[1.8, 2.2, 64]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={2}
          />
        </Ring>

        <Text
          fontSize={1.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {displayValue.toLocaleString() + text.replace(/[0-9]/g, "")}
        </Text>
      </group>
    </Float>
  );
}
