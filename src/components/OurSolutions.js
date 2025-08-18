import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useGLTF,
  Environment
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import truckModel from "../models/cargotruck.glb";

gsap.registerPlugin(ScrollTrigger);

function Truck({ url }) {
  const ref = useRef();
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set("#ff3700");
        child.material.metalness = 0.0001;
        child.material.roughness = 0;
      }
    });

    gsap.set(ref.current.rotation, { x: 0, z: 0 });
    gsap.to(ref.current.rotation, {
      y: -Math.PI * 1.8,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, [scene]);

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

function TextSections() {
  const sectionsRef = useRef([]);
  const sectionData = [
    {
      title: "Quality Management System",
      text: "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements."
    },
    {
      title: "E-commerce Sisam Solutions",
      text: "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements."
    },
    {
      title: "Service & Aftermarket Sisam",
      text: "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements."
    },
    {
      title: "Industry-Specific Competence",
      text: "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements."
    }
  ];

  useEffect(() => {
    sectionsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          x: i % 2 === 0 ? -500 : 500,
          y: 30,
          scale: 0.8
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.5,
          delay: i * 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div className="sections" id="scroll-container">
      {sectionData.map((sec, i) => (
        <section
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="section"
        >
          <span className="section-number">{i + 1}</span>
          <h1>{sec.title}</h1>
          <p>{sec.text}</p>
          <div className="cta-row">
            <button
              className="yellow-btn"
              tabIndex={0}
              aria-label={`Go to section ${i + 1}`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="11" fill="#ffe314" />
                <path
                  d="M7 11H15M15 11L12 8M15 11L12 14"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={{ position: "fixed", inset: 0, background: "#000", zIndex: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          <Environment
            files="https://media.istockphoto.com/id/163641486/photo/winding-road-towards-distant-mountains-at-beautiful-sunrise.jpg?s=612x612&w=0&k=20&c=68W5P0-ai5JCWrOU4kPX6OzdYVsdiggX6mLVDTKdsMA="
            background
            blur={0.15}
          />
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

      <TextSections />

      <style>{`
       
        canvas {
          position: fixed !important;
          inset: 0;
          z-index: 0;
        }
        .sections {
          position: relative;
          z-index: 10;
          margin-top:115px;
        }
        .section {
          height: 50vh;
          min-height: 100px;
          width:600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          margin: 0 auto;
          margin-bottom:115px;
          text-align: center;
          pointer-events: auto;
          padding: 2rem 3.5rem;  
          position: relative;
          background: rgba(255, 255, 255, 0.1); /* translucent white */
          backdrop-filter: saturate(180%) blur(10px); /* glass effect */
          -webkit-backdrop-filter: saturate(180%) blur(10px);
          border-radius: 12px;
          box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.12);
        }
        .section-number {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: bold;
          width: 2.7rem;
          height: 2.7rem;
          border-radius: 50%;
          background: #ffe314;
          color: #000;
          margin-bottom: 1.3rem;
          box-shadow: 0 1px 9px 0 rgba(0,0,0,0.13);
        }
        .section h1 {
          font-size: 2.2rem;
          margin-bottom: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 15px rgba(0,0,0,0.8);
          margin-top: 0;
        }
        .section p {
          font-size: 1.1rem;
          max-width: 700px;
          text-shadow: 0 0 10px rgba(0,0,0,0.7);
          margin-bottom: 0.6rem;
          margin-top: 0;
        }
        .cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1.1rem;
        }
        .yellow-btn {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50%;
          background: #ffe314;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 7px rgba(0,0,0,0.25);
          transition: background 0.15s;
          outline: none;
        }
        .yellow-btn:hover,
        .yellow-btn:focus {
          background: #ffd700;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
