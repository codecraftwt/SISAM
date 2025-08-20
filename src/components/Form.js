import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import bgimg from "../assets/bgimg.jpg";

const inputStyle = {
  padding: "14px 18px",
  borderRadius: 8,
  border: "1.5px solid #ddd",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s",
  boxSizing: "border-box",
  width: "100%",
  background: "#fff",
};

const SimpleCenteredForm = () => {
  const formRef = useRef();
  const inputsRef = useRef([]);
  const buttonRef = useRef();
  const bgRef = useRef();

  useEffect(() => {
    // Fade in animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" }
    );

    // Hover scaling for inputs
    inputsRef.current.forEach((input) => {
      if (!input) return;
      input.addEventListener("mouseenter", () =>
        gsap.to(input, { scale: 1.05, duration: 0.3 })
      );
      input.addEventListener("mouseleave", () =>
        gsap.to(input, { scale: 1, duration: 0.3 })
      );
    });

    // Hover for button
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseenter", () =>
        gsap.to(buttonRef.current, {
          scale: 1.05,
          backgroundColor: "#ffbb00",
          duration: 0.3,
        })
      );
      buttonRef.current.addEventListener("mouseleave", () =>
        gsap.to(buttonRef.current, {
          scale: 1,
          backgroundColor: "#ffc107",
          duration: 0.3,
        })
      );
    }

    // Mouse Parallax
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      gsap.to(bgRef.current, { x, y, duration: 0.6, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Gyroscope
    const handleOrientation = (event) => {
      if (!bgRef.current) return;
      const { gamma, beta } = event;
      const x = (gamma / 45) * 15;
      const y = (beta / 45) * 15;
      gsap.to(bgRef.current, { x, y, duration: 0.6, ease: "power2.out" });
    };
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const setInputRef = (el, idx) => (inputsRef.current[idx] = el);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "110%",
          height: "110%",
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          zIndex: 0,
        }}
      />

      {/* Responsive Form */}
      <form
        ref={formRef}
        style={{
          background: "rgba(255,255,255,0.98)",
          padding: "28px 24px",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          width: "100%",
          maxWidth: 440,
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px 18px",
        }}
      >
        <input
          ref={(el) => setInputRef(el, 0)}
          type="text"
          placeholder="First name"
          style={inputStyle}
          required
        />
        <input
          ref={(el) => setInputRef(el, 1)}
          type="text"
          placeholder="Last name"
          style={inputStyle}
          required
        />
        <input
          ref={(el) => setInputRef(el, 2)}
          type="email"
          placeholder="Email address"
          style={{ ...inputStyle, gridColumn: "span 2" }}
          required
        />
        <input
          ref={(el) => setInputRef(el, 3)}
          type="tel"
          placeholder="Contact"
          style={{ ...inputStyle, gridColumn: "span 2" }}
          required
        />
        <textarea
          ref={(el) => setInputRef(el, 4)}
          placeholder="Feel free to ask"
          style={{
            ...inputStyle,
            gridColumn: "span 2",
            resize: "none",
            minHeight: 90,
            fontFamily: "inherit",
          }}
          required
        />
        <button
          ref={buttonRef}
          type="submit"
          style={{
            gridColumn: "span 2",
            backgroundColor: "#ffc107",
            border: "none",
            borderRadius: 8,
            padding: "16px 0",
            fontWeight: "bold",
            fontSize: "1.08rem",
            cursor: "pointer",
            marginTop: 7,
            width: "100%",
          }}
        >
          Read More →
        </button>
      </form>

      <style>{`
        @media (max-width: 768px) {
          form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleCenteredForm;
