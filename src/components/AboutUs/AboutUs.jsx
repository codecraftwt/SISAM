import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import './AboutUs.css'
import AnimatedNumber from "./Numbers"
import AboutUs3D from './AboutUs3D'

gsap.registerPlugin(ScrollTrigger)

const AboutUsSection = () => {
  const sectionRef = useRef(null)
  const [trigger3D, setTrigger3D] = React.useState(false)
  
  const timelineConfig = useMemo(() => ({
    paused: true,
    scrollTrigger: {
      trigger: null, 
      start: "10% 80%",
      end: "bottom 50%",
      toggleActions: "play none none reverse",
      onEnter: () => setTrigger3D(true),
      onLeaveBack: () => setTrigger3D(false),
      scrub: false, 
      refreshPriority: -1, 
      fastScrollEnd: true, 
    }
  }), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.aboutus-heading', '.aboutus-paragraph', '.aboutus-btn', '.aboutus-video', '.aboutus-badge', '.aboutus-3d'], {
        willChange: 'transform, opacity'
      })

      const tl = gsap.timeline({
        ...timelineConfig,
        scrollTrigger: {
          ...timelineConfig.scrollTrigger,
          trigger: sectionRef.current,
        }
      })

      tl.fromTo('.aboutus-heading',
        { opacity: 0, x: -60 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          ease: 'power2.out',
          force3D: true 
        }
      )
      .fromTo('.aboutus-paragraph',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out', 
          stagger: { amount: 0.3, from: "start" },
          force3D: true
        },
        "-=0.6"
      )
      .fromTo('.aboutus-btn',
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          ease: 'back.out(1.2)',
          force3D: true
        },
        "-=0.4"
      )
      .fromTo('.aboutus-video',
        { opacity: 0, scale: 0.9, x: 60 },
        { 
          opacity: 1, 
          scale: 1, 
          x: 0, 
          duration: 1.2, 
          ease: 'power2.out',
          force3D: true
        },
        "-=0.8"
      )
      .fromTo('.aboutus-badge',
        { opacity: 0, y: 30, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1, 
          ease: 'back.out(1.1)',
          force3D: true
        },
        "-=0.6"
      )
      .fromTo('.aboutus-3d',
        { opacity: 0, scale: 0.8, rotationY: -15 },
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: 0,
          duration: 1.2, 
          ease: 'power2.out',
          force3D: true
        },
        "-=0.8"
      )

      tl.call(() => {
        gsap.set(['.aboutus-heading', '.aboutus-paragraph', '.aboutus-btn', '.aboutus-video', '.aboutus-badge', '.aboutus-3d'], {
          clearProps: 'willChange'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [timelineConfig])

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
          {trigger3D && (
            <div className="aboutus-3d">
              <AboutUs3D trigger={trigger3D} />
            </div>
          )}
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
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
              />
            </div>
            <div className="aboutus-img-secondary">
              <video
                src="https://videos.pexels.com/video-files/6618335/6618335-uhd_2560_1440_24fps.mp4" 
                alt="Secondary Transport"
                className="aboutus-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
