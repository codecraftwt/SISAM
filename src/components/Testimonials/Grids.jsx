import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scroll3DSection() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const containerRef = useRef(null);
  const textsRef = useRef([]);
  const videosRef = useRef([]);
  const shimmerRef = useRef(null);
  const tlText = useRef(null);
  const tlVideo = useRef(null);

  const videoSources = [
    "https://www.pexels.com/download/video/4477603/",
    "https://www.pexels.com/download/video/10451873/",
    "https://www.pexels.com/download/video/32750419/",
    "https://www.pexels.com/download/video/28075120/"
  ];

  // ScrollTrigger to update sectionIndex
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // smoother scrub
        onUpdate: (self) => {
          const idx = Math.min(3, Math.floor(self.progress * 4));
          setSectionIndex(idx);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate text blocks
  useEffect(() => {
    if (tlText.current) tlText.current.kill();
    tlText.current = gsap.timeline();
    textsRef.current.forEach((el, i) => {
      if (!el) return;
      const isActive = i === sectionIndex;
      tlText.current.to(
        el,
        {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 12,
          filter: isActive ? "blur(0px)" : "blur(6px)",
          duration: 0.6,
          ease: "power3.out"
        },
        0
      );
    });
  }, [sectionIndex]);

  // Preload videos once
  useEffect(() => {
    videosRef.current.forEach((vid) => {
      if (!vid) return;
      vid.preload = "auto";
      vid.load();
      vid.play().then(() => {
        vid.pause();
        vid.currentTime = 0;
      }).catch(() => {});
    });
  }, []);

  // Animate video opacity and play
  useEffect(() => {
    if (tlVideo.current) tlVideo.current.kill();
    tlVideo.current = gsap.timeline();
    videosRef.current.forEach((vid, idx) => {
      if (!vid) return;
      const isActive = idx === sectionIndex;
      tlVideo.current.to(
        vid,
        {
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 2 : 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            if (isActive) {
              vid.currentTime = 0;
              vid.play().catch(() => {});
              shimmerRef.current.style.opacity = 1;
            }
          },
          onComplete: () => {
            if (isActive) {
              gsap.to(shimmerRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
              });
            }
          }
        },
        0
      );
    });
  }, [sectionIndex]);

  return (
    <div ref={containerRef} className="scroll3d-container">
      <div className="scroll3d-sticky">
        <div className="scroll3d-content">
          <div className="scroll3d-text">
            {["Quality Management", "E-commerce Solutions", "Service Automation", "Industry"].map(
              (t, i) => (
                <div
                  key={i}
                  ref={(el) => (textsRef.current[i] = el)}
                  className="text-block"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div className="headline">{t}</div>
                  <div className="subheader">Subheader content for {t}</div>
                  <div className="body">Content for {t}</div>
                </div>
              )
            )}
          </div>
          <div className="scroll3d-video-wrapper">
            <div ref={shimmerRef} className="shimmer-overlay" />
            {videoSources.map((src, i) => (
              <video
                key={i}
                ref={(el) => (videosRef.current[i] = el)}
                className="video"
                muted
                loop
                playsInline
                autoPlay={false}
                preload="auto"
                src={src}
                style={{
                  opacity: i === 0 ? 1 : 0,
                  zIndex: i === 0 ? 2 : 1
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll3d-container {
          height: 400vh;
          background: #fff;
        }
        .scroll3d-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scroll3d-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .scroll3d-text {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .text-block {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: left;
          pointer-events: none;
          max-width: 350px;
        }
        .headline {
          font-size: clamp(1.8rem, 3vw, 3rem);
          font-weight: 700;
          color: #013567;
          line-height: 1;
        }
        .subheader,
        .body {
          margin-top: 0.5rem;
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          color: #555e6c;
        }
        .scroll3d-video-wrapper {
          flex: 1;
          position: relative;
          background: #101926;
          overflow: hidden;
        }
        .video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }
        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            25deg,
            transparent 20%,
            rgba(255, 215, 0, 0.4) 35%,
            rgba(255, 215, 0, 0.8) 50%,
            rgba(255, 215, 0, 0.4) 65%,
            transparent 80%
          );
          background-size: 200% 200%;
          opacity: 0;
          pointer-events: none;
          z-index: 10;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 200%;
          }
          100% {
            background-position: 200% -200%;
          }
        }
        @media (min-width: 1024px) {
          .scroll3d-content {
            flex-direction: row;
          }
          .scroll3d-text,
          .scroll3d-video-wrapper {
            width: 50%;
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
}
