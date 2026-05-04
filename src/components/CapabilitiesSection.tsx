"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  {
    category: "Automation",
    items: [
      "Task Scheduler",
      "App Auto-Start",
      "Trigger Actions",
      "Profile Switching",
      "Battery Rules",
      "Connectivity Rules",
    ],
  },
  {
    category: "Security",
    items: [
      "App Lock",
      "Intruder Detection",
      "Fake Crash Screen",
      "USB Debugging Guard",
      "Permission Monitor",
      "Vault Storage",
    ],
  },
  {
    category: "Customization",
    items: [
      "Status Bar Tweaks",
      "Navigation Gestures",
      "Quick Settings Tiles",
      "Font Override",
      "Icon Pack Support",
      "Force Dark Mode",
    ],
  },
  {
    category: "Performance",
    items: [
      "Battery Monitor",
      "RAM Optimizer",
      "CPU Governor",
      "Thermal Monitor",
      "Wake Lock Control",
      "Network Throttle",
    ],
  },
];

export default function CapabilitiesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
      }
    });

    tl.fromTo(".cap-header", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    const cards = gsap.utils.toArray<HTMLElement>('.cap-card');
    
    tl.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.1)" },
      "-=0.4"
    );

    // Stagger list items inside each card after card appears
    cards.forEach((card) => {
      const items = gsap.utils.toArray<HTMLElement>('li', card);
      gsap.fromTo(items,
        { opacity: 0, x: -10 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        }
      );
    });

  }, { scope: ref });

  return (
    <section ref={ref} className="relative py-24 md:py-40 px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,122,0,0.2), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="cap-header text-center mb-20 will-change-transform opacity-0">
          <span
            className="inline-block text-[12px] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#ff7a00" }}
          >
            Capabilities
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
            Built for power users
          </h2>
          <p className="mt-4 text-white/40 text-[16px] max-w-md mx-auto">
            Every feature is carefully crafted to give you unprecedented control
            over your device.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="cap-card opacity-0 will-change-transform rounded-2xl p-6 group hover:border-[rgba(255,122,0,0.2)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-125 duration-300"
                  style={{
                    background: "#ff7a00",
                    boxShadow: "0 0 10px rgba(255,122,0,0.4)",
                  }}
                />
                <h3 className="text-[15px] font-semibold text-white/80">
                  {cap.category}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {cap.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[13px] text-white/40 group-hover:text-white/60 transition-colors opacity-0"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,122,0,0.5)"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
