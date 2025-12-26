"use client";

import { workStyles } from "@/content/workStyles";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

function WorkStyleSection() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const itemsRef = useRef<HTMLDivElement[]>([]);

  useHoverAnimation({ titleRef, descriptionRef });

  useLayoutEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (!items.length) return;

    items.forEach((item) => {
      gsap.fromTo(
        item,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="relative w-full py-10 md:py-24 px-4 md:px-8 bg-(--bg-secondary)">
      <div className="max-w-6xl mx-auto text-(--text-primary)">
        <div className="space-y-4 mb-10 text-center">
          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold block text-center"
          >
            How I Work
          </span>
          <p
            ref={descriptionRef}
            className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-4xl mx-auto"
          >
            My approach to collaboration ensures smooth projects and successful
            outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workStyles.map((style, idx) => {
            const Icon = style.icon;
            return (
              <div
                key={style.title}
                ref={(el: HTMLDivElement | null) => {
                  if (el) itemsRef.current[idx] = el;
                }}
                className="relative group bg-(--bg-tertiary)/10 hover:bg-(--bg-tertiary)/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-(--border-secondary) transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-(--text-tertiary)/30 group-hover:text-(--text-tertiary)/50 transition-colors">
                  {style.number}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex p-3 bg-(--bg-tertiary)/10 rounded-lg">
                    <Icon className="w-6 h-6 text-(--text-tertiary)" />
                  </div>

                  <div className="space-y-3">
                    <div className="text-2xl font-bold">{style.title}</div>
                    <p className="text-(--text-muted) leading-relaxed text-lg">
                      {style.description}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-(--bg-tertiary) opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default WorkStyleSection;
