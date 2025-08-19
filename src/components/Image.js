import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { gsap } from "gsap";

function MovingBanner3D({ images, spacing = 2.5, planeSize = [2, 3], speed = 12 }) {
  const groupRef = useRef();
  const total = images.length;
  const allImages = [...images, ...images]; 

  useEffect(() => {
    if (!groupRef.current) return;
    const group = groupRef.current;
    let bannerTween;

    function animateBanner() {
      bannerTween = gsap.to(group.position, {
        x: -((total) * spacing),
        duration: speed,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: x => {
            const val = parseFloat(x);
            return (val <= -((total) * spacing)) ? "0" : x;
          }
        }
      });
    }

    animateBanner();

    const handleEnter = () => bannerTween && bannerTween.pause();
    const handleLeave = () => bannerTween && bannerTween.resume();
    const dom = document.getElementById("marquee-canvas");
    dom?.addEventListener("mouseenter", handleEnter);
    dom?.addEventListener("mouseleave", handleLeave);

    return () => {
      bannerTween && bannerTween.kill();
      dom?.removeEventListener("mouseenter", handleEnter);
      dom?.removeEventListener("mouseleave", handleLeave);
    };
  }, [total, spacing, speed]);

  return (
    <div style={{ height: "40vh", width: "100vw", position: "relative" }}>
      <Canvas
        id="marquee-canvas"
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", background: "#111"
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 10, 10]} intensity={0.6} />
        <Suspense fallback={<Html center>Loading…</Html>}>
          <group ref={groupRef} position={[0, 0, 0]}>
            {allImages.map((img, i) => (
              <BannerPlane
                url={img}
                index={i}
                key={i}
                size={planeSize}
                x={i * spacing}
              />
            ))}
          </group>
        </Suspense>
      
      </Canvas>
    </div>
  );
}

function BannerPlane({ url, size, x }) {
  const tex = useTexture(url);
  return (
    <mesh position={[x, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={tex}
        toneMapped={false}
        transparent
        opacity={0.97}
      />
    </mesh>
  );
}

export default MovingBanner3D;
