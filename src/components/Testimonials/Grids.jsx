import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scroll3DSection() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const containerRef = useRef(null);
  const textsRef = useRef([]);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const activeIsARef = useRef(true);

  const videoSources = [
    "https://www.pexels.com/download/video/4477603/",
    "https://www.pexels.com/download/video/10451873/",
    "https://www.pexels.com/download/video/32750419/",
    "https://www.pexels.com/download/video/28075120/"
  ];

  useEffect(() => {
    let ctx;
    if (containerRef.current) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const totalSections = 4;
            const idx = Math.min(
              totalSections - 1,
              Math.floor(self.progress * totalSections)
            );
            setSectionIndex(idx);
          }
        });
      }, containerRef);
    }
    return () => ctx && ctx.revert();
  }, []);

useEffect(() => {
  const current = textsRef.current[sectionIndex];
  if (!current) return;

  textsRef.current.forEach((el, i) => {
    if (el) el.style.opacity = i === sectionIndex ? 1 : 0; // Instant text visibility
  });

  const headline = current.querySelector(".headline");
  const subheader = current.querySelector(".subheader");
  const body = current.querySelector(".body");

  if (headline) {
    gsap.fromTo(
      headline,
      { opacity: 0, y: 12, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    );
  }

  if (subheader) {
    gsap.fromTo(
      subheader,
      { opacity: 0, y: 12, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", delay: 0.3 }
    );
  }

  if (body) {
    gsap.fromTo(
      body,
      { opacity: 0, y: 12, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", delay: 0.5 }
    );
  }
}, [sectionIndex]);


  useEffect(() => {
    const currentIsA = activeIsARef.current;
    const currentVideo = currentIsA ? videoARef.current : videoBRef.current;
    const nextVideo = currentIsA ? videoBRef.current : videoARef.current;

    if (!currentVideo || !nextVideo) return;

    nextVideo.src = videoSources[sectionIndex];
    nextVideo.currentTime = 0;
    nextVideo.style.opacity = 1;
    nextVideo.play().catch(() => {});

    currentVideo.style.opacity = 0;
    currentVideo.pause();

    activeIsARef.current = !currentIsA;
  }, [sectionIndex]);

  useEffect(() => {
    const target = activeIsARef.current ? videoARef.current : videoBRef.current;
    if (target) {
      target.src = videoSources[0];
      target.currentTime = 0;
      target.style.opacity = 1;
      target.play().catch(() => {});
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: "400vh", background: "#ffffff", width: "100%" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              textAlign: "center",
              position: "relative",
              maxWidth: "80%",
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#000000"
            }}
          >
            {/* Four text blocks */}
            {["Quality Management", "E-commerce Solutions", "Service Automation", "Industry"].map((title, idx) => (
              <div
                key={idx}
                ref={(el) => (textsRef.current[idx] = el)}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "pre-wrap"
                }}
              >
                <div className="headline" style={{ marginBottom: "0.6rem", color: "#013567", whiteSpace: "nowrap" }}>
                  {title}
                </div>
                <div className="subheader" style={{ marginBottom: "1.2rem", fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontWeight: 400, color: "#555e6c" }}>
                  Subheader content for {title} - An additional description or context for each section.
                </div>
                <div className="body" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontWeight: 400, color: "#555e6c" }}>
                  {/* Replace with your actual content */}
                  Content for {title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div style={{ flex: 1, background: "#101926", position: "relative", overflow: "hidden" }}>
          <video
            ref={videoARef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 1, zIndex: 1 }}
            muted
            loop
            playsInline
            autoPlay
          />
          <video
            ref={videoBRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0 }}
            muted
            loop
            playsInline
            autoPlay
          />
        </div>
      </div>
    </div>
  );
}
