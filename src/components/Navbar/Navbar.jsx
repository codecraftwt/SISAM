import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './Navbar.css';
import logoImage from '../../assets/Sisamlogo.png';

const NAV_ITEMS = [
  { label: 'HOME', to: '/home' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'SERVICE', to: '/service' },
  { label: 'BLOG', to: '/blog' },
  { label: 'CONTACT US', to: '/contact' },
];

// Breakpoint definitions
const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1200,
};

const Navbar = ({ onLinkClick }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showWhiteBg, setShowWhiteBg] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  const itemRefs = useRef([]);
  const underlineRef = useRef(null);
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const scrollTimeout = useRef(null);
  const menuTimeout = useRef(null);

  // Enhanced responsive breakpoint management
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Determine device type
      if (width <= BREAKPOINTS.MOBILE) {
        setDeviceType('small-mobile');
        setIsMobile(true);
        setIsTablet(false);
        setIsSmallMobile(true);
      } else if (width <= BREAKPOINTS.TABLET) {
        setDeviceType('mobile');
        setIsMobile(true);
        setIsTablet(false);
        setIsSmallMobile(false);
      } else if (width <= BREAKPOINTS.LAPTOP) {
        setDeviceType('tablet');
        setIsMobile(false);
        setIsTablet(true);
        setIsSmallMobile(false);
      } else {
        setDeviceType('desktop');
        setIsMobile(false);
        setIsTablet(false);
        setIsSmallMobile(false);
      }
    };

    // Initial call
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const idx = hoverIdx !== null ? hoverIdx : activeIdx;
    const elem = itemRefs.current[idx];
    const underline = underlineRef.current;
    if (elem && underline && !isMobile && !isTablet) {
      const { offsetLeft, offsetWidth } = elem;
      gsap.to(underline, {
        left: offsetLeft,
        width: offsetWidth,
        duration: 0.5,
        y: 30,
        ease: 'expo.out',
      });
    }
  }, [activeIdx, hoverIdx, isMobile, isTablet]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atTop = currentScrollY === 0;
      setIsAtTop(atTop);
      
      // Disable scroll-based navbar hiding on small mobile devices for better UX
      if (isSmallMobile) {
        setShowNavbar(true);
        setShowWhiteBg(false);
        return;
      }
      
      if (atTop) {
        setShowNavbar(true);
        setShowWhiteBg(false);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
        setShowWhiteBg(false);
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
  }, [isHovering, isSmallMobile]);

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
    if (isSmallMobile) return; // Disable hover effects on small mobile
    setIsHovering(true);
    setShowNavbar(true);
    setShowWhiteBg(false);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
  };
  
  const handleNavbarMouseLeave = () => {
    if (isSmallMobile) return; // Disable hover effects on small mobile
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
    if (isMobile || isSmallMobile) return; // Disable hover on mobile
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
      menuTimeout.current = null;
    }
    setShowMenu(true);
  };

  const handleMenuMouseLeave = () => {
    if (isMobile || isSmallMobile) return; // Disable hover on mobile
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
    }
    menuTimeout.current = setTimeout(() => {
      setShowMenu(false);
      menuTimeout.current = null;
    }, 1000); 
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav
      className={`navbar navbar-${deviceType}${showWhiteBg ? ' white-bg' : ''}`}
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

        {/* Desktop/Tablet Nav */}
        {!isMobile && (
          <ul className="navbar-main" style={{ position: 'relative' }}>
            {NAV_ITEMS.map((item, idx) => (
              <li
                key={item.label}
                ref={elem => (itemRefs.current[idx] = elem)}
                className={idx === activeIdx ? 'active' : ''}
                onMouseEnter={() => !isTablet && setHoverIdx(idx)}
                onMouseLeave={() => !isTablet && setHoverIdx(null)}
                onClick={() => {
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
            {!isTablet && (
              <div
                ref={underlineRef}
                className="navbar-underline"
              />
            )}
          </ul>
        )}

        {/* Mobile Nav */}
        {isMobile && (
          <div className="mobile-menu">
            <button 
              className={`hamburger ${showMenu ? 'active' : ''}`} 
              onClick={handleMenuClick} 
              aria-label="Toggle menu"
              aria-expanded={showMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
            {showMenu && (
              <div className="mobile-dropdown">
                {NAV_ITEMS.map((item, idx) => (
                  <button
                    key={item.label}
                    className={`mobile-nav-item${idx === activeIdx ? ' active' : ''}`}
                    onClick={() => {
                      setActiveIdx(idx);
                      setShowMenu(false);
                      if (onLinkClick) onLinkClick(item.label, idx, item.to);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="menu-divider"></div>
                <button className="menu-item" onClick={() => {
                  console.log('Track Your Order clicked');
                  setShowMenu(false);
                }}>
                  Track Your Order
                </button>
                <button className="menu-item" onClick={() => {
                  console.log('Free Returns clicked');
                  setShowMenu(false);
                }}>
                  Free Returns
                </button>
                <button className="menu-item" onClick={() => {
                  console.log('Customer Service clicked');
                  setShowMenu(false);
                }}>
                  Customer Service
                </button>
              </div>
            )}
          </div>
        )}

        {/* Desktop menu (dots) */}
        {!isMobile && (
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
                <button className="menu-item" onClick={() => {
                  console.log('Track Your Order clicked');
                  setShowMenu(false);
                }}>
                  <span>Track Your Order</span>
                </button>
                <div className="menu-divider"></div>
                <button className="menu-item" onClick={() => {
                  console.log('Free Returns clicked');
                  setShowMenu(false);
                }}>
                  <span>Free Returns</span>
                </button>
                <div className="menu-divider"></div>
                <button className="menu-item" onClick={() => {
                  console.log('Customer Service clicked');
                  setShowMenu(false);
                }}>
                  <span>Customer Service</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;