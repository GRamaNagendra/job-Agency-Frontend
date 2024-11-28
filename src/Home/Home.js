import React,{useEffect} from 'react';
import Herosection from './Herosection';


import AOS from 'aos';
import 'aos/dist/aos.css';
import CompanyInfo from './CompanyInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AdminSection from './AdminSection';

import JobsHerosection from './JobsHerosection'
import FeedbackSection from './Feedback';
import Achievements from './Achivement';
import JobsHeroSection from './JobsHerosection';
import ContactForm from '../contact';
import Teamsection from './Teamsection';




gsap.registerPlugin(ScrollTrigger);
function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    // Global GSAP animations
    gsap.from('.fade-in', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.fade-in',
        start: 'top 80%',
      },
    });
  }, []);


  return (
    <div className="App">
      <Herosection />
      <CompanyInfo/>
<AdminSection/>

<Teamsection/>
     
      <JobsHeroSection/>
  <ContactForm/>
  <Achievements/>
      <FeedbackSection/>

 
    </div>
  );
}

export default Home;
