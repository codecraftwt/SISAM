import React from 'react';
import Textcontent from '../components/Textcontent';
import Testimonial from '../components/Testimonials';

function ColorDivs() {
  return (
    <div>
      <div className="color-div1" style={{ width: '100vw', height: '50vh', display: 'flex' }}>
        <div style={{ width: '50%', height: '100%', backgroundColor: 'red' }} >
          <Textcontent />
        </div>
        <div style={{ width: '50%', height: '100%', backgroundColor: 'yellow' }}>
          <Testimonial />
        </div>
      </div>
      <div className="color-div2" style={{ color: '#013567', width: '100vw', height: '30vh', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }} >
        <p style={{ fontSize: '56px', fontWeight: '700', textAlign: 'center', margin: '20PX auto' }}>Sisam – Transport & Export</p>
        <p style={{ fontSize: '56px', fontWeight: '700', textAlign: 'center', margin: '0 auto' }}>Without Limits</p>
      </div>
      <div className="color-div3" style={{ width: '100vw', height: '40vh', backgroundColor: 'blue' }} >
        
      </div>
    </div>
  );
}

export default ColorDivs;