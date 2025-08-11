import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import bgimg from "../assets/bgimg.jpg"

const SimpleCenteredForm = () => {
  const formRef = useRef();
  const inputsRef = useRef([]);
  const buttonRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        onComplete: () => {
          if(formRef.current) {
            formRef.current.style.opacity = '1';
            formRef.current.style.transform = 'translateY(0)';
          }
        }
      }
    );

    inputsRef.current.forEach(input => {
      input.addEventListener('mouseenter', () => {
        gsap.to(input, { scale: 1.05, duration: 0.3, ease: 'power1.out'});
      });
      input.addEventListener('mouseleave', () => {
        gsap.to(input, { scale: 1, duration: 0.3, ease: 'power1.out'});
      });
    });

    if(buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, { scale: 1.05, backgroundColor: '#ffbb00', duration: 0.3 });
      });
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, { scale: 1, backgroundColor: '#ffc107', duration: 0.3 });
      });
    }

  }, []);

  const setInputRef = (el, idx) => {
    inputsRef.current[idx] = el;
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fefefe',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <form
        ref={formRef}
        style={{
          background: 'white',
          padding: 24,
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          // width: 400,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px 20px',
          opacity: 0, // start hidden for GSAP animation
          position: 'relative',
          zIndex: 10,
        }}
      >
        <input
          ref={(el) => setInputRef(el, 0)}
          type="text"
          placeholder="First name"
          style={inputStyle}
          required
        />
        <input
          ref={(el) => setInputRef(el, 1)}
          type="text"
          placeholder="Last name"
          style={inputStyle}
          required
        />
        <input
          ref={(el) => setInputRef(el, 2)}
          type="email"
          placeholder="Email address"
          style={inputStyle}
          required
        />
        <input
          ref={(el) => setInputRef(el, 3)}
          type="tel"
          placeholder="Contact"
          style={inputStyle}
          required
        />
        <textarea
          ref={(el) => setInputRef(el, 4)}
          cols={30}
          rows={5}
          placeholder="Feel free to ask"
          style={{ ...inputStyle, gridColumn: 'span 2', resize: 'none' }}
          required
        />
        <button
          ref={buttonRef}
          type="submit"
          style={{
            gridColumn: 'span 2',
            backgroundColor: '#ffc107',
            border: 'none',
            borderRadius: 8,
            padding: '14px 0',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            userSelect: 'none',
          }}
        >
          Read More →
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '14px 16px',
  borderRadius: 8,
  border: '1px solid #ddd',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  boxSizing: 'border-box',
};

export default SimpleCenteredForm;
