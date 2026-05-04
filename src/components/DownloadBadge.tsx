"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function AnimatedCounter({ target }: { target: number }) {
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!countRef.current) return;
    
    gsap.fromTo(
      countRef.current,
      { innerHTML: "0" },
      {
        innerHTML: target.toString(),
        duration: 2.5,
        delay: 0.8,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        onUpdate: function() {
          if (countRef.current) {
            const val = Math.round(Number(this.targets()[0].innerHTML));
            countRef.current.innerHTML = val.toLocaleString();
          }
        }
      }
    );
  });

  return <span ref={countRef} className="tabular-nums">0</span>;
}

export default function DownloadBadge() {
  return (
    <div className="hero-counter mt-8 will-change-transform transition-transform hover:scale-105 duration-300">
      <div
        className="counter-border inline-flex items-center rounded-lg overflow-hidden backdrop-blur-md"
        style={{
          border: "1px solid rgba(255,122,0,0.3)",
          boxShadow: "0 0 15px rgba(255,122,0,0.15)"
        }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 bg-black/80">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="text-[12px] font-semibold text-white/70 uppercase tracking-wider">
            Downloads
          </span>
        </div>
        <div className="px-4 py-2.5 relative overflow-hidden" style={{ background: "rgba(255,122,0,0.15)" }}>
          <div className="absolute inset-0 shimmer opacity-50" />
          <span className="relative text-[14px] font-bold text-[#ff7a00]">
            <AnimatedCounter target={2847} />
            <span className="text-[#ff7a00]/60">+</span>
          </span>
        </div>
      </div>
    </div>
  );
}
