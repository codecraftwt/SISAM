import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export default function ParticlesCursor() {
  const containerRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const count = 500;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 1,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const attractor = new THREE.Vector3();
    function onMouseMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      gsap.to(attractor, { x: x * 30, y: y * 30, duration: 0.6, ease: "power2.out" });
    }
    window.addEventListener("mousemove", onMouseMove);

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    let running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;
        const dx = attractor.x - pos[ix];
        const dy = attractor.y - pos[iy];
        const dz = attractor.z - pos[iz];
        velocities[ix] += dx * 0.001;
        velocities[iy] += dy * 0.001;
        velocities[iz] += dz * 0.001;
        velocities[ix] *= 0.95;
        velocities[iy] *= 0.95;
        velocities[iz] *= 0.95;
        pos[ix] += velocities[ix];
        pos[iy] += velocities[iy];
        pos[iz] += velocities[iz];
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}
