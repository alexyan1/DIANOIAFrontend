import { StarField } from "./star-field";

export function SpaceBackground({ children }: { children?: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden grid-bg"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #050510 60%, #000 100%)" }}>
      <StarField />
      {children}
    </main>
  );
}
