import { type JSX, useEffect, useRef } from "react";
import "./AboutUs.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutUsImg from "../../assets/images/aboutus.png";

gsap.registerPlugin(ScrollTrigger);

const About = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, descRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(".feature-item", {
        opacity: 0,
        x: -20,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 30,
      });

      // Create timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title, subtitle, and description in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Animate feature items with stagger
      gsap.to(".feature-item", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-wave"></div>

      <div className="about-container">
        {/* Main Grid Container */}
        <div className="about-grid">
          {/* Left Side - Content */}
          <div className="about-content">
            <h2 ref={titleRef} className="about-title">About WeddsPot</h2>
            <h4 className="about-sub-title" ref={subtitleRef}>
              Creating Magical Moments Since 2019
            </h4>
            <p className="about-description" ref={descRef}>
              We're a passionate team of wedding planners dedicated to bringing
              your dream wedding to life. With years of experience and countless
              successful events, we handle every detail with precision and care.
            </p>

            {/* Features Grid */}
            <div className="features-grid" ref={featuresRef}>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Expert Team</h4>
                  <p>50+ professionals</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Trusted Timelines</h4>
                  <p>100% guarantee</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Quality Service</h4>
                  <p>Premium experience</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>5-Star Rated</h4>
                  <p>Trusted by couples</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="about-image-container" ref={imageRef}>
            <div className="about-image-wrapper">
              <img
                    src={aboutUsImg}
                    alt="Wedding Planning"
                    className="about-image"
                    />
              <div className="image-overlay">
                <div className="overlay-stat">
                  <div className="overlay-number">200+</div>
                  <div className="overlay-label">Happy Couples</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="image-decoration decoration-1"></div>
            <div className="image-decoration decoration-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;