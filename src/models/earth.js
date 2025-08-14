import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import plane from '../models/aeroplane.glb';
import TravelingShip from "../components/TravelingShip";
import TravelingTruck from "../components/TravelingTruck";


function latLngToVector3(lat, lng, radius = 1.22, offset = 0.02) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng);
  const r = radius + offset;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi) - 0.5,
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function AirportMarker({ lat, lng, color = "#ff3b3bff", size = 0.01 }) {
  const groupRef = useRef();
  const glowRef = useRef();

  const { position, normal } = useMemo(() => {
    const pos = latLngToVector3(lat, lng);
    const norm = pos.clone().sub(new THREE.Vector3(0, -0.5, 0)).normalize();
    return { position: pos, normal: norm };
  }, [lat, lng]);

  const quaternion = useMemo(() => {
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }, [normal]);

  useFrame((state) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
    groupRef.current.scale.setScalar(size * pulse);
    glowRef.current.material.opacity =
      0.2 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
  });

  return (
    <group ref={groupRef} position={position} quaternion={quaternion}>
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={glowRef}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function TravelingPlane({ startLat, startLng, endLat, endLng, speed = 0.05, arcHeight = 0.1 }) {
  const planeRef = useRef();
  const progressRef = useRef(0);

  const gltf = useGLTF(plane);
  const scene = useMemo(() => gltf.scene.clone(), [gltf]);

  const curve = useMemo(() => {
    const startAbove = latLngToVector3(startLat, startLng, 1.22, 0.08);
    const endAbove = latLngToVector3(endLat, endLng, 1.22, 0.08);

    const mid = startAbove
      .clone()
      .add(endAbove)
      .normalize()
      .multiplyScalar(1.22 + arcHeight);

    return new THREE.QuadraticBezierCurve3(startAbove, mid, endAbove);
  }, [startLat, startLng, endLat, endLng, arcHeight]);

  useFrame((_, delta) => {
    progressRef.current += delta * speed;
    if (progressRef.current > 1) progressRef.current = 0;

    const position = curve.getPoint(progressRef.current);
    const tangent = curve.getTangent(progressRef.current).normalize();

    planeRef.current.position.copy(position);

    const up = position.clone().normalize();
    const right = new THREE.Vector3().crossVectors(up, tangent).normalize();
    const adjustedUp = new THREE.Vector3().crossVectors(tangent, right).normalize();
    const m = new THREE.Matrix4().makeBasis(right, adjustedUp, tangent);
    planeRef.current.quaternion.setFromRotationMatrix(m);
  });

  return <primitive ref={planeRef} object={scene} scale={0.0025} />;
}



export default function Earth({ position = [0, 0, 0], scale = 0.7 }) {
  const groupRef = useRef();
  const cloudsRef = useRef();
  const earthRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      "/textures/earth_daymap.jpg",
      "/textures/earth_normal_map.jpg",
      "/textures/earth_specular_map.jpg",
      "/textures/earth_clouds.jpg",
    ]
  );
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02 * delta;
    }
  });

  const airports = useMemo(
    () => [
      { lat: 20.6413, lng: -77.7781 },
      { lat: 40.6413, lng: -87.7781 },
      { lat: 40.6413, lng: -87.7781 },
      { lat: 0.9413, lng: -112.7781, name: "y8 down" },
      { lat: -4.9413, lng: -30.7781, name: "ship start" },
      { lat: -24.9413, lng: -125.7781, name: "ship end" },
      { lat: -30.9413, lng: -20.7781 },
      { lat: -18.9413, lng: -45.7781 },
      { lat: 7.9413, lng: 9.7781 },
      { lat: 20.9413, lng: -45.7781 },
      { lat: 45.9413, lng: -18.7781 },
      { lat: 11.6413, lng: -105.7781 },
      { lat: 29.6413, lng: -117.7781 },
      { lat: 30.9644, lng: 103.9915, name: "y6" },
      { lat: -20.9644, lng: 60.9915, name: "y6 down" },
      { lat: -10.9644, lng: 170.9915, name: "y1 up" },
      { lat: 27.9644, lng: 140.9915, name: "y1 up" },
      { lat: -40.9644, lng: 185.9915, name: "y1 bottom" },
    ],
    []
  );

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]} rotation={[0, 4, 0]} >
      <mesh ref={cloudsRef} position={[0, -0.5, 0]}>
        <sphereGeometry args={[1.225, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={false}
          transparent
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

      {airports.map((a, i) => (
        <AirportMarker key={i} lat={a.lat} lng={a.lng} />
      ))}

      <TravelingPlane
        startLat={20.6413}
        startLng={-77.7781}
        endLat={30.9644}
        endLng={103.9915}
        speed={0.05}
      />

      <TravelingShip
        endLat={20.6413}
        endLng={-77.7781}
        startLat={0.9413}
        startLng={-112.7781}
        speed={0.06}
      />

      <TravelingPlane
        endLat={-24.9413}
        endLng={-125.7781}
        startLat={-4.9413}
        startLng={-30.7781}
        speed={0.05}
        arcHeight={1}
      />


      <TravelingTruck
        endLat={-20.9644}
        endLng={60.9915}
        startLat={30.9644}
        startLng={103.9915}
        speed={0.05}
        arcHeight={0.4}
      />


      <TravelingPlane
        endLat={-10.9644}
        endLng={170.9915}
        startLat={0.9413}
        startLng={-112.7781}
        speed={0.05}
        arcHeight={0.5}
      />

      <TravelingPlane
        startLat={-20.9644}
        startLng={60.9915}
        endLat={7.9413}
        endLng={9.7781}
        speed={0.05}
        arcHeight={0.5}
      />


      <TravelingTruck
        endLat={7.9413}
        endLng={9.7781}
        startLat={-4.9413}
        startLng={-30.7781}
        speed={0.09}
        arcHeight={0.2}
      />


      <TravelingShip
        startLat={-10.9644}
        startLng={170.9915}
        endLat={27.9644}
        endLng={140.9915}
        speed={0.2}
        arcHeight={1500}
      />
    </group>
  );
}

