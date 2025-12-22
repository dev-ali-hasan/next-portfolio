"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroComponent() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);

  const vueRef = useRef<HTMLSpanElement | null>(null);
  const nextRef = useRef<HTMLSpanElement | null>(null);
  const reactRef = useRef<HTMLSpanElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const lines = titleRef.current!.querySelectorAll(".line");

      lines.forEach((line) => {
        const text = line.textContent || "";
        line.textContent = "";

        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = char === " " ? "\u00A0" : char;
          line.appendChild(span);
        });
      });

      const chars = titleRef.current!.querySelectorAll(".char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true,
        },
        onStart: () => {
          gsap.set(titleRef.current, { visibility: "visible" });
        },
      });

      tl.fromTo(
        chars,
        { yPercent: 120, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.035,
          duration: 0.8,
          ease: "power3.out",
        }
      )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          buttonsRef.current?.children || [],
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        );

      gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 20,
        ease: "linear",
        repeat: -1,
      });

      const float = {
        y: -15,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      };

      gsap.to(vueRef.current, { ...float, delay: 0 });
      gsap.to(nextRef.current, { ...float, delay: 0.4 });
      gsap.to(reactRef.current, { ...float, delay: 0.8 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="w-full bg-(--bg-primary) overflow-hidden"
      style={{
        backgroundImage: "url('/heroSection.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container grid lg:grid-cols-2 gap-14 items-center pt-40 pb-30 px-5">

        <div ref={leftRef}>
          <div className="text-(--text-tertiary) text-sm mb-4 bg-(--bg-tertiary)/10 w-fit px-3 py-2 rounded-2xl border border-(--border-tertiary)">
            &gt;_ Available for freelance work
          </div>

          <div
            ref={titleRef}
            className="hero-title text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-mono"
          >
            <div className="line">Frontend Developer</div>
            <div className="line text-(--text-tertiary)">with 2+ years</div>
            <div className="line text-(--text-tertiary)">experience</div>
          </div>

          <p
            ref={subtitleRef}
            className="text-sm sm:text-base mt-6 text-(--text-muted)"
          >
            I specialize in building modern, responsive web applications using{" "}
            <span className="text-(--text-tertiary)">React</span>,{" "}
            <span className="text-(--text-tertiary)">Next</span>, and{" "}
            <span className="text-(--text-tertiary)">Vue</span>.
          </p>

          <div ref={buttonsRef} className="flex gap-4 flex-wrap mt-8">
            <button className="px-5 py-2 rounded-md bg-(--bg-tertiary) text-(--text-primary)">
              Contact Me
            </button>
            <button className="px-5 py-2 rounded-md border border-(--border-primary) text-(--text-tertiary)">
              View Project
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div
            ref={badgeRef}
            className="absolute inset-0 w-[320px] h-80 rounded-full bg-(--bg-tertiary)/10 blur-3xl"
          />

          <div className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-(--border-primary) p-2">
            <Image
              src="/profile.jpg"
              alt="profile"
              width={300}
              height={300}
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          <span
            ref={vueRef}
            className="absolute top-10 right-1 sm:right-8 md:right-24 bg-(--bg-tertiary)/5 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md"
          >
            Vue.js
          </span>

          <span
            ref={nextRef}
            className="absolute bottom-10 left-1 sm:left-8 md:left-24 bg-(--bg-tertiary)/5 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md"
          >
            Next.js
          </span>

          <span
            ref={reactRef}
            className="absolute -bottom-10 sm:bottom-0 right-30 bg-(--bg-tertiary)/5 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md"
          >
            React.js
          </span>
        </div>
      </div>
    </section>
  );
}
