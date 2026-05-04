"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ToggleSwitch({ on, label }: { on: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-white/60">{label}</span>
      <div
        className={`w-9 h-5 rounded-full relative transition-colors ${on ? "bg-[#ff7a00]" : "bg-white/10"}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "left-[18px]" : "left-0.5"}`}
        />
      </div>
    </div>
  );
}

function MiniChart() {
  const bars = [40, 65, 35, 80, 55, 70, 45, 90, 60, 75];
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!chartRef.current) return;
    const barElements = gsap.utils.toArray<HTMLElement>('.mini-bar', chartRef.current);
    
    gsap.fromTo(barElements, 
      { height: 0 },
      { 
        height: (i) => `${bars[i]}%`, 
        duration: 0.8, 
        stagger: 0.05, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 80%"
        }
      }
    );
  }, { scope: chartRef });

  return (
    <div ref={chartRef} className="flex items-end gap-[3px] h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className="mini-bar w-[4px] rounded-full"
          style={{
            background:
              h > 70
                ? "linear-gradient(to top, #ff7a00, #ff9a40)"
                : "rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  );
}

export default function DeviceMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const featureCards = [
    {
      title: "Automation Engine",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.36 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
      position: "left-top",
      delay: 0.3,
    },
    {
      title: "Battery Monitor",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2">
          <rect x="1" y="6" width="18" height="12" rx="2" />
          <line x1="23" y1="10" x2="23" y2="14" />
          <line x1="7" y1="10" x2="7" y2="14" />
          <line x1="11" y1="10" x2="11" y2="14" />
        </svg>
      ),
      position: "right-top",
      delay: 0.5,
    },
    {
      title: "App Lock",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      position: "left-bottom",
      delay: 0.7,
    },
    {
      title: "Status Bar",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2">
          <rect x="2" y="3" width="20" height="4" rx="1" />
          <rect x="2" y="9" width="20" height="12" rx="1" opacity="0.3" />
        </svg>
      ),
      position: "right-bottom",
      delay: 0.9,
    },
    {
      title: "Quick Tiles",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2">
          <rect x="2" y="2" width="8" height="8" rx="1" />
          <rect x="14" y="2" width="8" height="8" rx="1" />
          <rect x="2" y="14" width="8" height="8" rx="1" />
          <rect x="14" y="14" width="8" height="8" rx="1" />
        </svg>
      ),
      position: "right-center",
      delay: 1.1,
    },
  ];

  const getCardPosition = (pos: string) => {
    switch (pos) {
      case "left-top":
        return "top-[5%] -left-[10%] md:-left-[30%]";
      case "right-top":
        return "top-[10%] -right-[10%] md:-right-[30%]";
      case "left-bottom":
        return "bottom-[15%] -left-[10%] md:-left-[28%]";
      case "right-bottom":
        return "bottom-[10%] -right-[10%] md:-right-[28%]";
      case "right-center":
        return "top-[45%] -right-[5%] md:-right-[32%]";
      default:
        return "";
    }
  };

  useGSAP(() => {
    if (!containerRef.current || !phoneWrapperRef.current || !phoneFrameRef.current) return;

    // Scroll parallax & scale for the entire container
    gsap.to(phoneWrapperRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
      y: -80,
      scale: 0.9,
      ease: "power1.inOut",
    });

    // 3D Parallax Mouse Effect
    const xTo = gsap.quickTo(phoneFrameRef.current, "rotationY", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(phoneFrameRef.current, "rotationX", { duration: 0.8, ease: "power3" });
    const highlightXTo = gsap.quickTo(highlightRef.current, "x", { duration: 0.5, ease: "power2" });
    const highlightYTo = gsap.quickTo(highlightRef.current, "y", { duration: 0.5, ease: "power2" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate normalized position -1 to 1
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Limit rotation
      xTo(normX * 12);
      yTo(-normY * 12);
      
      // Move reflection opposite to rotation
      highlightXTo(normX * -100);
      highlightYTo(normY * -100);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      highlightXTo(0);
      highlightYTo(0);
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    // Continuous floating for the phone
    gsap.to(phoneFrameRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animate internal UI elements on scroll
    const uiElements = gsap.utils.toArray<HTMLElement>('.ui-element', phoneFrameRef.current);
    uiElements.forEach((el, index) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.2 + index * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%"
          }
        }
      );
    });

    // Feature Cards Animations
    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
    cards.forEach((card, index) => {
      // Entrance
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, x: index % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
          delay: featureCards[index].delay + 0.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%"
          }
        }
      );

      // Continuous float with different timings
      gsap.to(card, {
        y: -10 + (Math.random() * -10),
        duration: 3 + Math.random() * 2,
        delay: Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Hover interactions
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.08,
          boxShadow: "0 15px 40px rgba(255,122,0,0.2)",
          borderColor: "rgba(255,122,0,0.4)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          borderColor: "rgba(255,255,255,0.06)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 flex items-center justify-center overflow-visible"
      style={{ perspective: "1500px" }}
    >
      <div ref={phoneWrapperRef} className="relative flex items-center justify-center will-change-transform">
        {/* Phone Mockup */}
        <div
          ref={phoneFrameRef}
          className="relative z-10 will-change-transform transform-style-3d"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px] md:w-[320px] md:h-[640px] rounded-[40px] p-[3px] overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
              boxShadow: `
                0 0 80px rgba(255,122,0,0.1),
                0 40px 80px rgba(0,0,0,0.5),
                inset 0 0 0 1px rgba(255,255,255,0.05)
              `,
            }}
          >
            {/* Reflective highlight layer */}
            <div 
              ref={highlightRef}
              className="absolute inset-[-100%] z-50 pointer-events-none mix-blend-overlay opacity-30"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 40%)"
              }}
            />
            
            {/* Inner bezel */}
            <div
              className="w-full h-full rounded-[38px] overflow-hidden relative"
              style={{
                background: "linear-gradient(180deg, #0a0a12 0%, #080810 100%)",
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2 z-20 relative">
                <span className="text-[11px] text-white/40 font-medium">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 rounded-sm border border-white/30 relative">
                    <div className="absolute inset-0.5 bg-[#ff7a00] rounded-[1px]" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />

              {/* App content inside phone */}
              <div className="px-4 pt-4 space-y-3 z-10 relative">
                {/* App header */}
                <div className="ui-element flex items-center gap-2 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #ff7a00, #ff9a40)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
                      <rect x="1" y="1" width="6" height="6" rx="1" />
                      <rect x="9" y="1" width="6" height="6" rx="1" opacity="0.7" />
                      <rect x="1" y="9" width="6" height="6" rx="1" opacity="0.7" />
                      <rect x="9" y="9" width="6" height="6" rx="1" opacity="0.4" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-white/80">Patchwork</span>
                </div>

                {/* Quick tiles grid */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "WiFi", active: true },
                    { label: "BT", active: false },
                    { label: "GPS", active: true },
                    { label: "Auto", active: true },
                  ].map((tile, i) => (
                    <div
                      key={i}
                      className="ui-element flex flex-col items-center gap-1 py-2 rounded-xl"
                      style={{
                        background: tile.active
                          ? "rgba(255,122,0,0.15)"
                          : "rgba(255,255,255,0.04)",
                        border: tile.active
                          ? "1px solid rgba(255,122,0,0.2)"
                          : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${tile.active ? "bg-[#ff7a00]" : "bg-white/10"}`}
                      >
                        <div className={`w-2 h-2 rounded-full ${tile.active ? "bg-white" : "bg-white/30"}`} />
                      </div>
                      <span className={`text-[8px] ${tile.active ? "text-[#ff7a00]" : "text-white/30"}`}>
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Battery card */}
                <div
                  className="ui-element rounded-xl p-3 backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Battery Health</span>
                    <span className="text-[14px] font-bold text-[#ff7a00]">87%</span>
                  </div>
                  <MiniChart />
                </div>

                {/* Toggle settings */}
                <div
                  className="ui-element rounded-xl p-3 space-y-2.5 backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <ToggleSwitch on={true} label="App Lock" />
                  <ToggleSwitch on={true} label="Auto Brightness" />
                  <ToggleSwitch on={false} label="Force Dark Mode" />
                </div>

                {/* Automation workflow */}
                <div
                  className="ui-element rounded-xl p-3 backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">
                    Active Workflows
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {["#ff7a00", "#8b5cf6", "#10b981"].map((c, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border-2 border-[#0a0a12]"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-white/40">3 running</span>
                  </div>
                </div>
              </div>

              {/* Diagonal Light reflection line */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)",
                }}
              />
            </div>
          </div>

          {/* Phone shadow */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full z-0"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,122,0,0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: "translateZ(-50px)" // Push behind in 3D space
            }}
          />
        </div>

        {/* Floating Feature Cards */}
        {featureCards.map((card, idx) => (
          <div
            key={idx}
            className={`feature-card absolute ${getCardPosition(card.position)} z-20 hidden md:block opacity-0`}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
          >
            <div
              className="cursor-default px-5 py-4 rounded-2xl flex items-center gap-3 min-w-[170px] transition-colors duration-300"
              style={{
                background: "rgba(15, 15, 22, 0.65)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: "rgba(255,122,0,0.1)",
                  border: "1px solid rgba(255,122,0,0.15)",
                }}
              >
                {card.icon}
              </div>
              <span className="text-[13px] font-medium text-white/80">
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
