import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import plane from "../models/cartoon_plane.glb";

export default function Plane({ earthRadius = 1.4, scale = 0.7 }) {
  const planeRef = useRef();
  const pathRef = useRef();
  const pinsRef = useRef();
  
  const { scene } = useGLTF(plane);
  
  const destinations = [
    { lat: 40.7128, lon: -74.0060, name: "New York" },
    { lat: 51.5074, lon: -0.1278, name: "London" },
    { lat: 35.6762, lon: 139.6503, name: "Tokyo" },
    { lat: -33.8688, lon: 151.2093, name: "Sydney" },
    { lat: 19.0760, lon: 72.8777, name: "Mumbai" },
    { lat: 39.9042, lon: 116.4074, name: "Beijing" },
    { lat: -23.5505, lon: -46.6333, name: "São Paulo" },
    { lat: 55.7558, lon: 37.6176, name: "Moscow" },
    { lat: 25.2048, lon: 55.2708, name: "Dubai" },
    { lat: -1.2921, lon: 36.8219, name: "Nairobi" }
  ];

  const latLonToPosition = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const adjustedRadius = earthRadius * scale;
    const x = -adjustedRadius * Math.sin(phi) * Math.cos(theta);
    const z = adjustedRadius * Math.sin(phi) * Math.sin(theta);
    const y = adjustedRadius * Math.cos(phi) - 0.5 * scale; // Match Earth's Y offset
    return [x, y, z];
  };

  const createFlightPaths = () => {
    const paths = [];
    for (let i = 0; i < destinations.length; i++) {
      const nextIndex = (i + 1) % destinations.length;
      const start = latLonToPosition(destinations[i].lat, destinations[i].lon);
      const end = latLonToPosition(destinations[nextIndex].lat, destinations[nextIndex].lon);
      
      const curvePoints = createCurvedPath(
        destinations[i].lat, destinations[i].lon,
        destinations[nextIndex].lat, destinations[nextIndex].lon,
        earthRadius * scale
      );
      
      paths.push({ 
        start, 
        end, 
        curvePoints,
        from: destinations[i].name, 
        to: destinations[nextIndex].name 
      });
    }
    return paths;
  };

  const createCurvedPath = (lat1, lon1, lat2, lon2, radius) => {
    const points = [];
    const segments = 50; 
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      
      const lat = lat1 + (lat2 - lat1) * t;
      const lon = lon1 + (lon2 - lon1) * t;
      
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi) - 0.5 * scale; 
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    return points;
  };

  const flightPaths = createFlightPaths();
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [pathProgress, setPathProgress] = useState(0);
  const [pinAnimation, setPinAnimation] = useState(0);

  useFrame((state, delta) => {
    setPinAnimation(prev => prev + 0.02 * delta * 60);
    
    if (planeRef.current) {
      setPathProgress(prev => {
        const newProgress = prev + 0.001 * delta * 60;
        if (newProgress >= 1) {
          setCurrentPathIndex(prev => (prev + 1) % flightPaths.length);
          return 0;
        }
        return newProgress;
      });

      const currentPath = flightPaths[currentPathIndex];
      const pathIndex = Math.floor(pathProgress * (currentPath.curvePoints.length - 1));
      const nextPathIndex = Math.min(pathIndex + 1, currentPath.curvePoints.length - 1);
      const localProgress = (pathProgress * (currentPath.curvePoints.length - 1)) - pathIndex;
      
      const currentPos = currentPath.curvePoints[pathIndex].clone().lerp(
        currentPath.curvePoints[nextPathIndex], 
        localProgress
      );
      
      const flightAltitude = 0.05 * scale;
      currentPos.normalize().multiplyScalar(earthRadius * scale + flightAltitude);
      currentPos.y -= 0.5 * scale; // Match Earth's Y offset
      planeRef.current.position.copy(currentPos);
      
      const nextPoint = currentPath.curvePoints[nextPathIndex] || currentPath.curvePoints[pathIndex];
      planeRef.current.lookAt(nextPoint);
      
      planeRef.current.rotation.z += 0.01 * delta * 60;
    }
  });

  return (
    <group>
      <group ref={pathRef}>
        {flightPaths.map((path, index) => {
          return (
            <line key={index}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={path.curvePoints.length}
                  array={new Float32Array(path.curvePoints.flatMap(p => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineDashedMaterial
                color="#FFD700"
                linewidth={1}
                transparent={true}
                opacity={0.8}
                dashSize={0.1 * scale}
                gapSize={0.05 * scale}
                scale={1}
              />
            </line>
          );
        })}
      </group>

      <group ref={pinsRef}>
        {destinations.map((dest, index) => {
          const position = latLonToPosition(dest.lat, dest.lon);
          const pulseScale = 1 + 0.2 * Math.sin(pinAnimation + index * 0.5);
          return (
            <group key={index} position={position}>
              <mesh>
                <sphereGeometry args={[0.02 * scale, 16, 16]} />
                <meshBasicMaterial color="#FF4444" />
              </mesh>
              <mesh scale={[pulseScale, pulseScale, pulseScale]}>
                <sphereGeometry args={[0.04 * scale, 16, 16]} />
                <meshBasicMaterial 
                  color="#FF6666" 
                  transparent={true}
                  opacity={0.3}
                />
              </mesh>
              <mesh scale={[pulseScale * 1.5, pulseScale * 1.5, pulseScale * 1.5]}>
                <sphereGeometry args={[0.06 * scale, 16, 16]} />
                <meshBasicMaterial 
                  color="#FF8888" 
                  transparent={true}
                  opacity={0.1}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      <group ref={planeRef} scale={[0.05 * scale, 0.05 * scale, 0.05 * scale]}>
        <primitive object={scene} />
      </group>


    </group>
  );
}

useGLTF.preload(plane);
