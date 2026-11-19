"use client";

import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  /** Text, ktorý sa skopíruje do schránky. */
  value: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
  className?: string;
};

type Status = "idle" | "copied" | "failed";

export function CopyButton({ value, label, copiedLabel, failedLabel, className }: CopyButtonProps) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const text = status === "copied" ? copiedLabel : status === "failed" ? failedLabel : label;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
          status === "copied"
            ? "border-brand-strong bg-brand-strong text-white"
            : "border-white/20 text-white hover:border-brand-light hover:text-brand-light",
          className,
        )}
      >
        {status === "copied" ? (
          <Check aria-hidden="true" className="size-4" />
        ) : status === "failed" ? (
          <X aria-hidden="true" className="size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        {text}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? copiedLabel : status === "failed" ? failedLabel : ""}
      </span>
    </>
  );
}
