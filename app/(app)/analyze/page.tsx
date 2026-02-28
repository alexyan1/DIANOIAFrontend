"use client";

import * as React from "react";
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <div className="text-left">


            <div className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            What's your Argument?
            </div>

            <div className="mt-2 font-mono text-sm tracking-widest uppercase text-white/80">
              We will check if the logic follows.
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
