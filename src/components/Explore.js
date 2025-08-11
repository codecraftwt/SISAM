import React, { useRef } from "react";
import gsap from "gsap";
import Truckscene from '../components/Truckscene';
import ExploreBg from '../assets/explorebg.jpg';
import Land from '../assets/land.mp4';
import Air from '../assets/Air.mp4';
import Water from '../assets/Water.mp4';

const cards = [
  {
    icon: <span style={{ fontSize: 32 }}>🚚</span>,
    title: "Land Transport",
    description:
      "With a worldwide organization and progressed coordination arrangements, our airship cargo sending items.",
    points: ["Part & Full Loads", "Multimodal Solutions", "Intermodal Solutions"],
    accent: "#FFBC00",
    video: Land,
  },
  {
    icon: <span style={{ fontSize: 32 }}>✈️</span>,
    title: "Air Freight",
    description:
      "We help transport your load anyplace on the planet, making your business run easily regardless of where products.",
    points: [
      "General Air Freight Products",
      "Charter Services",
      "Intermodal Solutions",
    ],
    accent: "#1D6FFA",
    video: Air,
  },
  {
    icon: <span style={{ fontSize: 32 }}>🚢</span>,
    title: "Ocean Freight",
    description:
      "Sea cargo dispatches in excess of 5,500 holders per day to ports all around the globe, making us a top forwarder.",
    points: [
      "Less-than-container Load",
      "Full Container Load",
      "Intermodal Solutions",
    ],
    accent: "#00B8D4",
    video: Water,
  },
];

export default function ServiceCardsWithHeader() {
  const cardRefs = useRef([]);

  const handleHover = (idx) => {
    gsap.to(cardRefs.current[idx], {
      scale: 1.045,
      y: -10,
      boxShadow: "2px 16px 32px rgba(44,90,174,0.13), 2px 4px 0 rgba(0,0,0,0.04)",
      duration: 0.45,
      ease: "bounce.out",
    });
  };
  const handleHoverOut = (idx) => {
    gsap.to(cardRefs.current[idx], {
      scale: 1,
      y: 0,
      boxShadow: "5px 2px 12px rgba(0,0,0,0.06), 0 1.5px 0 rgba(0,0,0,0.015)",
      duration: 0.54,
      ease: "elastic.out(1,0.68)",
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 350, height: "100%" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${ExploreBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(8px) brightness(1.4)",
          zIndex: -2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: -1,
        }}
      />

      <div style={{ position: "relative", paddingBottom: 40 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "32px 24px 12px",
            textAlign: "left",
            marginTop: 20,
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: 48,
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                Explore Our <span style={{ color: "#FFC107" }}>Services</span>
              </h2>
              <div
                style={{
                  maxWidth: 570,
                  fontSize: 16,
                  lineHeight: 1.7,
                  opacity: 0.9,
                }}
              >
                Transmax is the world’s driving worldwide coordinations supplier — we
                uphold industry and exchange the worldwide trade of merchandise
                through land transport.
              </div>
            </div>
            <button
              style={{
                padding: "11px 28px",
                backgroundColor: "#0A3A75",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.01,
                cursor: "pointer",
                transition: "background 0.18s",
                marginTop: 12,
                marginBottom: 4,
              }}
            >
              Explore More
            </button>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "60px",
            marginTop: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {cards.map((card, idx) => (
              <div
                key={card.title}
                ref={(el) => (cardRefs.current[idx] = el)}
                style={{
                  position: "relative",
                  borderRadius: 18,
                  boxShadow:
                    "2px 4px 12px rgba(0,0,0,0.06), 0 1.5px 0 rgba(0,0,0,0.015)",
                  padding: "28px 28px 22px",
                  flex: "0 1 310px",
                  minWidth: 270,
                  maxWidth: 340,
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  transition: "box-shadow 0.25s",
                  cursor: "pointer",
                  willChange: "transform",
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                onMouseEnter={() => handleHover(idx)}
                onMouseLeave={() => handleHoverOut(idx)}
              >
                <video
                  autoPlay
                  loop
                  muted
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -2,
                  }}
                >
                  <source src={card.video} type="video/mp4" />
                </video>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    zIndex: -1,
                    borderRadius: 18,
                  }}
                />
                <div style={{ marginBottom: 18, zIndex: 1 }}>{card.icon}</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 8,
                    color: "#fff",
                    zIndex: 1,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.74,
                    color: "#eee",
                    marginBottom: 12,
                    zIndex: 1,
                  }}
                >
                  {card.description}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    color: "#ddd",
                    fontSize: 13.8,
                    zIndex: 1,
                  }}
                >
                  {card.points.map((pt, pi) => (
                    <li
                      key={pi}
                      style={{
                        marginBottom: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: card.accent,
                          fontWeight: 900,
                          marginRight: 10,
                          fontSize: 17,
                        }}
                      >
                        •
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
