import { type JSX, useEffect, useRef } from "react";
import "./ContactUs.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate contact info
      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate form
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Animate form fields with stagger
      gsap.from(".form-group", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-info" ref={infoRef}>
          {/* <div className="contact-badge">Get In Touch</div> */}
          <h2 className="contact-title">Contact Us</h2>
          <p>
            Have questions? Need help? Send us a message and we'll get back to
            you as soon as possible.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8L10.89 13.26C11.54 13.67 12.46 13.67 13.11 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>support@weddspot.com</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Phone</h4>
                <p>+91 (555) 123-4567</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.657 16.657L13.414 20.9C12.633 21.681 11.367 21.681 10.586 20.9L6.343 16.657C3.219 13.533 3.219 8.467 6.343 5.343C9.467 2.219 14.533 2.219 17.657 5.343C20.781 8.467 20.781 13.533 17.657 16.657Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>123 Wedding Street, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form
          className="contact-form"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const name = formData.get("name");
            const email = formData.get("email");
            const subject = formData.get("subject");
            const message = formData.get("message");

            if (!name || !email || !subject || !message) {
              alert("Please fill all required fields.");
              return;
            }

            console.log("Form submitted:", Object.fromEntries(formData));
            e.currentTarget.reset();
          }}
        >
          <div className="form-group">
            <label>Name *</label>
            <input name="name" type="text" required placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" type="text" placeholder="+91 (555) 000-0000" />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <input
              name="subject"
              type="text"
              required
              placeholder="How can we help?"
            />
          </div>

          <div className="form-group full">
            <label>Message *</label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Tell us more about your inquiry..."
            ></textarea>
          </div>

          <button type="submit" className="send-btn">
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
