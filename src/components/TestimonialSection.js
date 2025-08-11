import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../components/testimonials.css';
import Testimonial from '../components/Testimonials';
import TextContent from '../components/Textcontent';


function Parent() {
  const textRef = useRef(null);
  const mainDivRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.from(textRef.current, {
          duration: 1.5,
          opacity: 0,
          y: 50,
          ease: 'power3.out',
        });

        gsap.to(textRef.current, {
          duration: 1.5,
          delay: 1.5,
          fontSize: '56px',
          fontWeight: 'bold',
          color: '#013567',
          ease: 'power3.out',
        });

        gsap.fromTo(textRef.current.children[0], {
          duration: 1.5,
          delay: 2,
          y: 50,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        });

        gsap.fromTo(textRef.current.children[1], {
          duration: 1.5,
          delay: 2.5,
          y: 50,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        });

        gsap.fromTo(textRef.current.children[2], {
          duration: 1.5,
          delay: 3,
          y: 50,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        });
      }
    }, {
      threshold: 0.5,
    });

    observer.observe(mainDivRef.current);
  }, []);

  return (
    <>
      <div className="parent">
        <div className="div1">
          <TextContent />
        </div>
        <div className="div2">
          <Testimonial />
        </div>

      </div>
      <div ref={mainDivRef} style={{ background: '#fff', width: '100%', height: "300px", color: '#013567', marginTop: '-200px', textAlign: 'center' }}>
        <div ref={textRef}>
          <p>Sisam -Transport & Export </p>
          <p>Without Limits</p>
          <p style={{ color: '#464646', fontSize: '18px', fontWeight: 'normal' }}>Solving Complex Logistics with a Trusted Global Network.</p>
        </div>
      </div>

    </>
  );
}

export default Parent;