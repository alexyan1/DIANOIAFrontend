"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_ANALYSES = [
  { id: 1, title: "Climate policy argument", time: "2h ago", status: "3 fallacies" },
  { id: 2, title: "Trolley problem debate", time: "Yesterday", status: "coherent" },
  { id: 3, title: "Free will vs determinism", time: "3d ago", status: "2 repairs" },
];

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* toggle button for dashboard */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        animate={{ left: open ? 320 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[42%] -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-1.5 py-5 px-2 rounded-r-xl bg-black/50 backdrop-blur hover:bg-black/70 transition-colors duration-200 group border-t border-r border-b border-fuchsia-400/50"
        style={{ boxShadow: "0 0 24px rgba(232,121,249,0.25), 0 0 8px rgba(232,121,249,0.15)" }}
        aria-label="Toggle dashboard"
      >
        <span className="block w-4 h-px bg-white/70 group-hover:bg-fuchsia-300 transition-colors duration-200" />
        <span className="block w-4 h-px bg-white/70 group-hover:bg-fuchsia-300 transition-colors duration-200" />
        <span className="block w-4 h-px bg-white/70 group-hover:bg-fuchsia-300 transition-colors duration-200" />
      </motion.button>

      {/* background */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 h-full w-80 z-50 flex flex-col backdrop-blur-2xl bg-black/30"
          >
            {/* right gradient border */}
            <div className="absolute top-0 right-0 w-[2px] h-full pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent 0%, #e879f9 25%, #c084fc 50%, #818cf8 75%, transparent 100%)", filter: "brightness(1.4)" }} />

            {/* header */}
            <div className="px-5 pt-7 pb-4 relative">
              {/* header bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #e879f9, #c084fc, #818cf8, transparent)", filter: "brightness(1.4)" }} />
              <p
                className="font-serif text-2xl text-white"
                style={{
                  textShadow: "0 0 40px rgba(255,255,255,0.2)",
                  animation: "flicker 3s infinite",
                }}
              >
                DIANOIA
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-white/70">
                Analysis history
              </p>
            </div>  

            {/* analysis list */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {MOCK_ANALYSES.map((a) => (
                <button
                  key={a.id}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-colors duration-150 group"
                >
                  <p className="font-serif text-m text-white/80 group-hover:text-white transition-colors duration-150 truncate">
                    {a.title}
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-mono text-[10px] text-white/70">{a.time}</span>
                    <span className="font-mono text-[10px] text-fuchsia-400/90">{a.status}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* footer */}
            <div className="px-5 py-4 relative">
              {/* footer line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #e879f9, #c084fc, #818cf8, transparent)", filter: "brightness(1.4)" }} />
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/70">
                Established 2026
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
