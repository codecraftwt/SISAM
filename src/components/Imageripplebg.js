// ImageRippleBackground.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import truck from "../assets/truck.jpg";
function Loader3D() {
  return (
    <Html center>
      <svg
        aria-hidden="true"
        className="size-8 animate-spin fill-blue-600 text-gray-200"
        viewBox="0 0 100 101"
      >
        <path
          fill="currentColor"
          d="M100 50.59c0 27.61-22.39 50-50 50S0 78.2 0 50.59 22.39.59 50 .59 100 23 100 50.59Z"
        />
      </svg>
    </Html>
  );
}

function RippleImage({ imageUrl }) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin( pos.x * 10.0 + uTime ) * 0.05;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main() {
        vec4 color = texture2D(uTexture, vUv);
        gl_FragColor = color;
      }
    `,
  };

  useFrame((state, delta) => {
    meshRef.current.material.uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 2.5, 64, 64]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
}

export default function ImageRippleBackground() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Suspense fallback={<Loader3D />}>
          <RippleImage imageUrl={truck} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
