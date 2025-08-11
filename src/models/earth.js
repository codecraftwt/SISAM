import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Earth({ rotationY = 0, scale = 0.7, positionX = 0 }) {
  const groupRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      "/textures/earth_daymap.jpg",
      "/textures/earth_normal_map.jpg",
      "/textures/earth_specular_map.jpg",
      "/textures/earth_clouds.jpg",
    ]
  );

  useFrame((state, delta) => {
    if (cloudsRef.current && earthRef.current && groupRef.current) {
      earthRef.current.rotation.y += 0.0007 * delta * 60;
      cloudsRef.current.rotation.y += 0.001 * delta * 60;
      groupRef.current.rotation.y += 0.0007 * delta * 60;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[positionX || 0.8, 0.1, 0]}
      scale={[scale, scale, scale]}
    >
      <mesh ref={cloudsRef} position={[0, -0.5, 0]}>
        <sphereGeometry args={[1.225, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={false}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={earthRef} position={[0, -0.5, 0]}>
        <sphereGeometry args={[1.22, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          specular={new THREE.Color("grey")}
        />
      </mesh>
    </group>
  );
}
