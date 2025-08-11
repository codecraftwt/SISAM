import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png"; // Use your real logo path

function ParticlesBackground({ count = 1200 }) {
  const mesh = useRef();
  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 6; 
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions };
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001;
      mesh.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={mesh}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesData.positions.length / 3}
            array={particlesData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#fff"
          opacity={0.17}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function PlayRotatingIcon() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime();
    }
  });
  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[0.35, 0.15, 3]} />
      <meshBasicMaterial color="#FFBC00" />
    </mesh>
  );
}

export default function Footer() {
  const container = useRef();
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(
      [
        ".contact-help",
        ".footer-logo-section",
        ".rotating-play",
        ".footer-section"
      ],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.20 }
    );
  }, { scope: container });

  return (
    <div
      ref={container}
      style={{
        width: "100vw",
        height: "100vh",
        // background: "#0a3a75",
        background: '#000000',
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        color: "#fff", // All text is white
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 9] }}>
          <ambientLight intensity={0.6} />
          <ParticlesBackground count={1200} />
        </Canvas>
      </div>

      <div
        className="contact-help"
        style={{
          position: "absolute",
          left: "50%",
          top: 60,
          transform: "translateX(-50%)",
          zIndex: 2,
          backgroundColor: "#FFBC00",
          borderRadius: 14,
          padding: "26px 36px",
          minWidth: 1000,
          maxWidth: 550,
          width: "72vw",
          boxShadow: "0 7px 24px rgba(0,0,0,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          color: "#fff", // text white
          fontWeight: "bold"
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "24px", letterSpacing: 0.4, color: "#fff" }}>Need Any Help?</h3>
          <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "20px", color: "#fff" }}>Contact Us!</h3>
          <p style={{ margin: 0, fontWeight: 600, fontSize: "20px", color: "#fff" }}>
            <span role="img" aria-label="phone">📞</span> +95 527 550 5204
          </p>
        </div>
        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: "12px 16px",
              borderRadius: 5,
              border: "none",
              width: 220,
              marginRight: 12,
              fontSize: 15
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#0a3a75",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "12px 26px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15
            }}
          >
            Subscribe Now →
          </button>
        </form>
      </div>

      {/* Footer Main Content */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          zIndex: 2,
          width: "100%",
          paddingBottom: 27,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 36,
            marginTop: 180,
            alignItems: "flex-start",
            color: "#fff"
          }}
        >
          {/* Logo and socials */}
          <div className="footer-logo-section" style={{ flex: "0 0 260px", minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 14 }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 75, height: 75,
                  objectFit: "contain",
                  borderRadius: 7,
                  boxShadow: "0 3px 7px rgba(0,0,0,0.10)"
                }}
                className="animated-logo"
              />
            </div>
            <p style={{ fontSize: 17, maxWidth: 320, opacity: 0.8, color: "#fff" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 23, fontSize: 26 }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="Instagram"><FaInstagram /></a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="Telegram"><FaTelegramPlane /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* 3D Play Icon */}
          <div
            className="rotating-play"
            style={{
              minWidth: 65,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 38
            }}
          >
            <Canvas style={{ width: 44, height: 44 }} camera={{ position: [0, 0, 2.3] }}>
              <ambientLight intensity={0.7} />
              <PlayRotatingIcon />
            </Canvas>
          </div>

          {/* Quick Links */}
          <div className="footer-section" style={{ flex: "0 0 240px", minWidth: 180 }}>
            <h4 style={{ letterSpacing: 1, marginBottom: 14, color: "#fff" }}>QUICK LINKS</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 10, fontSize: 16, color: "#fff" }}>
              <li><a href="#" style={{ color: "white", textDecoration: "none", lineHeight: "2.3" }}>Home</a></li>
              <li><a href="#" style={{ color: "white", textDecoration: "none", lineHeight: "2.3" }}>ABOUT US</a></li>
              <li><a href="#" style={{ color: "white", textDecoration: "none", lineHeight: "2.3" }}>SERVICE</a></li>
              <li><a href="#" style={{ color: "white", textDecoration: "none", lineHeight: "2.3" }}>BLOG</a></li>
              <li><a href="#" style={{ color: "white", textDecoration: "none", lineHeight: "2.3" }}>CONTACT US</a></li>
            </ul>
          </div>

          {/* Address Block */}
          <div className="footer-section" style={{ flex: "0 0 260px", minWidth: 180 }}>
            <h4 style={{ letterSpacing: 1, marginBottom: 14, color: "#fff" }}>ADDRESS</h4>
            <p style={{ fontSize: 15, maxWidth: 325, opacity: 0.8, color: "#fff" }}>
              Lorem Ipsum is simply dummy text <br />of the printing and typesetting
            </p>
            <p style={{ margin: "12px 0 7px" }}>
              <a href="mailto:example@companyshopify.com" style={{ color: "white", textDecoration: "none" }}>examplecompanyshopify.com</a>
            </p>
            <p style={{ margin: 0, color: "#fff" }}>Phone: +95 527 550 5204</p>
          </div>
        </div>
        <div style={{
          textAlign: "center",
          marginTop: 38,
          fontSize: 13,
          opacity: 0.7,
          letterSpacing: 1,
          color: "white"
        }}>
          &copy; Sisam 2025 All Rights Reserved
        </div>
      </div>
    </div>
  );
}
