import React, { useEffect, useRef, Suspense, useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { Canvas, useLoader } from '@react-three/fiber';
import { Sparkles, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import './Hero.css';
import Earth from '../Models3D/ModelEarth3D';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

gsap.registerPlugin(ScrollTrigger);

const Hero = React.memo(() => {
  const heroRef = useRef(null);
  const textContentRef = useRef(null);
  const illustrationRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const subtitleRef = useRef(null);
  const heroContentRef = useRef(null);

  const [earthPosition] = useState([1.7, 0.63, -0.9]);
  const [earthScale] = useState(1.8);

  useEffect(() => {
    // Preload Earth model assets
    const preloadAssets = async () => {
      // Preload textures
      const textureLoader = new THREE.TextureLoader();
      const textures = [
        "/textures/earth_daymap.jpg",
        "/textures/earth_normal_map.jpg",
        "/textures/earth_specular_map.jpg",
        "/textures/earth_clouds.jpg",
      ];
      textures.forEach(url => textureLoader.load(url));

      // Preload GLTF models
      useGLTF.preload("/assets/GlbModels/aeroplane.glb");
      useGLTF.preload("/assets/GlbModels/ship.glb");
      useGLTF.preload("/assets/GlbModels/cargotruck.glb");
    };
    preloadAssets();

    // Immediately set visible and final positions without fading or scaling animation
    gsap.set(heroRef.current, { opacity: 1 });
    gsap.set(subtitleRef.current, { x: 0, opacity: 1 });
    gsap.set(textContentRef.current, { x: 0, opacity: 1 });
    gsap.set(illustrationRef.current, { x: 0, opacity: 1, scale: 1 });
    gsap.set(ctaButtonRef.current, { y: 0, opacity: 1, scale: 1 });
    gsap.set(heroContentRef.current, { y: 0, opacity: 1,delay:9 });

    // Hover scale animation for CTA button remains the same
    const handleEnter = () => {
      gsap.to(ctaButtonRef.current, { scale: 1.05, duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(ctaButtonRef.current, { scale: 1, duration: 0.3 });
    };

    if (ctaButtonRef.current) {
      ctaButtonRef.current.addEventListener('mouseenter', handleEnter);
      ctaButtonRef.current.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      if (ctaButtonRef.current) {
        ctaButtonRef.current.removeEventListener('mouseenter', handleEnter);
        ctaButtonRef.current.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=2200",
        pin: true,
        scrub: 3,
        snap: false,
        anticipatePin: 1,
        // markers: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <Canvas
        className="hero-bg-canvas"
        style={{ position: 'absolute', top: 0, left: 0 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
      >
        <Sparkles
          count={200}
          scale={[30, 30, 30]}
          size={1.2}
          speed={0.4}
          opacity={0.6}
          color="#ffffff"
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={200}
            opacity={1.5}
          />
        </EffectComposer>
      </Canvas>

      <div className="hero-container">
        <div className="hero-illustration" ref={illustrationRef}>
          <Canvas
            camera={{ position: [0, 0, 3.4], fov: 75 }}
            style={{
              background: 'transparent',
              width: '100%',
              height: '100%',
            }}
          >
            <ambientLight intensity={1.9} />
            <directionalLight position={[10, 12, 5]} intensity={10} />
            <pointLight position={[-10, -10, -5]} intensity={0.9} />

              <Earth position={earthPosition} scale={earthScale} />
          </Canvas>
        </div>

        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-subtitle" style={{ paddingTop: "35px" }} ref={subtitleRef}>
            <span className="subtitle-text">INNOVATION & SPEED</span>
            <div className="subtitle-line"></div>
          </div>
          <h1 className="hero-title">
            <span className="title-welcome">WELCOME</span>
            <span className="title-brand">TO SISAM</span>
          </h1>
          <p className="hero-description">
            Sisam provides full liner representation to global or niche
            operators, each a specialist in their own market.
          </p>
          <button className="hero-cta" ref={ctaButtonRef}>
            Read More →
          </button>
        </div>
      </div>
    </section>
  );
});

export default Hero;
