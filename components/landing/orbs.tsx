"use client";

export function Orbs() {
  return (
    <>
      {/* colored glow behind content */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#f43f5e,transparent)", animation: "spin-slow 8s ease-in-out infinite" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#818cf8,transparent)", animation: "spin-slow-rev 10s ease-in-out infinite" }} />

      {/* spinning rings */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-fuchsia-500/20 pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "spin-slow 12s linear infinite" }} />
      <div className="absolute w-[720px] h-[720px] rounded-full border border-indigo-500/15 pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderStyle: "dashed", animation: "spin-slow-rev 18s linear infinite" }} />
    </>
  );
}
