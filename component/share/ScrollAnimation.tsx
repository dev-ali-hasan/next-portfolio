"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: ReactNode;
}

export default function ScrollAnimation({
  children,
}: ScrollAnimationProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // reduced motion support
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []); // ✅ ALWAYS empty, no change between renders

  return <div ref={elRef}>{children}</div>;
}
