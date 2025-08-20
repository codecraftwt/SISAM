import React, { useEffect, useRef, Suspense, useState } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import './Hero.css';
import Earth from '../models/earth';

const Hero = () => {
  const heroRef = useRef(null);
  const textContentRef = useRef(null);
  const illustrationRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const subtitleRef = useRef(null);
  const heroContentRef = useRef(null);

  const [earthPosition] = useState([1.7, 1.4, -0.9]); 
  const [earthScale] = useState(1.8);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    tl.fromTo(
      subtitleRef.current,
      { x: -400, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power4.out' },
      '-=0.6'
    );

    tl.to({}, { duration: 0.2 });

    tl.fromTo(
      textContentRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.to({}, { duration: 0.3 });

    tl.fromTo(
      illustrationRef.current,
      { x: 50, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    tl.to({}, { duration: 0.2 });

    tl.fromTo(
      ctaButtonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    tl.to({}, { duration: 0.4 });

    tl.fromTo(
      heroContentRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    const handleButtonMouseEnter = () => {
      gsap.to(ctaButtonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleButtonMouseLeave = () => {
      gsap.to(ctaButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    if (ctaButtonRef.current) {
      ctaButtonRef.current.addEventListener('mouseenter', handleButtonMouseEnter);
      ctaButtonRef.current.addEventListener('mouseleave', handleButtonMouseLeave);
    }

    return () => {
      if (ctaButtonRef.current) {
        ctaButtonRef.current.removeEventListener('mouseenter', handleButtonMouseEnter);
        ctaButtonRef.current.removeEventListener('mouseleave', handleButtonMouseLeave);
      }
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-illustration" ref={illustrationRef}>
          <Canvas
            camera={{ position: [0, 0, 3.4], fov: 75 }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            <ambientLight intensity={3.5} />
            <directionalLight position={[10, 12, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.1} />

            <Suspense fallback={null}>
              <Earth position={earthPosition} scale={earthScale} />
            </Suspense>

            {/* <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
              enableDamping={true}
              dampingFactor={0.05}
            /> */}
          </Canvas>
        </div>

        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-subtitle" ref={subtitleRef}>
            <span className="subtitle-text">INNOVATION & SPEED</span>
            <div className="subtitle-line"></div>
          </div>
          <h1 className="hero-title">
            <span className="title-welcome">WELCOME</span>
            <span className="title-brand">TO SISAM</span>
          </h1>
          <p className="hero-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley.
          </p>
          <button className="hero-cta">Read More →</button>


        </div>
      </div>
    </section>
  );
};

export default Hero;