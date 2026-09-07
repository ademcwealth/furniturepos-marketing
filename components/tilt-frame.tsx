"use client";

import { useCallback, useRef } from "react";
import { useClientValue } from "@/lib/use-client-value";

/**
 * Subtle cursor-following tilt for the hero screenshot. Fine pointers only, off when the
 * visitor prefers reduced motion. Never touches scrolling, never plays sound.
 */
export function TiltFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useClientValue(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    false,
  );

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || !enabled) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform 80ms linear";
      el.style.transform = `perspective(1400px) rotateY(${px * 6}deg) rotateX(${-py * 5}deg)`;
    },
    [enabled],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 500ms cubic-bezier(.2,.8,.2,1)";
    el.style.transform = "perspective(1400px) rotateY(-4deg) rotateX(2deg)";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={
        enabled
          ? { transform: "perspective(1400px) rotateY(-4deg) rotateX(2deg)", transformStyle: "preserve-3d" }
          : undefined
      }
    >
      {children}
    </div>
  );
}
