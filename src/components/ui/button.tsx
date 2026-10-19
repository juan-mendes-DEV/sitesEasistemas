"use client";

import * as React from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-base font-semibold",
};

const variants: Record<string, string> = {
  primary:
    "bg-gold text-[#0B0A10] hover:bg-gold-soft transition-cm rounded-full font-semibold shadow-[0_0_20px_rgba(212,175,112,0.35)] hover:shadow-[0_0_30px_rgba(212,175,112,0.5)]",
  secondary:
    "bg-violet text-white hover:bg-violet-soft transition-cm rounded-full font-semibold shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
  outline:
    "border border-gold/50 text-gold hover:bg-gold hover:text-[#0B0A10] transition-cm rounded-full font-semibold",
  ghost:
    "text-text-secondary hover:text-violet transition-cm rounded-full font-semibold",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full transition-cm focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      ].filter(Boolean).join("")}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="text-current"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
