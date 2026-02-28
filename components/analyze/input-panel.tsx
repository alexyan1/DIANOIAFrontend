"use client";

import * as React from "react";

type InputPanelProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function InputPanel({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Paste an argument…",
}: InputPanelProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!disabled && value.trim()) onSubmit();
    }
  }

  return (
    <div className="w-full">
      <div
        className="
          flex items-center gap-2
          rounded-2xl border border-white/10 bg-white/[0.06]
          px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]
          backdrop-blur
        "
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="
            w-full resize-none bg-transparent outline-none
            text-white/90 placeholder:text-white/60
            max-h-56 overflow-y-auto
            leading-6
          "
        />

        <button
          type="button"
          onClick={() => value.trim() && onSubmit()}
          disabled={disabled || !value.trim()}
          className="
            h-10 w-10 shrink-0 rounded-xl
            border border-white/10 bg-white/[0.08]
            text-white transition
            hover:bg-white/[0.12]
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center
            leading-none
          "
          aria-label="Send"
          title="Send"
        >
          <span className="leading-none">➤</span>
        </button>
      </div>


    </div>
  );
}