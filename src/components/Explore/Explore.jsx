import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ExploreBg from "/assets/explorebg.jpg";
import './Explore.css';
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
    video: "https://www.pexels.com/download/video/20654634/", // Make sure your URLs point to direct video files (mp4)
  },
  {
    logo: AirLogo,
    title: "Air Freight",
    description:
      "We help transport your load anyplace on the planet, making your business run easily regardless of where products.",
    points: ["General Air Freight Products", "Charter Services", "Intermodal Solutions"],
    accent: "#1D6FFA",
    video: "https://www.pexels.com/download/video/5928077/",
  },
  {
    logo: WaterLogo,
    title: "Ocean Freight",
    description:
      "Sea cargo dispatches in excess of 5,500 holders per day to ports all around the globe, making us a top forwarder.",
    points: ["Less-than-container Load", "Full Container Load", "Intermodal Solutions"],
    accent: "#00B8D4",
    video: "https://www.pexels.com/download/video/856277/",
  },
];

export default function ServiceCardsWithHeader() {
  const cardRefs = useRef([]);
  const timers = useRef({});

  useEffect(() => {
    cards.forEach(({ video }) => {
      const vid = document.createElement("video");
      vid.src = video;
      vid.preload = "auto";
      vid.load();
    });
  }, []);

  const flipCard = (idx, toBack) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    gsap.to(card, {
      rotateY: toBack ? 180 : 0,
      duration: 0.7,
      ease: "power2.inOut",
      onStart: () => {
        card.style.willChange = "transform";
      },
      onComplete: () => {
        card.style.willChange = "auto";
      },
    });
  };

  const handleMouseEnter = (idx) => {
    clearTimeout(timers.current[idx]);
    flipCard(idx, true);
  };

  const handleMouseLeave = (idx) => {
    timers.current[idx] = setTimeout(() => {
      flipCard(idx, false);
    }, 100);
  };

  return (
    // <div className="service-cards-container" style={{ backgroundImage: `url(${ExploreBg})` }}>
    <div className="service-cards-container" >
      <div className="overlay" />

      <div className="header-container">
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
                <div className="card-front" style={{ willChange: 'transform' }}>
                  <video
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    playsInline
                    className="card-video"
                  >
                    <source src={card.video} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                  <div className="card-overlay" />
                  <img
                    src={card.logo}
                    alt={card.title}
                    className="card-logo"
                  />
                  <h3 className="card-title">{card.title}</h3>
                </div>

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
