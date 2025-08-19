import React, { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Earth from './models/earth';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from "@react-three/drei";
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
import Background from "./components/Background";
import LogosCarousel from "./components/Image";
import logo from "./assets/logo.png";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";
import { gsap } from 'gsap';

import OceanScene from './components/Ocean';

import TravelingTruck from './components/DoortoDoor';
import Cards from './components/Cards';
import ShipSectipn from './components/ShipSection';
import CloudScene from './components/Cloud';

function App() {
  const sampleTestimonial = "From the very first call, I knew we were in the right hands. [Your Company Name] didn't just deliver a service — they brought our vision to life. We approached them with a vague idea of what we wanted, and they transformed it into something far better than we imagined. The attention to detail, clear communication, and commitment to deadlines were outstanding.";


  
function CloudModel({ position = [0, 0, 0], scale = 2 }) {
  const { scene } = useGLTF("/models/cloud/scene.gltf");

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0.7, 0.7, 0.2]} // ~40deg,40deg,10deg
    />
  );
}


// Preload
useGLTF.preload("/models/cloud/scene.gltf");

 const logoUrls = [
   logo,
   logo1,
   logo2,
   logo3,
   logo4,
   logo5,
   logo6
   ];
     useEffect(()=>{
    gsap.to(".section2 .innerDiv",{
   transform:"translateX(-450%)",
  // duration:50,
  scrollTrigger:{
      trigger:".section2",
      scroller:"body",
      // markers:true,
      start:"top 0%",
      end:"bottom -450%",
      scrub:2,
      pin:true
  }})
    gsap.to(".section3 .innerDiv",{
   transform:"translateX(-450%)",
  //  xPercent: -450,
  scrollTrigger:{
      trigger:".section3",
      scroller:"body",
      // markers:true,
      start:"top 0%",
      end:"bottom -450%",
      scrub:2,
      pin:true
  }})
  },[])

  return (
    <div className="App">

      {/* <Navbar />
      <SoundPlayer src={soundFile} /> */}

{/* <CloudScene/> */}

              <div className="section2 w-[100vw] h-[1vh] bg-white relative">
              <div className="innerDiv"></div>
              <div style={{ height: "100vh" }}>
                <Hero />
              </div>
            </div>
            {/* <div
              className="middle-section w-[100vw] h-[100vh] bg-gradient-to-b from-white via-gray-100 to-white relative z-10 -mt-[25vh]"
              style={{background: "linear-gradient(to bottom, #000814, #c3a264)",height:"50vh"}}
            >
              <div className="flex items-center justify-center h-full">
                <Canvas
                    style={{ height: "100vh", width: "100vw",background: "linear-gradient(to bottom, #000814, #c3a264)" }}
                    camera={{ position: [0, 0, 3], fov: 50 }}
                  >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <CloudModel position={[-4, -1.5, 0]} scale={6} />
                    <OrbitControls />
                  </Canvas>
              </div>
            </div> */}

      {/* <div style={{height:"100vh"}}/> */}

            <div className="section3 w-[100vw] h-[1vh] bg-white relative">
              <div className="innerDiv"></div>
              <div style={{ height: "100vh" }}>
                <ShipSectipn />
              </div>
            </div>

      {/* <div style={{height:"100vh"}}/>
      <Cards/> */}

      <Services />
      {/* <AboutUsSection />
      <Explore /> 
      <Footer />   */}


      {/* <TravelingTruck /> */}


      {/* <div style={{height:"100vh"}}><OceanScene /></div> */}



      {/* <ServiceCorousal />  */}
      {/* <Background /> */}
      {/* <TestimonialCard/> */}
      {/* <Testimonial /> */}
      {/* <Form/> */}
      {/* < TextContent/> */}
      {/* <div style={{ width: '100%', height: '600px' }}>
      <LogosCarousel 
        logos={logoUrls} 
        logoWidth={1} 
        logoHeight={0.5} 
        spacing={0.5} 
        speed={2} 
      />
    </div> */}
      {/* <div className="App">
      <TestimonialCard 
        testimonial={sampleTestimonial}
        author="Jonathan Deo"
        title="CEO"
      />
    </div> */}






    </div>
  );
}

export default App;
