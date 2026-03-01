import { StarField } from "@/components/landing/star-field";
import { Floaters } from "@/components/landing/floaters";
import { Orbs } from "@/components/landing/orbs";
import { HeroText } from "@/components/landing/hero-text";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #050510 60%, #000 100%)" }}>
      <StarField />
      <Orbs />
      <HeroText />
      
    </main>
  );
}
