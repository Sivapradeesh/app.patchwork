"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import DownloadBadge from "./DownloadBadge";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const tl = gsap.timeline();

    // Cinematic Staggered Entrance
    tl.fromTo(".hero-badge", 
      { opacity: 0, y: 30, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out" }
    )
    .fromTo(".hero-title", 
      { opacity: 0, y: 40, scale: 0.95 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" },
      "-=0.7"
    )
    .fromTo(".hero-subtitle", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.9"
    )
    .fromTo(".hero-counter", 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.7"
    )
    .fromTo(".hero-buttons", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-scroll",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.2"
    );

    // Continuous Floating Motion for the entire container
    gsap.to(containerRef.current, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Badge pulse glow
    gsap.to(".counter-border", {
      boxShadow: "0 0 30px rgba(255,122,0,0.3)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll trigger: scale down and fade out hero on scroll
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      scale: 0.85,
      opacity: 0,
      y: 100,
      ease: "power1.inOut"
    });

    // Mouse parallax for subtle interaction
    const moveX = gsap.quickTo(containerRef.current, "x", { duration: 0.6, ease: "power3" });
    const moveY = gsap.quickTo(containerRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 20;
      const yPos = (e.clientY / innerHeight - 0.5) * 20;
      moveX(xPos);
      moveY(yPos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-20 overflow-hidden"
    >
      {/* Hero glow behind text */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,122,0,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div ref={containerRef} className="flex flex-col items-center relative z-10 will-change-transform">
        {/* Badge */}
        <div className="hero-badge mb-8 relative group cursor-default">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium tracking-wider uppercase backdrop-blur-md"
            style={{
              background: "rgba(255,122,0,0.08)",
              border: "1px solid rgba(255,122,0,0.2)",
              color: "#ff7a00",
              boxShadow: "0 4px 15px rgba(255,122,0,0.1)"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff7a00] animate-pulse" />
            Open Source Android Toolkit
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title text-center will-change-transform">
          <span
            className="block text-[clamp(3.5rem,10vw,8rem)] font-black tracking-[-0.04em] leading-[0.9]"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PATCH
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ff7a00 0%, #ff9a40 50%, #ffb060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              WORK
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-6 text-center text-[clamp(1rem,2.5vw,1.35rem)] text-white/50 font-light max-w-lg tracking-wide will-change-transform">
          Android Device Power Toolkit
        </p>

        {/* Download Counter Badge */}
        <DownloadBadge />

        {/* CTA Buttons */}
        <div className="hero-buttons mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 items-center will-change-transform">
          {/* Primary Button */}
          <Link
            href="https://github.com/brittytino/patchwork/releases/latest"
            target="_blank"
            className="btn-ripple group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-[15px] font-semibold text-black transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,122,0,0.3)] active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #ff7a00, #ff9a40)",
              boxShadow:
                "0 0 30px rgba(255,122,0,0.3), 0 8px 32px rgba(255,122,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download APK
            <span className="text-black/50 text-[12px] font-normal">v2.0</span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="https://github.com/brittytino/patchwork"
            target="_blank"
            className="btn-ripple group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-[15px] font-semibold text-white/80 hover:text-white transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-white/5 active:translate-y-0 backdrop-blur-md"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5 backdrop-blur-sm">
          <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-[#ff7a00]" />
        </div>
      </div>
    </section>
  );
}
