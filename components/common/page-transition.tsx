"use client";

import { AnimatePresence } from "framer-motion";

// Sits in layout.tsx (persists across routes) and catches template.tsx unmounting.
// template.tsx is the actual motion element — it remounts on every navigation.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
}
