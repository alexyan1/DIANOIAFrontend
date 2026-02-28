"use client";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analyze",   label: "Analyze"   },
  { href: "/about",     label: "About"     },
];

export function HeroText() {
  return (
    <div className="relative text-center px-8">
      <p className="text-white font-serif tracking-tighter italic"
        style={{
          fontSize: "clamp(6rem,18vw,14rem)",
          textShadow: "0 0 80px rgba(255,255,255,0.3), 0 0 160px rgba(255,255,255,0.1)",
          animation: "flicker 2.5s infinite, glitch 7s infinite",
        }}>
        DIANOIA
      </p>
      <div className="h-px w-full my-4"
        style={{ background: "linear-gradient(90deg,transparent,#e879f9,#818cf8,transparent)" }} />
      <p className="shimmer-text font-serif tracking-tighter"
        style={{ fontSize: "clamp(1rem,4vw,2rem)" }}>
        Paste an argument. DIANOIA builds the graph and finds where it doesn't cohere.
      </p>

      {/* CTA */}
      <Link href="/analyze"
        className="inline-block mt-8 px-8 py-3 rounded-full font-mono text-sm tracking-widest uppercase text-white border border-white/20 hover:border-fuchsia-400/60 hover:text-fuchsia-300 transition-colors duration-300">
        Start Analysis →
      </Link>

      {/* Nav links */}
      <div className="flex items-center justify-center gap-8 mt-10">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href}
            className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors duration-300">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
