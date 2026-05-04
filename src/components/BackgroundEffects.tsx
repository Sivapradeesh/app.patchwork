"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    // Orb 1 animation (Top right)
    gsap.to(orb1Ref.current, {
      scale: 1.2,
      opacity: 0.5,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Orb 2 animation (Left center)
    gsap.to(orb2Ref.current, {
      scale: 1.15,
      opacity: 0.35,
      duration: 5,
      delay: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Orb 3 animation (Bottom right)
    gsap.to(orb3Ref.current, {
      scale: 1.3,
      opacity: 0.3,
      x: 30,
      y: -20,
      duration: 6,
      delay: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Particles animation
    const particles = gsap.utils.toArray<HTMLElement>('.particle');
    particles.forEach((particle) => {
      // Random initial delay and duration
      const delay = Math.random() * 5;
      const duration = 2 + Math.random() * 2;
      
      gsap.to(particle, {
        y: -40,
        opacity: 0.6,
        duration: duration,
        delay: delay,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
      
      // Floating side to side
      gsap.to(particle, {
        x: () => (Math.random() - 0.5) * 20,
        duration: duration * 1.5,
        delay: delay,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Primary gradient orb - top right */}
      <div
        ref={orb1Ref}
        className="orb orb-orange"
        style={{
          width: "800px",
          height: "800px",
          top: "-200px",
          right: "-200px",
          opacity: 0.3,
        }}
      />

      {/* Purple orb - left center */}
      <div
        ref={orb2Ref}
        className="orb orb-purple"
        style={{
          width: "600px",
          height: "600px",
          top: "40%",
          left: "-200px",
          opacity: 0.2,
        }}
      />

      {/* Small accent orb - bottom right */}
      <div
        ref={orb3Ref}
        className="orb orb-orange"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          right: "10%",
          opacity: 0.15,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient from center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,122,0,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      {mounted && [...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-white/5 opacity-0"
          style={{
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
}
