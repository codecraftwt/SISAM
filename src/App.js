import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Earth from './models/earth';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AboutUsSection from './components/AboutUs';
import ServiceCorousal from './components/ServicesCorousal';
import Stats from './components/Stats';
import TestimonialCard from './components/Testimonials';
// import Image from './components/Image';
import Testimonial from './components/TestimonialSection'
import TextContent from './components/Textcontent';
import Form from './components/Form';
import Footer from './components/Footer';
import Explore from './components/Explore';
import Imageripple from './components/Imageripplebg';
import ScrollAnimation from './components/ServicesCorousal';
import SoundPlayer from './components/Sound';
import soundFile from "../src/sound.mp3"
function App() {
  const sampleTestimonial = "From the very first call, I knew we were in the right hands. [Your Company Name] didn't just deliver a service — they brought our vision to life. We approached them with a vague idea of what we wanted, and they transformed it into something far better than we imagined. The attention to detail, clear communication, and commitment to deadlines were outstanding.";
  return (
    <div className="App">
      <Navbar />
      {/* <Header /> */}


      {/* <Canvas
                  camera={{ position: [0, 0, 3.4], fov: 75 }}
                  style={{ 
                    background: 'transparent',
                    width: '100vw',
                    height: '100vh',
                    marginTop: '100px'
                  }}
                >
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 12, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />
                  
                  <Suspense fallback={null}>
                    <Earth rotationY={0} scale={2} positionX={0} />
                  </Suspense>
                  
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI}
                    minPolarAngle={0}
                    enableDamping={true}
                    dampingFactor={0.05}
                  />
                </Canvas> */}

<SoundPlayer src={soundFile} />
   <Hero />
         <Services />
      <AboutUsSection />
      <Explore />

      {/* <ServiceCorousal /> */}
      {/* <TestimonialCard/> */}
      {/* <Testimonial /> */}
      <Form/>


      {/* < TextContent/> */}
      {/* <Image/> */}
      {/* <div className="App">
      <TestimonialCard 
        testimonial={sampleTestimonial}
        author="Jonathan Deo"
        title="CEO"
      />
    </div> */}
      <Footer />
    </div>
  );
}

export default App;
