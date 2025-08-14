import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import truckModel from '../models/cargotruck.glb';

gsap.registerPlugin(ScrollTrigger);

function Truck({ url }) {
  const ref = useRef();
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = 0;
      ref.current.rotation.z = 0;
    }

    gsap.to(ref.current.rotation, {
      y: -Math.PI * 2.6,
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
      ease: 'none',
    });
  }, []);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 1.1, 0]}
      rotation={[0, 4, 0]}
      scale={0.014}
      castShadow
      receiveShadow
    />
  );
}

export default function App() {
  return (
    <>
      <div
        id="scroll-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '200vh',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />

      <Canvas
        shadows
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={{ width: '100vw', height: '100vh', background: '#000',position: 'fixed', top: 0, left: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html center>Loading model...</Html>}>
          <Truck url={truckModel} />
        </Suspense>

        <OrbitControls enablePan enableZoom={false} />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.6, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </>
  );
}
