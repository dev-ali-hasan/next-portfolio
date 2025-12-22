"use client";

import { useCountUp } from "@/hooks/useCountUp";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ClientHappy() {
  const happyClients = useCountUp(120);
  const projectsCompleted = useCountUp(180);
  const experienceYears = useCountUp(2);
  const countriesServed = useCountUp(8);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const stats = [
    {
      counter: happyClients,
      label: "Happy Clients",
    },
    {
      counter: projectsCompleted,
      label: "Projects Completed",
    },
    {
      counter: experienceYears,
      label: "Years of Experience",
    },
    {
      counter: countriesServed,
      label: "Countries Served",
    },
  ];

  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current) return;

    const animation = gsap.context(() => {
      const animateText = (element: HTMLElement) => {
        const text = element.innerText;
        element.innerHTML = "";

        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "about_title";
          span.textContent = char === " " ? "\u00A0" : char;
          element.appendChild(span);
        });

        gsap.from(element.querySelectorAll(".about_title"), {
          yPercent: 120,
          opacity: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        });
      };

      if (titleRef.current && descriptionRef.current) {
        animateText(titleRef.current);
        animateText(descriptionRef.current);
      }
    });

    return () => animation.revert();
  }, []);

  return (
    <section
      className="text-(--text-primary) w-full py-12 md:py-20 px-4"
      style={{
        backgroundImage: "url('/countup.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "container",
      }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-4xl font-bold mb-4"
          >
            Trusted by clients around the world
          </div>
          <p
            ref={descriptionRef}
            className="text-(--text-muted) text-[13px] sm:text-lg"
          >
            We build dependable and scalable digital products designed to
            support long-term business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((item) => (
            <div
              key={item.label}
              ref={item.counter.ref}
              className="flex flex-col items-center justify-center bg-(--bg-primary) rounded-xl md:rounded-2xl p-8 border border-(--border-primary) transition hover:shadow-lg"
            >
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-(--text-tertiary)">
                {item.counter.value} +
              </div>
              <div className="mt-2 text-[13px] sm:text-lg text-center text-(--text-muted)">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientHappy;
