// components/LogoCarousel.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import logo1 from '../assets/logo1.png';

const logoPaths = [
  { url: logo1, positionX: 0 },
  { url: logo1, positionX: 3 },
  { url: logo1, positionX: 6 },
  { url: logo1, positionX: 9 },
];

function Logo({ url, positionX, index }) {
  const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current.position,
      { x: positionX, y: -5 },
      {
        y: 0,
        delay: index * 0.2,
        duration: 1,
        ease: 'power3.out',
      }
    );
    gsap.fromTo(
      ref.current.scale,
      { x: 0, y: 0 },
      {
        x: 1,
        y: 1,
        delay: index * 0.2,
        duration: 1,
        ease: 'back.out(1.7)',
      }
    );
  }, [index, positionX]);

  return (
    <Image
      ref={ref}
      url={url}
      scale={[2, 2, 1]}
      position={[positionX, 0, 0]}
    />
  );
}

function Logos() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.position.x = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <group ref={groupRef}>
      {logoPaths.map((logo, i) => (
        <Logo key={i} url={logo.url} index={i} positionX={logo1.positionX} />
      ))}
    </group>
  );
}

export default function LogoCarousel() {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <Logos />
      </Canvas>
    </div>
  );
}
