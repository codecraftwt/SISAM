// Services.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';
import OceanScene from './Ocean';

gsap.registerPlugin(ScrollTrigger);

const cardConfigs = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    title: "Transport Solutions",
    description: "Our Transport Solutions assist your business with keeping up degrees of administration"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Warehousing Solutions",
    description: "Our Transport Solutions assist your business with keeping up degrees of administration"
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
    cardRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      gsap.fromTo(ref,
        {
          opacity: 0,
          scale: 0.3,
          x: idx % 2 === 0 ? -200 : 200,
          y: -100,
          rotation: idx % 2 === 0 ? -15 : 15
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.2,
          delay: idx * 0.13,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ref,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="services" ref={sectionRef}>
      <OceanScene />
      <div className="services-container">
        <div className="services-content">
          <h2 className="services-title" ref={titleRef}>Our Services</h2>
          <h4 className="services-subtitle" ref={subtitleRef}>What We Offer</h4>
          <div className="services-cards">
            {cardConfigs.map((card, idx) => (
              <div
                className="service-card"
                key={idx}
                ref={el => cardRefs.current[idx] = el}
              >
                <div className="card-icon">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <button className="card-button">Read More</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
