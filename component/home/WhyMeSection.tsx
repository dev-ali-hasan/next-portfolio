"use client";

import useHoverAnimation from "@/hooks/useHoverAnimation";

import { useLayoutEffect, useRef } from "react";
import CardSection from "../share/CardSection";
import gsap from "gsap";
import {reasons} from "@/content/reasonContent";

function WhyMeSection() {
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
      <div className="absolute inset-0 bg-linear-to-bl from-[#9ED83F]/20 via-blue-500/10 to-(--bg-tertiary)/50" />

      <div className="container relative z-10">
        <div className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-(--bg-tertiary)/10 border border-(--bg-tertiary)/20 rounded-full">
            <span className="w-2 h-2 bg-(--bg-tertiary) rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-[16px] font-medium text-(--bg-tertiary)">
              Why Choose Me
            </span>
          </div>

          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold block text-center"
          >
            What Makes Me Different
          </span>

          <p
            ref={descriptionRef}
            className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-4xl mx-auto"
          >
            A combination of technical{" "}
            <span className="text-(--text-tertiary)">
              skills, problem-solving mindset, and genuine commitment
            </span>{" "}
            to your project success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <CardSection
              key={reason.title}
              ref={(el: HTMLDivElement | null) => {
                if (el) itemsRef.current[idx] = el;
              }}
              title={reason.title}
              description={reason.description}
              Icon={reason.icon}
            />
          ))}
        </div>

        <div className="mt-10 p-8 bg-(--bg-secondary)/20 border border-(--border-secondary) rounded-xl">
          <p className="text-lg text-(--text-muted) leading-relaxed">
            I&apos;m not just building websites—I&apos;m building solutions that
            help your business grow. My goal is to create something that works
            well, scales with you, and exceeds expectations.
          </p>
        </div>
      </div>
    </section>
  );
}
export default WhyMeSection;
