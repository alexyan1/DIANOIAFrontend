"use client";

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
        u guys are getting no credit 4 this :p
      </p>
      <p className="text-white/80 font-mono text-xs mt-6 tracking-widest uppercase">
        turn ur brightness up
      </p>
    </div>
  );
}
