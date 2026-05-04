"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    title: "50+ Features",
    description:
      "Complete device control with automation, theming, security, and performance tools all in one app.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    stat: "50+",
    statLabel: "Power Tools",
  },
  {
    title: "Zero Data Collection",
    description:
      "Your privacy matters. Patchwork runs entirely on-device with zero telemetry, analytics, or data harvesting.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    stat: "0",
    statLabel: "Data Sent",
  },
  {
    title: "Universal Compatibility",
    description:
      "Works seamlessly across all Android devices from Android 7.0+ to the latest versions without any hassle.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    stat: "7.0+",
    statLabel: "Android",
  },
  {
    title: "Root & Shizuku",
    description:
      "Unlock advanced capabilities with Root or Shizuku support. Works without root too — no compromises.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.5">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    stat: "ADB",
    statLabel: "Supported",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(".feature-header", 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );

    // Cards staggered animation from different directions
    const cards = gsap.utils.toArray<HTMLElement>('.feature-grid-card');
    cards.forEach((card, i) => {
      // Top cards from left/right, bottom cards from bottom
      let xOffset = 0;
      let yOffset = 50;
      
      if (i === 0) { xOffset = -50; yOffset = 0; }
      else if (i === 1) { xOffset = 50; yOffset = 0; }

      gsap.fromTo(card,
        { opacity: 0, x: xOffset, y: yOffset, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
          delay: i * 0.15
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6"
    >
      {/* Section glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,122,0,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="feature-header text-center mb-20 will-change-transform opacity-0">
          <span
            className="inline-block text-[12px] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ff7a00" }}
          >
            Why Patchwork
          </span>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-tight"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-white/40 text-[16px] max-w-md mx-auto">
            A single app that replaces dozens of utilities. Built for power users
            who demand complete control.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
