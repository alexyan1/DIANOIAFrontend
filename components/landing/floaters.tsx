"use client";

const FLOATERS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  sym: ["∑", "λ", "∞", "Δ", "Ω", "Φ", "Ψ", "π", "μ", "∇", "∂", "∫", "⊕", "⊗", "∀", "∃"][i % 16],
  x: Math.random() < 0.5 ? Math.random() * 22 : Math.random() * 22 + 78,
  size: Math.random() * 18 + 10,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 15,
  opacity: Math.random() * 0.07 + 0.03,
}));

export function Floaters() {
  return (
    <>
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
    </>
  );
}
