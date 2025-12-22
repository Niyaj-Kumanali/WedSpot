// src/components/Services/Services.tsx
import React, { useEffect, useRef } from "react";
import { type JSX } from "react";
import "./Services.css";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BrushIcon from "@mui/icons-material/Brush";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type Service = {
  id: string;
  title: string;
  description: string;
  Icon: React.ElementType;
};

const services: Service[] = [
  {
    id: "flower",
    title: "Floral Decoration",
    description:
      "Floral décor plays a key role in weddings, enhancing the mood and beauty of the venue.",
    Icon: LocalFloristIcon,
  },
  {
    id: "coordinate",
    title: "Wedding Coordination",
    description:
      "End-to-end wedding planning, vendor management, and seamless event-day execution.",
    Icon: ManageAccountsIcon,
  },
  {
    id: "photoshoot",
    title: "Photoshoot",
    description:
      "Professional photography to capture every precious moment with a cinematic touch",
    Icon: CameraAltIcon,
  },
  {
    id: "makeup",
    title: "Makeup Artist",
    description:
      "Experienced makeup artists to create looks that last through the whole event.",
    Icon: BrushIcon,
  },
  {
    id: "invitation",
    title: "Invitation",
    description:
      "Custom invitations and stationery design that match your wedding's theme.",
    Icon: MailOutlineIcon,
  },
  {
    id: "catering",
    title: "Catering Services",
    description:
      "Catering & restaurant partnerships with menus to suit your taste and budget.",
    Icon: RestaurantMenuIcon,
  },
];

const Services = (): JSX.Element => {
  const rootRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    itemRefs.current = Array.from(
      root.querySelectorAll(".service-card")
    ) as Array<HTMLDivElement>;
    iconRefs.current = Array.from(
      root.querySelectorAll(".service-icon")
    ) as Array<HTMLDivElement>;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none reverse",
          once: false,
        },
      });

      // Set initial states
      gsap.set(itemRefs.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        rotationX: 15,
      });

      gsap.set(iconRefs.current, {
        scale: 0,
        rotation: -180,
      });

      // Animate cards in
      tl.to(itemRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Animate icons with bounce
      tl.to(
        iconRefs.current,
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
        },
        "-=0.6"
      );

      ScrollTrigger.refresh();
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      className="services-section with-fog"
      aria-label="Our Services"
      ref={rootRef as any}
    >
      <div className="container services-container">
        <header className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Floral design, photography, catering, and more, designed to make
            your wedding truly memorable.
          </p>
        </header>

        <div className="services-grid">
          {services.map((s) => {
            const Icon = s.Icon;

            return (
              <article className={`service-card`} key={s.id}>
                <div className="service-icon" aria-hidden="true">
                  <Icon fontSize="large" />
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.description}</p>

                {/* Hover indicator */}
                <div className="card-shine"></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
