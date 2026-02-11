import { useEffect, useRef } from "react";
import { type JSX } from "react";
import "./Services.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
};

const services: Service[] = [
  {
    id: "flower",
    title: "Floral Decoration",
    description: "Elegant floral arrangements and luxury décor to set the perfect mood for your celebration.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1600",
    imagePosition: "center 60%",
  },
  {
    id: "coordinate",
    title: "Wedding Coordination",
    description: "Seamless end-to-end planning and on-day execution for a stress-free wedding experience.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "photoshoot",
    title: "Cinematic Photoshoot",
    description: "Capturing every heartfelt moment with professional, cinematic photography and videography.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1600",
    imagePosition: "center 30%",
  },
  {
    id: "makeup",
    title: "Luxury Makeup Artist",
    description: "Expert beauty services to ensure you look breathtaking throughout your special day.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "invitation",
    title: "Elegant Invitations",
    description: "Custom-designed stationery and invitations that reflect the unique theme of your wedding.",
    image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "catering",
    title: "Premium Catering",
    description: "A culinary journey with curated menus and service that delights all your senses.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600",
  },
];

const Services = (): JSX.Element => {
  const rootRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".services-header > *", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 90%",
        }
      });

      // Cards Animation - Robust State Management
      const cards = gsap.utils.toArray(".service-card") as HTMLElement[];

      // Set initial state
      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.95
      });

      // Animate to visible state
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          once: true, // Crucial: Run once to avoid visibility bugs while scrolling back
        }
      });

      // Mouse Tracking for Shine Effect
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--x", `${x}px`);
          card.style.setProperty("--y", `${y}px`);
        };

        card.addEventListener("mousemove", handleMouseMove);
        return () => card.removeEventListener("mousemove", handleMouseMove);
      });

      // Refresh ScrollTrigger after a slight delay to ensure layouts are stable
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, root);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      className="services-section"
      id="services-section"
      aria-label="Our Services"
      ref={rootRef as any}
    >
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="container services-container">
        <header className="services-header">
          <h2 className="services-title">Crafting Your Perfect Day</h2>
          <p className="services-subtitle">
            From exquisite floral arrangements to cinematic photography,
            we provide everything you need to create a truly unforgettable celebration.
          </p>
        </header>

        <div className="services-grid" ref={cardsRef}>
          {services.map((s) => (
            <article className="service-card" key={s.id}>
              <div className="service-image-container">
                <img
                  src={s.image}
                  alt={s.title}
                  className="service-image"
                  loading="lazy"
                  style={{ objectPosition: s.imagePosition || 'center' }}
                />
              </div>
              <div className="service-content">
                <h4 className="service-card-title">{s.title}</h4>
                <p className="service-card-desc">{s.description}</p>
              </div>
              <div className="card-shine"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
