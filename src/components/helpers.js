import * as THREE from "three";

export function latLngToVector3(lat, lng, radius = 1.22, offset = 0.02) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng);
  const r = radius + offset;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi) - 0.5,
    r * Math.sin(phi) * Math.sin(theta)
  );
}

