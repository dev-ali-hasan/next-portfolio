"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroComponent() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const nextRef = useRef<HTMLSpanElement | null>(null);
  const reactRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    gsap.from([nodeRef.current, nextRef.current, reactRef.current], {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.to(nodeRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(nextRef.current, {
      x: -30,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(reactRef.current, {
      y: -15,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(buttonsRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(badgeRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      className="w-full bg-(--bg-primary)"
      style={{ backgroundImage: "url('/heroSection.svg')" }}
    >
      <div className="container grid lg:grid-cols-2 gap-14 items-center pt-30 pb-20 px-5">
        <div>
          <div className="text-(--text-tertiary) text-sm  mb-4 bg-(--bg-tertiary)/10 w-fit px-3 py-2 rounded-2xl border border-(--border-tertiary)">
            &gt;_ Available for freelance work
          </div>
          <div
            ref={titleRef}
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-mono"
          >
            Frontend Developer <br />
            <span className="text-(--text-tertiary)">with 2+ years</span>
            <br />
            <span className="text-(--text-tertiary)">experience</span>
          </div>

          <p ref={subtitleRef} className="mt-6 text-(--text-muted)">
            I specialize in building modern, responsive web applications using{" "}
            <span className="text-(--text-tertiary)">React</span>,{" "}
            <span className="text-(--text-tertiary)">Next</span>, and{" "}
            <span className="text-(--text-tertiary)">Vue</span> Let&apos;s
            transform your ideas into reality.
          </p>

          <div ref={buttonsRef} className="flex gap-4 mt-8">
            <button className="px-5 py-2 rounded-md bg-(--bg-tertiary) font-medium hover:bg-(--bg-tertiary)/80 text-(--text-primary) transition duration-300 cursor-pointer">
              Contact Me
            </button>

            <button className="px-5 py-2 rounded-md border border-(--border-primary) text-(--text-tertiary) hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition duration-300 cursor-pointer">
              View Project
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div
            ref={badgeRef}
            className="absolute inset-0 w-[320px] h-80 rounded-full bg-(--bg-tertiary)/10 blur-3xl animate-pulse"
          ></div>

          <div className="relative w-72 h-72 rounded-full border border-(--border-primary) p-2">
            <Image
              src="/profile.jpg"
              alt="profile"
              width={300}
              height={300}
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          <span
            ref={nodeRef}
            className="absolute top-10 right-24 bg-(--bg-tertiary)/05 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md"
          >
            Vue.js
          </span>

          <span
            ref={nextRef}
            className="absolute bottom-10 left-24 bg-(--bg-tertiary)/05 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md"
          >
            Next.js
          </span>

          <span
            ref={reactRef}
            className="absolute bottom-0 right-30 bg-(--bg-tertiary)/05 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md"
          >
            React.js
          </span>
        </div>
      </div>
    </section>
  );
}
