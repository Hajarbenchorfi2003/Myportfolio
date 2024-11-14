import dynamic from "next/dynamic";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Resume from "../src/components/sections/Resume";
import Layout from "../src/layouts/Layout";
import Skills from "../src/components/sections/Skills";
import WorksSection from "../src/components/sections/WorksSection";
import Services from "../src/components/sections/Services"; 
import Contact from "../src/components/sections/contact"; 
import GettingStarted from "../src/components/sections/GettingStarted"; 
import {
  servicesSliderProps,
  testimonialsSliderProps,
} from "../src/sliderProps";
const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const Index = () => {
  return (
    <Layout pageClassName={"home"}>
      {/* Section - Hero Started */}
     <GettingStarted />
      {/* Section - Services */}
      <Services/>
      {/* Section - Skills */}
    
        <Skills/>
       
      

      {/* Section - Works */}
      
     <WorksSection />
        

      {/* Section - Resume */}
      <Resume />
      {/* Section - Testimonials */}
     
      {/* Section - Pricing */}
      
      {/* Section - Blog */}
      
      {/* Section - Contacts */}
      <Contact/>
     
    </Layout>
  );
};
export default Index;
