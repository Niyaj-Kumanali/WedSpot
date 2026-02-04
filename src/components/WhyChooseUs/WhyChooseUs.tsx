// src/components/WhyChooseUs/WhyChooseUs.tsx
import React, { useEffect, useRef } from "react";
import { Container, Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import lightbulb from "../../assets/icons/lightbulb.svg";
import money from "../../assets/icons/money.svg";
import bolt from "../../assets/icons/bolt.svg";
import people from "../../assets/icons/people.svg";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  id: string;
  title: string;
  description: string;
  // `icon` is an inline SVG string or JSX element
  icon: React.ReactNode;
  accent?: string;
};

const SVGs = {
  lightbulb: <img src={lightbulb} width={32} height={32} alt="" />,
  money: <img src={money} width={32} height={32} alt="" />,
  bolt: <img src={bolt} width={32} height={32} alt="" />,
  people: <img src={people} width={32} height={32} alt="" />,
};

const FEATURES: Feature[] = [
  {
    id: "team",
    title: "Professional & Creative Team",
    description: "We design unique & modern event experiences.",
    icon: SVGs.lightbulb,
    accent: "#8b5cf6",
  },
  {
    id: "budget",
    title: "Budget-Friendly Packages",
    description: "We Provide high quality within your budget.",
    icon: SVGs.money,
    accent: "#7c3aed",
  },
  {
    id: "fast",
    title: "Premium Wedding Assistance",
    description: "Fast response and on-time delivery every time.",
    icon: SVGs.bolt,
    accent: "#ef4444",
  },
  {
    id: "clients",
    title: "Trusted by 200+ Happy Clients",
    description: "The choice of many families across the city.",
    icon: SVGs.people,
    accent: "#10b981",
  },
];

const WhyChooseUs: React.FC = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // collect nodes with class .why-card
    itemRefs.current = Array.from(root.querySelectorAll(".why-card")) as Array<HTMLDivElement>;

    const ctx = gsap.context(() => {
      gsap.set(itemRefs.current, { opacity: 0, y: 18, autoAlpha: 0 });

      gsap.to(itemRefs.current, {
        autoAlpha: 1,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.45, // one-by-one slowly
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: false,         // replay on re-enter
          invalidateOnRefresh: true,
        },
      });

      // refresh on resize/route changes
      ScrollTrigger.addEventListener("refreshInit", () => {});
      ScrollTrigger.refresh();
    }, root);

    // also refresh when window resizes (helps if layout changes)
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <Container
      component="section"
      ref={rootRef as any}
      sx={{
        pt: { xs: 6, md: "60px" },
        pb: { xs: 6, md: "40px" }
      }}
      aria-labelledby="why-choose-us"
    >
      <Box textAlign="center" mb={4}>
        <Box
  sx={{
    position: "relative",
    display: "inline-block",
    fontSize: "2.3rem",
    fontWeight: 700,
    color: "#1a1a1a",
    mb: 3,

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "4px",
      background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 60%)",
      borderRadius: "2px",
    },
  }}
>
  Why Choose Us?
</Box>

        <Typography variant="body2" color="text.secondary" maxWidth={760} mx="auto" sx={{ mt: 2, mb: 2 }}>
          We craft memorable weddings that match your style and budget.
        </Typography>
      </Box>

      <Box
        component="ul"
        role="list"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          rowGap: { xs: 7, md: 12 },     
          columnGap: { xs: 4, md: 6 },
          alignItems: "start",
          listStyle: "none",
          p: 0,
          m: 0,
        }}
      >
        {FEATURES.map((f) => (
          <Box
            key={f.id}
            component="li"
            role="listitem"
            className="why-card"
            aria-labelledby={`${f.id}-title`}
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              alignItems: { xs: "center", md: "center" },
              textAlign: { xs: "left", md: "center" },
              px: { xs: 2, md: 0 },
              gap: { xs: 2, md: 0 },
            }}
          >
            {/* chunkier white pill with softer shadow */}
            <Box
              sx={{
                width: { xs: 60, md: 84 },
                height: { xs: 60, md: 64 },
                minWidth: { xs: 60, md: 84 },
                borderRadius: 999,
                backgroundColor: "#fff",
                display: "grid",
                placeItems: "center",
                mb: { xs: 0, md: 4 },
                boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
                color: f.accent ?? "primary.main",
              }}
              aria-hidden
            >
              {f.icon}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography id={`${f.id}-title`} variant="h6" fontWeight={700} sx={{ mb: 0.5 }} >
                {f.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: { xs: "100%", md: 320 }, lineHeight: 1.4 }}>
                {f.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default WhyChooseUs;
