import { type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Services from "../Services/Services";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";
import Reviews from "../Reviews/Reviews";
import Hero from "../../components/Hero/Hero";

import './home.css'

gsap.registerPlugin(ScrollTrigger);

const Home = (): JSX.Element => {

  return (
    <>
      <Hero />
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
    </>
  );
};

export default Home;
