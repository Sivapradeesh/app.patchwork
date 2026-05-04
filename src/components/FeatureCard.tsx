"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
}

export default function FeatureCard({ feature, idx }: { feature: FeatureProps, idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    
    // Mouse hover tracking for glow effect
    const cardInner = card.querySelector('.card-inner');
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if(cardInner) {
          (cardInner as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
          (cardInner as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };
    
    // GSAP Hover animations
    const handleMouseEnter = () => {
      gsap.to(card, { y: -8, borderColor: "rgba(255,122,0,0.25)", duration: 0.3, ease: "power2.out" });
    };
    const handleMouseLeave = () => {
      gsap.to(card, { y: 0, borderColor: "rgba(255,255,255,0.05)", duration: 0.4, ease: "power2.out" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="feature-grid-card opacity-0 will-change-transform relative group rounded-2xl p-6 md:p-8 h-full cursor-default transition-colors duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
      <div className="card-inner absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,122,0,0.08), transparent 40%)",
          }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-[#ff7a00]/10"
            style={{
              background: "rgba(255,122,0,0.06)",
              border: "1px solid rgba(255,122,0,0.15)",
            }}
          >
            {feature.icon}
          </div>
          <div className="text-right">
            <div className="text-[24px] font-bold text-white/90">
              {feature.stat}
            </div>
            <div className="text-[11px] text-white/30 uppercase tracking-wider">
              {feature.statLabel}
            </div>
          </div>
        </div>

        <h3 className="text-[18px] font-semibold text-white/90 mb-2">
          {feature.title}
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
