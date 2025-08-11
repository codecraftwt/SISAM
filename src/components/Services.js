import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';
import Ship from '../assets/ship.mp4';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ position, rotation, color, title, description, icon, isHovered, onHover, onLeave }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      if (isHovered) {
        meshRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: isHovered ? position[1] + 0.5 : position[1],
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(meshRef.current.scale, {
        x: isHovered ? 1.1 : 1,
        y: isHovered ? 1.1 : 1,
        z: isHovered ? 1.1 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovered, position]);

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <Box args={[3, 4, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      <Sphere args={[0.3, 16, 16]} position={[-1, 1.5, 0.2]}>
        <meshStandardMaterial color="#fbbf24" />
      </Sphere>
      
      <mesh position={[0.5, 1.5, 0.2]}>
        <planeGeometry args={[2, 0.3]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      <mesh position={[0, 0.5, 0.2]}>
        <planeGeometry args={[2.5, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      <Box 
        args={[1.5, 0.4, 0.1]} 
        position={[0, -1.2, 0.2]}
        onPointerOver={onHover}
        onPointerOut={onLeave}
      >
        <meshStandardMaterial color="#fbbf24" />
      </Box>
    </group>
  );
};



const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const transportCardRef = useRef(null);
  const warehouseCardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    tl.fromTo(subtitleRef.current,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
    );

    gsap.fromTo(transportCardRef.current,
      {
        opacity: 0,
        scale: 0.3,
        x: -200,
        y: -100,
        rotation: -15
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: transportCardRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    gsap.fromTo(warehouseCardRef.current,
      {
        opacity: 0,
        scale: 0.3,
        x: 200,
        y: -100,
        rotation: 15
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: warehouseCardRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    gsap.to(".service-card", {
      y: "20px",
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="services" ref={sectionRef}>
       <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
    <source src={Ship} type="video/mp4" />
  </video>
      <div className="services-container">
        <div className="services-content">
          <div className="services-cards">
            <div className="service-card transport-card" ref={transportCardRef}>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 className="card-title">Transport Solutions</h3>
              <p className="card-description">
                Our Transport Solutions assist your business with keeping up degrees of administration
              </p>
              <button className="card-button">Read More</button>
            </div>

            <div className="service-card warehouse-card" ref={warehouseCardRef}>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="card-title">Warehousing Solutions</h3>
              <p className="card-description">
                Our Transport Solutions assist your business with keeping up degrees of administration
              </p>
              <button className="card-button">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 