"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 will-change-transform"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
        <div
          className="flex items-center justify-between rounded-2xl px-4 md:px-6 py-3"
          style={{
            background: "rgba(10, 10, 15, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff7a00, #ff9a40)",
                boxShadow: "0 0 20px rgba(255,122,0,0.3)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white"
              >
                <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                <rect x="9" y="1" width="6" height="6" rx="1" fill="white" opacity="0.7" />
                <rect x="1" y="9" width="6" height="6" rx="1" fill="white" opacity="0.7" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="white" opacity="0.4" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
              PATCHWORK
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Download", "GitHub"].map((item) => (
              <Link
                key={item}
                href={item === "GitHub" ? "https://github.com/brittytino/patchwork" : `#${item.toLowerCase()}`}
                target={item === "GitHub" ? "_blank" : undefined}
                className="text-[13px] text-white/50 hover:text-white/90 transition-colors font-medium tracking-wide nav-link-hover relative"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="https://github.com/brittytino/patchwork/releases/latest"
            target="_blank"
            className="btn-ripple relative px-4 md:px-5 py-2 rounded-xl text-[13px] font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,122,0,0.2)]"
            style={{
              background: "linear-gradient(135deg, #ff7a00, #ff9a40)",
              boxShadow:
                "0 0 20px rgba(255,122,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            Get App
          </Link>
        </div>
      </div>
    </nav>
  );
}
