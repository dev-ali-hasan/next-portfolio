"use client";

import { services } from "@/content/services";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSection from "../share/CardSection";

gsap.registerPlugin(ScrollTrigger);

function ServicesSection() {
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
    <section className="relative w-full py-10 md:py-24 px-4 md:px-8 bg-(--bg-primary)">
      <div className="absolute inset-0 bg-linear-to-br from-[#9ED83F]/20 via-blue-500/10 to-(--bg-tertiary)/50" />

      <div className="container relative z-10">
        <div className="space-y-4 mb-16 text-center">
          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold"
          >
            Services & Expertise
          </span>

          <p
            ref={descriptionRef}
            className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-4xl mx-auto"
          >
            Comprehensive frontend development services tailored to your project
            needs. From UI implementation to full-stack solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <CardSection
              key={service.title}
              ref={(el: HTMLDivElement | null) => {
                if (el) itemsRef.current[idx] = el;
              }}
              title={service.title}
              description={service.description}
              features={service.features}
              Icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
