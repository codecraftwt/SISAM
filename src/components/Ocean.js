import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Water } from "three-stdlib";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ship from "../models/ship.glb";

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

function Ship() {
  const shipRef = useRef();
  const gltf = useLoader(GLTFLoader, ship);

  useFrame(({ clock }) => {
    if (shipRef.current) {
      const t = clock.getElapsedTime();
      shipRef.current.position.y = -29 + Math.sin(t * 1.5) * 0.5;
      shipRef.current.rotation.z = Math.sin(t) * 0.04;
    }
  });

  useEffect(() => {
    if (shipRef.current) {
      gsap.fromTo(
        shipRef.current.position,
        { z: -200 },
        {
          z: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#scroll-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
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

export default function OceanScene() {
  return (
    <div id="scroll-wrapper" style={{ height: "100vh",position:"sticky" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh" }}>
        <Canvas camera={{ position: [0, 40, 160], fov: 55 }}>
          <hemisphereLight args={["#ffffff", "#9a9898ff", 0.3]} />
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
          <Ship />

          {/* <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2.05}
          /> */}
        </Canvas>
      </div>
    </div>
  );
}
