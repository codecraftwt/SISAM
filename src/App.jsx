import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero/Hero'
import AboutUsSection from './components/AboutUs/AboutUs'
import ExploreCardsSection from './components/Explore/ExploreCards'
import Form from './components/Form/Form'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Cursor from './components/Cursor'
import Testimonials from './components/Testimonials/Testimonials'
import OurSolutions from './components/OurSolutions/OurSolutions'
import OceanScene from './components/Ocean/Ocean'
import Explore from './components/Explore/Explore'
import ScrollableContent from "./components/Testimonials/Grids.jsx";
import GridBackground from './components/Testimonials/Grids.jsx'
import TruckLoader from './components/Loader/TruckLoader'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);


    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     {isLoading && (
  <div className={`loader-overlay ${!isLoading ? "hidden" : ""}`}>
    <TruckLoader />
  </div>
)}

      <Navbar />
      <Cursor />
      <section>
        <Hero />
      </section>
      <section>
        <OceanScene />
      </section>
      <section>
        <AboutUsSection />
      </section>
      <section>
        <Explore />
      </section>
      <section>
        <GridBackground />
      </section>
      <section>
        <Form />
      </section>
      <section>
        <Footer />
      </section>
    </>
  )
}

export default App
