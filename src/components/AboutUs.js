import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import './AboutUs.css'
import AnimatedNumber from "./Numbers";
import AboutUs3D from './AboutUs3D';

gsap.registerPlugin(ScrollTrigger)

const AboutUsSection = () => {
  const sectionRef = useRef(null)
  const [trigger3D, setTrigger3D] = React.useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.aboutus-heading',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.aboutus-heading', start: 'top 80%' } }
      )
      gsap.fromTo('.aboutus-paragraph',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: '.aboutus-paragraph', start: 'top 85%' } }
      )
      gsap.fromTo('.aboutus-btn',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.aboutus-btn', start: 'top 90%' } }
      )
      gsap.fromTo('.aboutus-video',
        { opacity: 0, scale: 0.95, x: 60 },
        { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.aboutus-video', start: 'top 80%' } }
      )
      gsap.fromTo('.aboutus-badge',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.aboutus-badge', start: 'top 85%' } }
      )
      ScrollTrigger.create({
        trigger: '.aboutus-section',
        start: '25% 10%',
        end: 'bottom 50%',
        onEnter: () => setTrigger3D(true),
        onLeave: () => setTrigger3D(false),
        onEnterBack: () => setTrigger3D(true),
        onLeaveBack: () => setTrigger3D(false),
        // markers: true
      });
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="aboutus-section" ref={sectionRef}>
      <div className="aboutus-container">
        <div className="aboutus-left">
          <h2 className="aboutus-heading">
            TransMax Sisam<br />
            Around <span className="aboutus-highlight">the World</span>
            <div className="aboutus-underline"></div>
          </h2>
          <p className="aboutus-paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley text ever since the 1500s, when an unknown printer took a galley
          </p>
          <p className="aboutus-paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          </p>
          <button className="aboutus-btn">
            More About US <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
        <div className="aboutus-right">
            <AboutUs3D trigger={trigger3D} />
          <div className="aboutus-images">
            <div className="aboutus-img-main">
                <video
                  src="https://videos.pexels.com/video-files/2231802/2231802-uhd_2560_1440_30fps.mp4" 
                  alt="Main Transport"
                  className="aboutus-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
            </div>
            <div className="aboutus-img-secondary">
              <video
                src="https://videos.pexels.com/video-files/6618335/6618335-uhd_2560_1440_24fps.mp4" 
                alt="Main Transport"
                className="aboutus-video"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "300px", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
              />
            </div>
            <div className="aboutus-badge">
              <div className="aboutus-badge-content">
                <AnimatedNumber className="aboutus-badge-number" value={1500} suffix="+" />
                <span className="aboutus-badge-label">Clients Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection