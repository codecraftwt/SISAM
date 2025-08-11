import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

const ThreeDStatCard = () => {
  const mountRef = useRef(null);
  const cardMesh = useRef();

  useEffect(() => {
    // Sizes
    const width = 370;
    const height = 250;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.01, 50);
    camera.position.set(0, 0, 5);

    // Card Geometry and Material
    const geometry = new THREE.BoxGeometry(2.7, 1.5, 0.22, 12, 12, 5);
    const material = [
      new THREE.MeshLambertMaterial({ color: 0xffd600 }), // right
      new THREE.MeshLambertMaterial({ color: 0xffd600 }), // left
      new THREE.MeshLambertMaterial({ color: 0xffe97b }), // top
      new THREE.MeshLambertMaterial({ color: 0xffd600 }), // bottom
      new THREE.MeshLambertMaterial({ color: 0xffd600 }), // front
      new THREE.MeshLambertMaterial({ color: 0xf9e79f }), // back
    ];
    const card = new THREE.Mesh(geometry, material);
    card.castShadow = true;
    card.receiveShadow = true;
    scene.add(card);
    cardMesh.current = card;

    // Shadow Plane for subtle shadow effect
    const shadowGeo = new THREE.PlaneGeometry(2.2, 0.9);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.87;
    shadow.position.z = 0.15;
    shadow.receiveShadow = true;
    scene.add(shadow);

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(0, 2, 5);
    scene.add(dirLight);

    // Animate card entrance: pop in from below + scale up
    gsap.fromTo(
      card.position,
      { y: -2 },
      { y: 0, duration: 1.1, ease: "bounce.out" }
    );
    gsap.fromTo(
      card.scale,
      { x: 0.6, y: 0.6, z: 0.6 },
      { x: 1, y: 1, z: 1, duration: 0.9, ease: "elastic.out(1, 0.6)" }
    );

    // Mouse move: 3D tilt effect
    const handlePointerMove = (e) => {
      const bounds = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1; // -1 to 1
      const y = -(((e.clientY - bounds.top) / bounds.height) * 2 - 1); // -1 to 1

      gsap.to(card.rotation, {
        x: y * 0.18,
        y: x * 0.24,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove);

    let isMounted = true;

    // Render loop
    const animate = () => {
      if (!isMounted) return;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose Three.js resources
      geometry.dispose();
      if (Array.isArray(material)) {
        material.forEach((m) => m.dispose());
      } else {
        material.dispose();
      }
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();

      // Optional: clear ref to avoid memory leak
      mountRef.current = null;
    };
  }, []);

  // Overlay UI with stat text on top of canvas
  return (
    <div
      style={{
        position: "relative",
        width: 370,
        height: 250,
        margin: "40px 0",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 2,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          color: "#05216B",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "24px 0 0 34px",
          fontWeight: 600,
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 26, color: "#282828", marginBottom: 4 }}>
          10k Experience Team
        </span>
        <span
          style={{
            fontSize: 45,
            color: "#ecd215",
            textShadow: "1px 2px 6px #ccac0b90",
            lineHeight: 1.2,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          20
        </span>
        <span style={{ fontSize: 18, color: "#868585", fontWeight: 500 }}>
          Years of Experience
        </span>
      </div>
      <div
        ref={mountRef}
        style={{
          borderRadius: 18,
          width: "100%",
          height: "100%",
          boxShadow: "0 8px 32px #ffd60044",
        }}
      />
    </div>
  );
};

export default ThreeDStatCard;
