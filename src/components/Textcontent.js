
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './textcontent.css'
import people from '../assets/people.png'


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const textContentRef = useRef(null);
    const illustrationRef = useRef(null);
    const ctaButtonRef = useRef(null);
    const subtitleRef = useRef(null);
    const heroContentRef = useRef(null);


    useEffect(() => {
        const tl = gsap.timeline();


        tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, ease: "power2.out" });

        tl.fromTo(subtitleRef.current, { x: -400, opacity: 0 }, { x: 0, opacity: 1, ease: "power4.out" }, "-=0.6");

        tl.fromTo(textContentRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out" }, "-=0.5");

        tl.fromTo(illustrationRef.current, { x: 50, opacity: 0, scale: 0.8 }, { x: 0, opacity: 1, scale: 1, ease: "back.out(1.7)" }, "-=0.6");

        tl.fromTo(ctaButtonRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, "-=0.4");

        tl.fromTo(heroContentRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out" }, "-=0.4");
        const handleButtonMouseEnter = () => {
            gsap.to(ctaButtonRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        };

        const handleButtonMouseLeave = () => {
            gsap.to(ctaButtonRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        if (ctaButtonRef.current) {
            ctaButtonRef.current.addEventListener('mouseenter', handleButtonMouseEnter);
            ctaButtonRef.current.addEventListener('mouseleave', handleButtonMouseLeave);
        }

        return () => {
            if (ctaButtonRef.current) {
                ctaButtonRef.current.removeEventListener('mouseenter', handleButtonMouseEnter);
                ctaButtonRef.current.removeEventListener('mouseleave', handleButtonMouseLeave);
            }
        };
    }, []);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top 10%",
            end: "bottom bottom",
            onUpdate: (self) => {
                const progress = self.progress;
                const newScale = 1.8 - (progress * 1.2);
                const newZ = progress * 4;

            },
            scrub: true
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="text" ref={heroRef}>
            <div className="text-container">
                <div className="text-content" ref={heroContentRef}>
                    <div className="text-subtitle" ref={subtitleRef}>
                        <span className="subtitle-text">Testimonials</span>
                        <div className="subtitle-line"></div>
                    </div>

                    <h1 className="text-title">
                        <span className="title-welcome">Hear From Our</span>
                        <span className="title-brand">Happy Clients</span>
                    </h1>

                    <div className="experience-card">
                        <div className="people">
                            <img src={people} alt="Leaderboard Icon" />
                        </div>
                        <div className="count">10k</div>
                        <div className="label">Experience Team</div>
                    </div>
                    <div className="experience-years-card">
                        <span className="years">20</span>
                        <span className="text-exp">
                            Years of<br />
                            Experience
                        </span>
                    </div>



                </div>
            </div>
        </section>
    );
};

export default Hero; 