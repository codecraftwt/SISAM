import React, { useRef } from "react";
import gsap from "gsap";
import ExploreBg from "/assets/explorebg.jpg";
import Land from "/assets/land.mp4";
import Air from "/assets/Air.mp4";
import Water from "/assets/Water.mp4";
import './Explore.css'
// Example logos (replace with your PNG files)
import LandLogo from "/assets/road.png";
import AirLogo from "/assets/air.png";
import WaterLogo from "/assets/water.png";

const cards = [
  {
    logo: LandLogo,
    title: "Land Transport",
    description:
      "With a worldwide organization and progressed coordination arrangements, our airship cargo sending items.",
    points: ["Part & Full Loads", "Multimodal Solutions", "Intermodal Solutions"],
    accent: "#FFBC00",
    video: Land,
  },
  {
    logo: AirLogo,
    title: "Air Freight",
    description:
      "We help transport your load anyplace on the planet, making your business run easily regardless of where products.",
    points: ["General Air Freight Products", "Charter Services", "Intermodal Solutions"],
    accent: "#1D6FFA",
    video: Air,
  },
  {
    logo: WaterLogo,
    title: "Ocean Freight",
    description:
      "Sea cargo dispatches in excess of 5,500 holders per day to ports all around the globe, making us a top forwarder.",
    points: ["Less-than-container Load", "Full Container Load", "Intermodal Solutions"],
    accent: "#00B8D4",
    video: Water,
  },
];

export default function ServiceCardsWithHeader() {
  const cardRefs = useRef([]);
  const timers = useRef({});

  const flipCard = (idx, toBack) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    gsap.to(card, {
      rotateY: toBack ? 180 : 0,
      duration: 0.7,
      ease: "power2.inOut",
    });
  };

  const handleMouseEnter = (idx) => {
    clearTimeout(timers.current[idx]);
    flipCard(idx, true);
  };

  const handleMouseLeave = (idx) => {
    timers.current[idx] = setTimeout(() => {
      flipCard(idx, false);
    }, 500);
  };

  return (
    <div className="service-cards-container">
      {/* Background */}
      <div className="background" />
      <div className="overlay" />

      <div className="header-container">
        {/* Header */}
        <div className="header-content">
          <div className="header-left">
            <h2 className="explore-heading">
              Explore Our <span className="highlight-text">Services</span>
            </h2>
            <div className="header-description">
              Transmax is the world’s leading global logistics provider —
              we support industry and trade the global exchange of goods through
              land transport.
            </div>
          </div>
          <button className="explore-button">Explore More</button>
        </div>
      </div>

      {/* Cards */}
      <div className="cards-container">
        <div className="cards-wrapper">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className="card-wrapper"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                className="card"
              >
                {/* Front Side */}
                <div className="card-front">
                  <video
                    autoPlay
                    loop
                    muted
                    className="card-video"
                  >
                    <source src={card.video} type="video/mp4" />
                  </video>
                  <div className="card-overlay" />
                  {/* Floating Logo */}
                  <img
                    src={card.logo}
                    alt={card.title}
                    className="card-logo"
                  />
                  {/* Floating Title */}
                  <h3 className="card-title">{card.title}</h3>
                </div>

                {/* Back Side */}
                <div className="card-back">
                  <div className="card-description">{card.description}</div>
                  <ul className="card-points">
                    {card.points.map((pt, pi) => (
                      <li key={pi} className="card-point">
                        <span
                          className="point-icon"
                          style={{ color: card.accent }}
                        >
                          •
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
