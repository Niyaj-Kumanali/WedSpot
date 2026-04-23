import { type JSX } from "react";
import { Box } from "@mui/material";
import WhyChooseUs from "./Sections/WhyChooseUs/WhyChooseUs";
import Services from "./Sections/Services/Services";
import ContactUs from "./Sections/ContactUs/ContactUs";
import AboutUs from "./Sections/AboutUs/AboutUs";
import Reviews from "./Sections/Reviews/Reviews";
import Hero from "./Sections/Hero/Hero";


const Home = (): JSX.Element => {
  const sectionSx = {
    scrollMarginTop: "80px",
  };

  return (
    <Box className="home-page">
      <Hero />
      <Box component="section" id="why-choose-us" sx={sectionSx}>
        <WhyChooseUs />
      </Box>
      <Box component="section" id="services" sx={sectionSx}>
        <Services />
      </Box>
      <Box component="section" id="contact" sx={sectionSx}>
        <ContactUs />
      </Box>
      <Box component="section" id="about" sx={sectionSx}>
        <AboutUs />
      </Box>
      <Box component="section" id="reviews" sx={sectionSx}>
        <Reviews />
      </Box>
    </Box>
  );
};

export default Home;
