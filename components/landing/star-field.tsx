"use client";

const STARS = Array.from({ length: 250 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() < 0.15 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5,
  duration: Math.random() * 5 + 2,
  delay: Math.random() * 8,
  color: ["#ffffff", "#ffffff", "#ffffff", "#c7d2fe", "#fde68a", "#bfdbfe"][Math.floor(Math.random() * 6)],
}));

export function StarField() {
  return (
    <>
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
    </>
  );
}
