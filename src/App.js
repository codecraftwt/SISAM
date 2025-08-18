import React, { Suspense, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
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
import Background from "./components/Background";
import ImageCarousel3D from "./components/Image";
import logo from "./assets/logo.png";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";
import { gsap } from 'gsap';
import ParticlesCursor from './components/ParticleCursor';
import ExploreCards from './components/ExploreCards';

import Clouds from './components/Clouds'
import Overlap from './components/Overlap'

import OceanScene from './components/Ocean';

import TravelingTruck from './components/OurSolutions';

function App() {
  const sampleTestimonial = "From the very first call, I knew we were in the right hands. [Your Company Name] didn't just deliver a service — they brought our vision to life. We approached them with a vague idea of what we wanted, and they transformed it into something far better than we imagined. The attention to detail, clear communication, and commitment to deadlines were outstanding.";

 const logoUrls = [
   logo,
   logo1,
   logo2,
   logo3,
   logo4,
   logo5,
   logo6
   ];
     window.__CAROUSEL_IMAGES__ = logoUrls;
     useEffect(()=>{
    gsap.to(".section2 .innerDiv",{
   transform:"translateX(-150%)",
  // duration:50,
  scrollTrigger:{
      trigger:".section2",
      scroller:"body",
      // markers:true,
      start:"top 0%",
      end:"bottom -250%",
      scrub:2,
      pin:true
  }})
  },[])

  return (
    <div className="App">

      <Navbar />
      <SoundPlayer src={soundFile} />
      <div className='section2 w-[100vw] h-[1vh] bg-white'>
          <div style={{height:"100vh"}}>
            <Hero />
          </div>
      </div> 
      <div className='section3 w-[100vw] h-[100vh] bg-white'>
          <div style={{height:"100vh"}}>
                 <Services />
          </div>
      </div> 
     <AboutUsSection />

      <ExploreCards />

      <Form/>

      <Footer />  

      {/* <ParticlesCursor/> */}


      


{/* <Clouds/> */}
      {/* <div style={{height:"100vh"}}><OceanScene /></div> */}



      {/* <ServiceCorousal />  */}
      {/* <Background /> */}
      {/* <TestimonialCard/> */}
      {/* <Testimonial /> */}
      {/* < TextContent/> */}
      {/* <div style={{ width: '100%', height: '600px' }}>
    
    </div> */}
      {/* <div className="App">
      <TestimonialCard 
        testimonial={sampleTestimonial}
        author="Jonathan Deo"
        title="CEO"
      />
    </div> */}




  {/* <div>
      <ImageCarousel3D images={logoUrls} spacing={3.5} planeSize={[3, 3]} speed={8} />
    </div> */}

     {/* <Stats/> */}

       {/* <Overlap/> */}

       {/* <TravelingTruck /> */}

    </div>
  );
}

export default App;
