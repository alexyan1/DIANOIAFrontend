"use client";
import * as React from "react";
import Link from "next/link";
import { StarField } from "@/components/landing/star-field";
import InputPanel from "@/components/analyze/input-panel";
import { Orbs } from "@/components/landing/orbs";

export default function AnalyzePage() {
  const [input, setInput] = React.useState("");
  return (
    <main
      className="relative min-h-screen overflow-hidden grid-bg"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #050510 60%, #000 100%)",
      }}
    >
      <StarField />
      <Orbs />

      <Link
        href="/"
        scroll={false}
        className="absolute top-7 left-8 z-20 group font-mono text-base tracking-[0.2em] uppercase text-white/80 hover:text-fuchsia-300 transition-colors duration-300"
      >
        <span className="group-hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all duration-300">
          ← DIANOIA
        </span>
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <div className="text-left">
            <div className="text-white font-serif text-4xl sm:text-5xl font-semibold tracking-tight"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.3), 0 0 160px rgba(255,255,255,0.1)", animation: "glitch 7s infinite"}}>
              What's your Argument?
            </div>
            <div className="mt-10 ml-1 font-mono text-sm tracking-widest text-white/80">
              DIANOIA checks if the logic follows.
            </div>
          </div>
          <div className="mt-2 font-mono text-sm tracking-widest uppercase text-white/80">
            <InputPanel
              value={input}
              onChange={setInput}
              onSubmit={() => {
                console.log("submitted:", input);
                setInput("");
              }}
              placeholder="Paste an argument, debate transcript, or set of claims…"
            />
          </div>
          <div className="mt-2 font-mono text-sm tracking-widest uppercase text-white/40">
          Press Enter to send
          </div>
        </div>
      </div>
    </main>
  );
}
