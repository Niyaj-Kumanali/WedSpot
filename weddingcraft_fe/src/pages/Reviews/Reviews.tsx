import { type JSX, useEffect, useRef, useState } from "react";
import "./Reviews.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Review } from "../../Types/Reviews";

gsap.registerPlugin(ScrollTrigger);


const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah & Michael",
    role: "Wedding - June 2024",
    image: "https://ui-avatars.com/api/?name=Sarah+Michael&background=7c3aed&color=fff&size=80",
    rating: 5,
    review: "WeddsPot made our dream wedding come true! Every detail was perfect, from the flowers to the coordination. The team was professional, attentive, and truly cared about making our day special.",
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Emily & James",
    role: "Wedding - April 2024",
    image: "https://ui-avatars.com/api/?name=Emily+James&background=a855f7&color=fff&size=80",
    rating: 5,
    review: "Absolutely amazing service! The photographers captured every precious moment beautifully. We couldn't be happier with how everything turned out. Highly recommend WeddsPot to any couple!",
    date: "4 months ago"
  },
  {
    id: 3,
    name: "Jessica & David",
    role: "Wedding - March 2024",
    image: "https://ui-avatars.com/api/?name=Jessica+David&background=8b5cf6&color=fff&size=80",
    rating: 5,
    review: "From planning to execution, everything was flawless. The team handled our destination wedding with such ease and professionalism. Our guests are still talking about how beautiful it was!",
    date: "5 months ago"
  },
  {
    id: 4,
    name: "Amanda & Robert",
    role: "Wedding - February 2024",
    image: "https://ui-avatars.com/api/?name=Amanda+Robert&background=9333ea&color=fff&size=80",
    rating: 5,
    review: "Best decision we made for our wedding! The attention to detail and creative ideas from the WeddsPot team exceeded our expectations. Thank you for making our special day unforgettable!",
    date: "6 months ago"
  },
  {
    id: 5,
    name: "Rachel & Tom",
    role: "Wedding - January 2024",
    image: "https://ui-avatars.com/api/?name=Rachel+Tom&background=7c3aed&color=fff&size=80",
    rating: 5,
    review: "Professional, creative, and so easy to work with! They took all our stress away and delivered a wedding that was more beautiful than we imagined. Worth every penny!",
    date: "7 months ago"
  },
  {
    id: 6,
    name: "Lisa & Mark",
    role: "Wedding - December 2023",
    image: "https://ui-avatars.com/api/?name=Lisa+Mark&background=a855f7&color=fff&size=80",
    rating: 5,
    review: "WeddsPot turned our vision into reality with such grace and precision. The makeup artists were incredible, and the venue decoration was breathtaking. Couldn't have asked for better!",
    date: "8 months ago"
  }
];

const Reviews = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      gsap.set(".review-card", { opacity: 0, y: 40, scale: 0.95 });

      // Animate header
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Animate review cards with stagger
      gsap.to(".review-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? "#fbbf24" : "#e5e7eb"}
        className="star-icon"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ));
  };

  return (
    <section className="reviews-section" ref={sectionRef}>
      <div className="reviews-container">
        {/* Header */}
        <div className="reviews-header" ref={headerRef}>
          <h2 className="reviews-title">What Our Clients Say</h2>
          <p>
            Don't just take our word for it - hear from the couples who trusted
            us with their special day.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid" ref={cardsRef}>
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`review-card ${activeIndex === index ? "active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Quote Icon */}
              <div className="quote-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>

              {/* Rating */}
              <div className="review-rating">{renderStars(review.rating)}</div>

              {/* Review Text */}
              <p className="review-text">{review.review}</p>

              {/* Author Info */}
              <div className="review-author">
                <img
                  src={review.image}
                  alt={review.name}
                  className="author-image"
                />
                <div className="author-details">
                  <h4>{review.name}</h4>
                  <p>{review.role}</p>
                </div>
              </div>

              {/* Date */}
              <div className="review-date">{review.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;