import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial, PlaneGeometry, Vector3 } from 'three';
import { useLoader } from '@react-three/fiber';
import gsap from 'gsap';

function LogoPlane({ texture, xOffset, width, height }) {
  return (
    <mesh position={[xOffset, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

export default function LogosCarousel({ logos, logoWidth = 1, logoHeight = 0.5, spacing = 0.5, speed = 10 }) {
  const groupRef = useRef();
  const textures = useLoader(TextureLoader, logos);

  const cycleWidth = useMemo(() => logos.length * (logoWidth + spacing), [logos, logoWidth, spacing]);

  useEffect(() => {
    if (!groupRef.current) return;

    gsap.fromTo(
      groupRef.current.position,
      { x: 0 },
      {
        x: -cycleWidth,
        duration: cycleWidth / speed, 
        ease: 'none',
        repeat: -1,
      }
    );
  }, [cycleWidth, speed]);

  return (
    <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 10], left: -5, right: 5, top: 2.5, bottom: -2.5 }}>
  
      <group ref={groupRef}>
        {textures.map((texture, idx) => {
          const x = idx * (logoWidth + spacing);
          return (
            <React.Fragment key={idx}>
              <LogoPlane texture={texture} xOffset={x} width={logoWidth} height={logoHeight} />
              <LogoPlane texture={texture} xOffset={x + cycleWidth} width={logoWidth} height={logoHeight} />
            </React.Fragment>
          );
        })}
      </group>
    </Canvas>
  );
}
