import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Header.css';
import logoImage from '../assets/logo.png';

const Header = () => {
  const headerRef = useRef(null);
  const contactItemsRef = useRef([]);
  const navLinksRef = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { 
        y: -50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }
    );

    tl.fromTo(logoRef.current,
      {
        scale: 0,
        rotation: -180
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    tl.fromTo(contactItemsRef.current,
      {
        x: -30,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    tl.fromTo(navLinksRef.current,
      {
        x: 30,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    const contactItemHandlers = [];
    const navLinkHandlers = [];

    if (contactItemsRef.current.length > 0) {
      contactItemsRef.current.forEach(item => {
        const handleContactMouseEnter = () => {
          gsap.to(item, {
            y: -2,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleContactMouseLeave = () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        if (item) {
          item.addEventListener('mouseenter', handleContactMouseEnter);
          item.addEventListener('mouseleave', handleContactMouseLeave);
          
          contactItemHandlers.push({ element: item, enter: handleContactMouseEnter, leave: handleContactMouseLeave });
        }
      });
    }

    if (navLinksRef.current.length > 0) {
      navLinksRef.current.forEach(link => {
        const handleNavMouseEnter = () => {
          gsap.to(link, {
            y: -2,
            scale: 1.05,
            color: "#fbbf24",
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleNavMouseLeave = () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
          });
        };

        if (link) {
          link.addEventListener('mouseenter', handleNavMouseEnter);
          link.addEventListener('mouseleave', handleNavMouseLeave);
          
          navLinkHandlers.push({ element: link, enter: handleNavMouseEnter, leave: handleNavMouseLeave });
        }
      });
    }

    return () => {
      contactItemHandlers.forEach(({ element, enter, leave }) => {
        try {
          if (element && element.removeEventListener) {
            element.removeEventListener('mouseenter', enter);
            element.removeEventListener('mouseleave', leave);
          }
        } catch (error) {
          console.warn('Error during event listener cleanup:', error);
        }
      });
      
      navLinkHandlers.forEach(({ element, enter, leave }) => {
        try {
          if (element && element.removeEventListener) {
            element.removeEventListener('mouseenter', enter);
            element.removeEventListener('mouseleave', leave);
          }
        } catch (error) {
          console.warn('Error during event listener cleanup:', error);
        }
      });
    };
  }, []);

  const addContactItemRef = (el) => {
    if (el && !contactItemsRef.current.includes(el)) {
      contactItemsRef.current.push(el);
    }
  };

  const addNavLinkRef = (el) => {
    if (el && !navLinksRef.current.includes(el)) {
      navLinksRef.current.push(el);
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-top">
        <div className="header-container">
          <div className="contact-info">
            <div className="contact-item" ref={addContactItemRef}>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="contact-text">+95 527 550 5204</span>
            </div>
            <div className="contact-item" ref={addContactItemRef}>
              <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span className="contact-text">example@gmail.com</span>
            </div>
          </div>

          <nav className="utility-links">
            <a href="#track-order" className="utility-link" ref={addNavLinkRef}>Track Your Order</a>
            <div className="utility-divider"></div>
            <a href="#returns" className="utility-link" ref={addNavLinkRef}>Free Returns</a>
            <div className="utility-divider"></div>
            <a href="#customer-service" className="utility-link" ref={addNavLinkRef}>Customer Service</a>
          </nav>
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-container">
          <div className="logo-section" ref={logoRef}>
            <div className="logo">
              <img 
                src={logoImage} 
                alt="SISAM Logo" 
                className="logo-image"
              />
            </div>
          </div>

          <nav className="main-nav">
            <a href="#home" className="nav-link" ref={addNavLinkRef}>HOME</a>
            <a href="#about" className="nav-link" ref={addNavLinkRef}>ABOUT US</a>
            <a href="#service" className="nav-link" ref={addNavLinkRef}>SERVICE</a>
            <a href="#blog" className="nav-link" ref={addNavLinkRef}>BLOG</a>
            <a href="#contact" className="nav-link" ref={addNavLinkRef}>CONTACT US</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 