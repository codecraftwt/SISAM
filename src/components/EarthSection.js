import React from 'react';
import Hero from './Hero';

const EarthSection = () => {
  return (
    <div className="wrapper" style={{ position: 'fixed' ,height:"100vh",overflowY:"hidden"}}>

      <div className="hero-container" style={{position:'relative',top:0,height:"100vh",overflowY:"auto"}}>

        <Hero />
      </div>
      <div>Scrolling content...</div>
    </div>
  );
};

export default EarthSection;