import React, { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Clouds() {
  const cloudGroup = useRef();

  useEffect(() => {
    if (!cloudGroup.current) return;

    gsap.to(cloudGroup.current.position, {
      x: 15,  
      y: 2,   
      scrollTrigger: {
        trigger: "#cloud-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      id="cloud-section"
      style={{
        width: "100vw",
        height: "100vh", 
        position: "relative",
        backgroundColor: "#ee982fff"
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 5, 20], fov: 60 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={3.5} />

        <Suspense fallback={null}>
          <group ref={cloudGroup} position={[0, 3, -10]}>
            <Cloud
              opacity={0.15}
              speed={0.2}
              width={50}
              depth={6}
              segments={40}
              color="#ffffff"
              scale={[10, 4, 3]}
            />
            <Cloud
              opacity={0.08}
              speed={0.15}
              width={40}
              depth={8}
              segments={30}
              color="#dcdcdc"
              position={[0, -2, -5]}
              scale={[11, 3, 2]}
            />
             <Cloud
              opacity={0.1}
              speed={0.25}
              width={4000}
              depth={5}
              segments={30}
              color="#dcdcdc"
              position={[0, -12, -5]}
              scale={[12, 4, 9]}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
