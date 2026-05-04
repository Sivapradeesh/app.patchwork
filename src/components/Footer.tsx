"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative px-6 pt-16 pb-8">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff7a00, #ff9a40)",
                boxShadow: "0 0 20px rgba(255,122,0,0.2)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
                <rect x="9" y="1" width="6" height="6" rx="1" fill="white" opacity="0.7" />
                <rect x="1" y="9" width="6" height="6" rx="1" fill="white" opacity="0.7" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="white" opacity="0.4" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-wide text-white/60">
              PATCHWORK
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              href="https://github.com/brittytino/patchwork"
              target="_blank"
              className="text-[13px] text-white/30 hover:text-white/60 transition-colors nav-link-hover relative"
            >
              GitHub
            </Link>
            <Link
              href="https://github.com/brittytino/patchwork/releases"
              target="_blank"
              className="text-[13px] text-white/30 hover:text-white/60 transition-colors nav-link-hover relative"
            >
              Releases
            </Link>
            <Link
              href="https://github.com/brittytino/patchwork/issues"
              target="_blank"
              className="text-[13px] text-white/30 hover:text-white/60 transition-colors nav-link-hover relative"
            >
              Issues
            </Link>
            <Link
              href="https://github.com/brittytino/patchwork/blob/main/LICENSE"
              target="_blank"
              className="text-[13px] text-white/30 hover:text-white/60 transition-colors nav-link-hover relative"
            >
              License
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20">
            © {new Date().getFullYear()} Patchwork. Open source under MIT
            License.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-white/20">v2.0.0</span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5 text-[12px] text-white/20">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  background: "#22c55e",
                  boxShadow: "0 0 6px rgba(34,197,94,0.4)",
                }}
              />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
