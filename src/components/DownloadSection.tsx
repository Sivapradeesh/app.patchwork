"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DownloadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || !cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
      }
    });

    // Animate the whole card scaling up
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out" }
    );

    // Icon pulse
    const icon = cardRef.current.querySelector('.cta-icon');
    gsap.to(icon, {
      boxShadow: "0 0 40px rgba(255,122,0,0.4)",
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Stagger stats
    const stats = gsap.utils.toArray<HTMLElement>('.stat-item', cardRef.current);
    tl.fromTo(stats,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: ref });

  return (
    <section id="download" ref={ref} className="relative py-24 md:py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Glow background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,122,0,0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div
          ref={cardRef}
          className="relative will-change-transform opacity-0"
        >
          {/* Decorative border card */}
          <div
            className="rounded-3xl p-[1px] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,122,0,0.3), rgba(255,122,0,0.05), rgba(120,60,200,0.1))",
            }}
          >
            <div
              className="rounded-3xl px-8 py-16 md:px-16 md:py-24"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10,10,15,0.95), rgba(15,15,22,0.95))",
              }}
            >
              <div
                className="cta-icon inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #ff7a00, #ff9a40)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>

              <h2
                className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-tight mb-4"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ready to take control?
              </h2>

              <p className="text-white/40 text-[16px] max-w-md mx-auto mb-10">
                Download Patchwork and unlock the full potential of your Android
                device. Free, open source, forever.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                  Download Latest APK
                </Link>

                <Link
                  href="https://github.com/brittytino/patchwork"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-[14px] font-medium text-white/50 hover:text-white/80 transition-all hover:-translate-y-1 hover:bg-white/5 active:translate-y-0"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Star on GitHub
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                  { value: "50+", label: "Features" },
                  { value: "2.8k", label: "Downloads" },
                  { value: "100%", label: "Free & Open Source" },
                ].map((stat, i) => (
                  <div key={i} className="stat-item text-center opacity-0 will-change-transform">
                    <div className="text-[24px] font-bold text-white/80">
                      {stat.value}
                    </div>
                    <div className="text-[12px] text-white/30 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
