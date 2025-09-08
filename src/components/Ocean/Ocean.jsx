import React, { useState, useRef, useMemo, useEffect, useLayoutEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Sky, Cloud } from "@react-three/drei";
import { Water } from "three-stdlib";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ship from "/assets/GlbModels/ship.glb";

gsap.registerPlugin(ScrollTrigger);

function Ocean() {
  const waterRef = useRef();
  const { scene } = useThree();

  const waterNormalsUrl = "https://threejs.org/examples/textures/waternormals.jpg";
  const waterNormals = useLoader(THREE.TextureLoader, waterNormalsUrl);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const sunDirection = useMemo(() => new THREE.Vector3(1, 1, 1).normalize(), []);
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000, 512, 512), []);

  const water = useMemo(
    () =>
      new Water(geom, {
        textureWidth: 1024,
        textureHeight: 1024,
        waterNormals,
        sunDirection,
        sunColor: new THREE.Color("#ff8c00"),
        waterColor: new THREE.Color("#0666c6"),
        distortionScale: 100,
        fog: scene.fog !== undefined,
        format: THREE.RGBAFormat,
      }),
    [geom, scene.fog, sunDirection, waterNormals]
  );

  useFrame((_, delta) => {
    if (water.material?.uniforms?.time) {
      water.material.uniforms.time.value += delta * 1;
    }
    if (water.material?.uniforms?.waveSpeed) {
      water.material.uniforms.waveSpeed.value = 0.04;
    }
  });

  return (
    <primitive
      ref={waterRef}
      object={water}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -30, 0]}
    />
  );
}

function Ship({ onShipReached }) {
  const shipRef = useRef();
  const gltf = useLoader(GLTFLoader, ship);

  useFrame(({ clock }) => {
    if (shipRef.current) {
      const t = clock.getElapsedTime();
      shipRef.current.position.y = -29 + Math.sin(t * 1.5) * 0.5;
      shipRef.current.rotation.z = Math.sin(t) * 0.04;

      // Trigger event when ship reaches z = -100
      if (shipRef.current.position.z <= 0) {
        if (onShipReached) {
          onShipReached();
        }
      }
    }
  });

  useEffect(() => {
    if (shipRef.current) {
      gsap.fromTo(
        shipRef.current.position,
        { z: -750 },
        {
          z: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#scroll-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 4,
          },
        }
      );
    }
  }, []);

  return (
    <primitive
      ref={shipRef}
      object={gltf.scene}
      position={[10, -29, -200]}
      scale={[3, 3, 3]}
      rotation={[0, 5, 0]}
    />
  );
}

export default function OceanScene({
  cloudOpacity = 0.55,
  cloudSpeed = 0.22,
  cloudZIndex = 1,
  cloudScrollYPercent = -200,
  cloudScrollLength = 2500,
} = {}) {
  const wrapperRef = useRef(null);
  const cloudsLayerRef = useRef(null);
  const textsRef = useRef([]);
  
  const [isShipReached, setIsShipReached] = useState(false);

  const handleShipReached = () => {
    setIsShipReached(true);
  
    textsRef.current.forEach((el) => {
      if (el) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      }
    });
  };

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${cloudScrollLength}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      });

      if (cloudsLayerRef.current) {
        gsap.set(cloudsLayerRef.current, { yPercent: 0, opacity: 1, willChange: "transform, opacity" });
        gsap.to(cloudsLayerRef.current, {
          yPercent: cloudScrollYPercent,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${cloudScrollLength}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="ocean-section"
      ref={wrapperRef}
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Clouds overlay */}
      <div
        ref={cloudsLayerRef}
        style={{
          position: "absolute",
          inset: 0,
          height: "100vh",
          pointerEvents: "none",
          zIndex: cloudZIndex,  
        }}
      >
        <Canvas style={{ background: "transparent" }} camera={{ position: [0, -5, 200], fov: 60 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 12, 5]} intensity={24} />
          <Suspense fallback={null}>
            <Cloud position={[-114, 55, -5]} scale={40} speed={cloudSpeed} opacity={1.15} color="white" />
            <Cloud position={[12, -20, 0]} scale={26} speed={cloudSpeed} opacity={cloudOpacity} color="white" />
            <Cloud position={[100, 92, -8]} scale={35} speed={cloudSpeed} opacity={0.9} color="white" />
            <Cloud position={[100, 32, -8]} scale={30} speed={cloudSpeed} opacity={0.5} color="white" />
          </Suspense>
        </Canvas>
      </div>

      <Canvas camera={{ position: [0, 40, 160], fov: 55 }}>
        <hemisphereLight args={["#ffffff", "#9a9898ff", 2.25]} />
        <directionalLight position={[50, 100, -10]} intensity={5} />
        <Sky
          distance={450000}
          turbidity={10}
          rayleigh={3}
          mieCoefficient={0.005}
          mieDirectionalG={0.9}
          inclination={0.49}
          azimuth={0.25}
        />
        <Ocean />
        <Ship onShipReached={handleShipReached} />
      </Canvas>

      {/* Text content */}
      <div
        ref={(el) => (textsRef.current[0] = el)}
        style={{
          opacity: 0,
          position: "absolute",
          top: "15%",
          left: "25%",
          transform: "translate(-50%, -50%)",
          color: "#013567",
          fontSize: "clamp(1.8rem, 3vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.3,
          zIndex: 0.5, 
        }}
      >
        <div className="headline" style={{color:"#013567"}}>Sailing Across  <span style={{color:"#ffc300"}}>Boundaries</span></div>
        <div className="subheader" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontWeight: 400, color: "#fffccc" }}>
         Leading the Way to Sustainable Solutions
        </div>
        <div className="body" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontWeight: 400, color: "#fffccc" }}>
        Connecting Businesses Worldwide
        </div>
      </div>
    </div>
  );
}

