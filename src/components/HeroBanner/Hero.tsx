import { useEffect, useRef, type JSX } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/Hero_Couple_Image.png";
import "../../Pages/Home/homePage.css";

const Hero = (): JSX.Element => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // scope animations/selectors to this component
    const ctx = gsap.context(() => {
      // ensure the section is visible by default
      gsap.set(".hero-section, .hero-left > *, .hero-right", { opacity: 1 });

      // create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
          once: false,
        },
      });

      // get left children (fresh each time)
      const leftChildren = gsap.utils.toArray(".hero-left > *");

      // animate left children in from below/fade (moderate pacing)
      tl.from(leftChildren, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.32,
        delay: 0.2,
        ease: "power3.out",
        immediateRender: false,
      });

      // animate right image in
      tl.from(
        ".hero-right",
        {
          opacity: 0,
          x: 60,
          duration: 1.2,
          ease: "power3.out",
          immediateRender: false,
        },
        "-=0.8"
      );

      // subtle floating animation on the image
      // gsap.to(".hero-image", {
      //   y: -12,
      //   duration: 3,
      //   ease: "power1.inOut",
      //   repeat: -1,
      //   yoyo: true,
      // });

      // parallax background
      gsap.to(".hero-section", {
        backgroundPositionY: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top bottom",
          scrub: 1.2,
        },
      });

      // refresh triggers so returning to the page recalculates positions
      ScrollTrigger.refresh();
    }, heroRef);

    //
    // GSAP Hover animation for the button (safe event listeners + cleanup)
    //
    const btnEl = btnRef.current;
    let arrowEl: HTMLElement | null = null;

    if (btnEl) {
      // MUI places the endIcon in element with class .MuiButton-endIcon
      arrowEl = btnEl.querySelector(".MuiButton-endIcon") as HTMLElement | null;

      const onEnter = () => {
        // move whole button slightly to right
        gsap.to(btnEl, {
          x: 8,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });

        // move arrow more so it feels like it's leading
        if (arrowEl)
          gsap.to(arrowEl, {
            x: 6,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
      };

      const onLeave = () => {
        gsap.to(btnEl, {
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });

        if (arrowEl)
          gsap.to(arrowEl, {
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
      };

      btnEl.addEventListener("mouseenter", onEnter);
      btnEl.addEventListener("mouseleave", onLeave);

      // cleanup for these listeners (will run in the final cleanup below)
      const removeListeners = () => {
        btnEl.removeEventListener("mouseenter", onEnter);
        btnEl.removeEventListener("mouseleave", onLeave);
      };

      // return cleanup function that removes listeners, reverts ctx & kills triggers
      return () => {
        removeListeners();
        ctx.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }

    // if button not present, still cleanup ctx & triggers
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-left" ref={leftRef}>
        <h4 className="hero-subtitle">Manage your time easily</h4>
        <h1 className="hero-title">Track your wedding plans and work wisely</h1>
        <p className="hero-description">
          Plan your dream wedding with our advanced management tools. From
          organizing family meetings to booking suppliers, we handle everything
          smoothly and professionally.
        </p>

        <div ref={btnRef} className="hero-btn-wrapper">
          <Button
            className="hero-btn"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            component={Link}
            to="/register"
          >
            Get Started
          </Button>
        </div>
      </div>

      <div className="hero-right" ref={rightRef}>
        <img src={heroImage} alt="Wedding Hero" className="hero-image" />
        {/* blend element sits on top of the left side of the image to fade it into text */}
        <div className="hero-image-blend" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
