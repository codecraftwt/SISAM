import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './Navbar.css';
import logoImage from '../assets/logo.png';

const NAV_ITEMS = [
  { label: 'HOME', to: '/home' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'SERVICE', to: '/service' },
  { label: 'BLOG', to: '/blog' },
  { label: 'CONTACT US', to: '/contact' },
];

const Navbar = ({ onLinkClick }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showWhiteBg, setShowWhiteBg] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const itemRefs = useRef([]);
  const underlineRef = useRef(null);
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const scrollTimeout = useRef(null);
  const menuTimeout = useRef(null);


  useEffect(() => {
    const idx = hoverIdx !== null ? hoverIdx : activeIdx;
    const elem = itemRefs.current[idx];
    const underline = underlineRef.current;
    if (elem && underline) {
      const { offsetLeft, offsetWidth } = elem;
      gsap.to(underline, {
        left: offsetLeft,
        width: offsetWidth,
        duration: 0.5,
        y: 30,
        ease: 'expo.out',
      });
    }
  }, [activeIdx, hoverIdx]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY === 0;
      setIsAtTop(atTop);
      if (atTop) {
        setShowNavbar(true);
        setShowWhiteBg(false);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
        setShowWhiteBg(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          if (!isHovering) {
            setShowNavbar(false);
            setShowWhiteBg(false);
          }
        }, 400); 
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
        setShowWhiteBg(false);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isHovering]);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        opacity: showNavbar ? 1 : 0,
        duration: 1,
        ease: 'power2.out',
        pointerEvents: showNavbar ? 'auto' : 'none',
        zIndex: showNavbar ? 1000 : 0,
      });
    }
  }, [showNavbar]);

  useEffect(() => {
    return () => {
      if (menuTimeout.current) {
        clearTimeout(menuTimeout.current);
      }
    };
  }, []);

  const handleNavbarMouseEnter = () => {
    setIsHovering(true);
    setShowNavbar(true);
    setShowWhiteBg(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
  };
  const handleNavbarMouseLeave = () => {
    setIsHovering(false);
    if (!isAtTop) {
      scrollTimeout.current = setTimeout(() => {
        setShowNavbar(false);
        setShowWhiteBg(false);
      }, 400);
    }
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuMouseEnter = () => {
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
      menuTimeout.current = null;
    }
    setShowMenu(true);
  };

  const handleMenuMouseLeave = () => {
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
    }
    menuTimeout.current = setTimeout(() => {
      setShowMenu(false);
      menuTimeout.current = null;
    }, 1000); 
  };

  return (
    <nav
      className="navbar"
      ref={navbarRef}
      onMouseEnter={handleNavbarMouseEnter}
      onMouseLeave={handleNavbarMouseLeave}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-container">
            <img 
              src={logoImage} 
              alt="SISAM Logo" 
              className="logo-image"
            />
          </div>
        </div>

        <ul className="navbar-main" style={{ position: 'relative' }}>
          {NAV_ITEMS.map((item, idx) => (
            <li
              key={item.label}
              ref={elem => (itemRefs.current[idx] = elem)}
              className={
                idx === activeIdx
                  ? 'active'
                  : ''
              }
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
              onClick={() => {
                console.log('Navbar item clicked:', { label: item.label, idx, to: item.to });
                setActiveIdx(idx);
                if (onLinkClick) onLinkClick(item.label, idx, item.to); 
              }}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <span className={idx === activeIdx ? 'active-link' : ''}>
                {item.label}
              </span>
            </li>
          ))}
          <div
            ref={underlineRef}
            className="navbar-underline"
          />
        </ul>

        <div 
          className="menu-container"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="menu-icon" onClick={handleMenuClick}>
            <div className="dots-grid">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
          
          {showMenu && (
            <div className="menu-dropdown" ref={menuRef}>
              <button className="menu-item" onClick={() => console.log('Track Your Order clicked')}>
                <span>Track Your Order</span>
              </button>
              <div className="menu-divider"></div>
              <button className="menu-item" onClick={() => console.log('Free Returns clicked')}>
                <span>Free Returns</span>
              </button>
              <div className="menu-divider"></div>
              <button className="menu-item" onClick={() => console.log('Customer Service clicked')}>
                <span>Customer Service</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

