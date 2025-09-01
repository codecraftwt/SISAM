import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ecommerce from "../../assets/ecommerce.mp4"
import Service from "../../assets/service.mp4"
import Warehouse from "../../assets/warehouse.mp4"
import Industry from "../../assets/industry.mp4"



gsap.registerPlugin(ScrollTrigger);

export default function Scroll3DSection() {
  const [sectionIndex, setSectionIndex] = useState(0);
  
  const containerRef = useRef(null);
  const textsRef = useRef([]);
  const shimmerRef = useRef(null);
  const shimmerAuraRef = useRef(null);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const flashRef = useRef(null);
  const beamRef = useRef(null);
  const activeIsARef = useRef(true);
  const vignetteRef = useRef(null);

  const videoSources = [
  Warehouse,
  Ecommerce,
  Service,
  Industry

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
            if (shimmerRef.current && shimmerAuraRef.current) {
              gsap.to([shimmerRef.current, shimmerAuraRef.current], {
                xPercent: -50 + self.progress * 200,
                ease: "none",
                duration: 0.1,
              });
            }

            const totalSections = 4; // plane, ship, truck, train
            const idx = Math.min(
              totalSections - 1,
              Math.floor(self.progress * totalSections)
            );
            setSectionIndex(idx);
          },
        });

        textsRef.current.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: containerRef.current,
                start: `${i * 25}% center`, // 0-25-50-75-100
                end: `${(i + 1) * 25}% center`,
                scrub: true,
              },
            }
          );

          if (i < textsRef.current.length - 1) {
            gsap.to(el, {
              opacity: 0,
              y: -60,
              scrollTrigger: {
                trigger: containerRef.current,
                start: `${(i + 1) * 25}% center`,
                end: `${(i + 1) * 25 + 5}% center`,
                scrub: true,
              },
            });
          }
        });

        if (shimmerRef.current) {
          gsap.to(shimmerRef.current, {
            opacity: 0.3,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        if (shimmerAuraRef.current) {
          gsap.to(shimmerAuraRef.current, {
            opacity: 0.15,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }, containerRef);
    }
    return () => ctx && ctx.revert();
  }, []);

  useEffect(() => {
    const current = textsRef.current[sectionIndex];
    if (!current) return;
    textsRef.current.forEach((el, i) => {
      if (!el) return;
      if (i !== sectionIndex) gsap.set(el, { opacity: 0 });
    });
    const headline = current.querySelector('.headline');
    if (headline) {
      gsap.fromTo(
        headline,
        { opacity: 0, y: 12, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      );
    }
    const words = current.querySelectorAll('.body .w');
    if (words && words.length) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            each: 0.015,
            from: 0,
          },
        }
      );
    }
  }, [sectionIndex]);

  useEffect(() => {
    const target = activeIsARef.current ? videoARef.current : videoBRef.current;
    if (target) {
      target.src = videoSources[0];
      target.load();
      target.play().catch(() => {});
      target.style.opacity = 1;
    }
  }, []);

  useEffect(() => {
    const currentIsA = activeIsARef.current;
    const currentVideo = currentIsA ? videoARef.current : videoBRef.current;
    const nextVideo = currentIsA ? videoBRef.current : videoARef.current;
    if (!currentVideo || !nextVideo) return;

    nextVideo.src = videoSources[sectionIndex];
    nextVideo.load();
    nextVideo.currentTime = 0;
    nextVideo.style.opacity = 0;
    nextVideo.play().catch(() => {});

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        activeIsARef.current = !currentIsA;
        currentVideo.pause();
      },
    });

    if (flashRef.current) {
      tl.to(flashRef.current, { opacity: 0.65, duration: 0.12 }, 0)
        .to(flashRef.current, { opacity: 0, duration: 0.25 }, 0.12);
    }

    if (beamRef.current) {
      gsap.set(beamRef.current, { xPercent: -160, opacity: 0.9 });
      tl.to(
        beamRef.current,
        { xPercent: 160, opacity: 0.0, duration: 0.6, ease: "power3.inOut" },
        0.05
      );
    }

    gsap.set(currentVideo, { scale: 1, willChange: "transform, opacity" });
    gsap.set(nextVideo, { scale: 1.06, willChange: "transform, opacity" });
    if (vignetteRef.current) {
      tl.to(vignetteRef.current, { opacity: 0.25, duration: 0.35, ease: "power2.out" }, 0)
        .to(vignetteRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.25);
    }

    tl.to(nextVideo, { opacity: 1, duration: 0.6 }, 0.05)
      .to(currentVideo, { opacity: 0, duration: 0.8 }, 0.05)
      .to(currentVideo, { scale: 1.06, duration: 0.9, ease: "power2.out" }, 0)
      .to(nextVideo, { scale: 1, duration: 1.2, ease: "power3.out" }, 0.05);

    // Sync text animation to the same timeline
    const currentText = textsRef.current[sectionIndex];
    if (currentText) {
      textsRef.current.forEach((el, i) => {
        if (!el) return;
        if (i !== sectionIndex) gsap.set(el, { opacity: 0 });
      });
      const headline = currentText.querySelector('.headline');
      const words = currentText.querySelectorAll('.body .w');
      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 12, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
          0.08
        );
      }
      if (words && words.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            stagger: { each: 0.015 },
          },
          0.18
        );
      }
    }
  }, [sectionIndex]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "400vh",
        background: "#ffffff",
        width: "100vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
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
              color: "#000000",
            }}
          >
            {[
              {
                title: "Quality Management System",
                text:
                  "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements.",
              },
              {
                title: "E-commerce Sisam Solutions",
                text:
                  "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements.",
              },
              {
                title: "Service & Aftermarket Sisam",
                text:
                  "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements.",
              },
              {
                title: "Industry-Specific Competence",
                text:
                  "With our worldwide inclusion, strong transportation organization and industry driving coordinations experience, our Service and Aftermarket Sisam arrangements.",
              },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (textsRef.current[i] = el)}
                style={{
                  opacity: i === 0 ? 1 : 0,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "pre-wrap",
                }}
              >
                <div
                  className="headline"
                  style={{
                    background:
                      "linear-gradient(135deg, #b8860b 0%, #ffd700 40%, #ffa500 70%, #b8860b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0.6rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </div>
                <div
                  className="body"
                  style={{
                    fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                    fontWeight: 400,
                    color: "#333",
                  }}
                >
                  {item.text.split(" ").map((word, idx) => (
                    <span
                      key={idx}
                      className="w"
                      style={{ display: "inline-block", willChange: "transform, opacity", marginRight: "0.3ch" }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div
              ref={shimmerRef}
              style={{
                position: "absolute",
                top: "-50%",
                left: "-150%",
                width: "20%",
                height: "200%",
                background:
                  "linear-gradient(120deg, rgba(255,215,0,0) 40%, rgba(255,255,180,1) 50%, rgba(255,140,0,0) 60%)",
                transform: "rotate(20deg)",
                pointerEvents: "none",
                opacity: 0.5,
                mixBlendMode: "screen",
              }}
            />

            <div
              ref={shimmerAuraRef}
              style={{
                position: "absolute",
                top: "-60%",
                left: "-160%",
                width: "140%",
                height: "220%",
                background:
                  "linear-gradient(120deg, rgba(255,215,0,0) 35%, rgba(255,215,0,0.5) 50%, rgba(255,140,0,0) 65%)",
                transform: "rotate(20deg)",
                pointerEvents: "none",
                opacity: 0.2,
                filter: "blur(20px)",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: "#101926",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Two stacked videos for crossfade */}
          <video
            ref={videoARef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0,
            }}
            muted
            loop
            playsInline
            autoPlay
          />
          <video
            ref={videoBRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0,
            }}
            muted
            loop
            playsInline
            autoPlay
          />

          {/* Beam sweep overlay */}
          <div
            ref={beamRef}
            style={{
              position: "absolute",
              top: "-50%",
              left: "-60%",
              width: "120%",
              height: "200%",
              transform: "rotate(20deg)",
              pointerEvents: "none",
              opacity: 0,
              background:
                "linear-gradient(120deg, rgba(255,215,0,0) 40%, rgba(255,255,200,0.9) 52%, rgba(255,140,0,0) 64%)",
              mixBlendMode: "screen",
              filter: "blur(2px)",
            }}
          />

          {/* Flash overlay */}
          <div
            ref={flashRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "white",
              opacity: 0,
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />

          {/* Vignette overlay */}
          <div
            ref={vignetteRef}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
              mixBlendMode: "multiply",
            }}
          />
          
          {/* Optional: Add a subtle overlay for consistency */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(16, 25, 38, 0.1)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
