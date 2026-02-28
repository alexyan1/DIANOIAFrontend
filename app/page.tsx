"use client";
/* comments in code reflect what each part does, read it and try and figure out how it works */

/* star randomization + attributes */
const STARS = Array.from({ length: 250 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() < 0.15 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5,
  duration: Math.random() * 5 + 2,
  delay: Math.random() * 8,
  color: ["#ffffff", "#ffffff", "#ffffff", "#c7d2fe", "#fde68a", "#bfdbfe"][Math.floor(Math.random() * 6)],
}));


/* greek letter randomization + attributes */
const FLOATERS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  sym: ["∑", "λ", "∞", "Δ", "Ω", "Φ", "Ψ", "π", "μ", "∇", "∂", "∫", "⊕", "⊗", "∀", "∃"][i % 16],
  x: Math.random() < 0.5 ? Math.random() * 22 : Math.random() * 22 + 78,
  size: Math.random() * 18 + 10,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 15,
  opacity: Math.random() * 0.07 + 0.03,
}));

export default function Home() {
  return (
    <>
    { /*  animatins */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes flicker {
          0%,89%,91%,95%,100% { opacity:1; }
          90% { opacity:0.3; }
          93% { opacity:0.7; }
          96% { opacity:0.5; }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.4; transform:scale(1); }
          50% { opacity:1; transform:scale(1.6); }
        }
        @keyframes drift {
          0% { transform:translateY(100vh); opacity:0; }
          8% { opacity:1; }
          92% { opacity:1; }
          100% { transform:translateY(-10vh); opacity:0; }
        }
        @keyframes spin-slow { to { transform:rotate(360deg); } }
        @keyframes spin-slow-rev { to { transform:rotate(-360deg); } }
        @keyframes glitch {
          0%,94%,100% { clip-path:none; transform:none; }
          95% { clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%); transform:translate(-4px,0); }
          96% { clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%); transform:translate(4px,0); }
          98% { clip-path:polygon(0 10%,100% 10%,100% 30%,0 30%); transform:translate(-2px,0); color:#f43f5e; }
          99% { clip-path:none; transform:none; }
        }
        .shimmer-text {
          background: linear-gradient(90deg,#f43f5e 0%,#e879f9 25%,#818cf8 50%,#e879f9 75%,#f43f5e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #050510 60%, #000 100%)" }}>

        {/* stars */}
        {STARS.map(s => (
          <div key={s.id} className="absolute rounded-full pointer-events-none"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              background: s.color,
              boxShadow: s.size > 2 ? `0 0 ${s.size * 3}px ${s.color}` : "none",
              animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            }} />
        ))}

        {/* greek letters */}
        {FLOATERS.map(f => (
          <div key={f.id} className="absolute pointer-events-none select-none font-bold"
            style={{
              left: `${f.x}%`,
              fontSize: f.size,
              opacity: f.opacity,
              color: "#c084fc",
              animation: `drift ${f.duration}s ${f.delay}s linear infinite`,
            }}>
            {f.sym}
          </div>
        ))}

        {/* colored glow behind content */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#f43f5e,transparent)", animation: "spin-slow 8s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#818cf8,transparent)", animation: "spin-slow-rev 10s ease-in-out infinite" }} />

        {/* spinning ring */}
        <div className="absolute w-[520px] h-[520px] rounded-full border border-fuchsia-500/20 pointer-events-none"
          style={{ top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"spin-slow 12s linear infinite" }} />
        <div className="absolute w-[720px] h-[720px] rounded-full border border-indigo-500/15 pointer-events-none"
          style={{ top:"50%", left:"50%", transform:"translate(-50%,-50%)", borderStyle:"dashed", animation:"spin-slow-rev 18s linear infinite" }} />

        {/* main content */}
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

      </main>
    </>
  );
}
