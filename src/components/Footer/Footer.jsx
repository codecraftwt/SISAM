import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaLinkedin,
} from "react-icons/fa";
import logo from "/assets/Sisamlogo.png";

function createCircleTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, "white");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function ParticlesBackground({ count = 1200 }) {
  const mesh = useRef();
  const texture = useMemo(() => createCircleTexture(), []);
  const mouse = useRef({ x: 0, y: 0 });
  const gyro = useRef({ x: 0, y: 0 });

  // generate static positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 6;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onOrient = (e) => {
      gyro.current.x = e.gamma / 45;
      gyro.current.y = e.beta / 45;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

 useFrame(() => {
  if (!mesh.current) return;
  mesh.current.rotation.y += 0.005;
  mesh.current.rotation.x += 0.002;

  const mixX = mouse.current.x * 0.01 + gyro.current.x * 0.05;
  const mixY = mouse.current.y * 0.01 + gyro.current.y * 0.05;
  mesh.current.rotation.y += mixX;
  mesh.current.rotation.x += mixY;
});


  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={texture}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Footer() {
  const container = useRef();

  useGSAP(
    () => {
      gsap.fromTo(
        [
          ".contact-help",
          ".footer-logo-section",
          ".footer-link",
          ".footer-section",
        ],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          overwrite: true,
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="footer-container">
      {/* Particle Background */}
      <div className="footer-bg">
        <Canvas camera={{ position: [0, 0, 9] }}>
          <ambientLight intensity={0.6} />
          <ParticlesBackground />
        </Canvas>
      </div>

      {/* Contact Help Bar */}
      <div className="contact-help">
        <div className="contact-text">
          <h3>Need Any Help?</h3>
          <h3>Contact Us!</h3>
          <p>📞 +390586243814</p>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe Now →</button>
        </form>
      </div>

      {/* Footer Main Sections */}
      <div className="footer-sections">
        {/* Logo & About */}
        <div className="footer-logo-section">
          <img src={logo} alt="Logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTelegramPlane />
            <FaLinkedin />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-link">
          <h4>QUICK LINKS</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Service</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Address */}
        <div className="footer-section">
          <h4>ADDRESS</h4>
          <p>Scali Cerere 15, Livorno, Italy 57122</p>
          <p>Phone: +390586243814</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        © Sisam 2025 All Rights Reserved
      </div>
    </div>
  );
}
