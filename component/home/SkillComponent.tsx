"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Skill } from "@/type/skill/skillContent";
import { skillContent } from "@/content/skillContent";

gsap.registerPlugin(ScrollTrigger);

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SkillComponent() {
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);
  const row3Ref = useRef<HTMLDivElement | null>(null);
  const skillSvgRef = useRef<SVGSVGElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [row1, setRow1] = useState<Skill[]>([]);
  const [row2, setRow2] = useState<Skill[]>([]);
  const [row3, setRow3] = useState<Skill[]>([]);

  useEffect(() => {
    if (!skillSvgRef.current) return;

    const paths = skillSvgRef.current.querySelectorAll("path");

    gsap.set(paths, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      scrollTrigger: {
        trigger: skillSvgRef.current,
        start: "top 85%",
      },
    });

    tl.to(paths, {
      opacity: 1,
      duration: 0.6,
      stagger: 0.4,
      ease: "power2.out",
    }).to(
      paths,
      {
        opacity: 0,
        duration: 0.4,
        stagger: 0.3,
        ease: "power2.in",
      },
      "+=1"
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setRow1(shuffleArray(skillContent));
    setRow2(shuffleArray(skillContent));
    setRow3(shuffleArray(skillContent));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const animateRow = (
      el: HTMLDivElement | null,
      direction: "left" | "right",
      duration: number
    ) => {
      if (!el) return;
      const width = el.scrollWidth / 2;

      gsap.fromTo(
        el,
        { x: direction === "left" ? 0 : -width },
        {
          x: direction === "left" ? -width : 0,
          duration,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => `${parseFloat(x) % width}px`,
          },
        }
      );
    };

    animateRow(row1Ref.current, "left", 70);
    animateRow(row2Ref.current, "right", 75);
    animateRow(row3Ref.current, "left", 65);
  }, [mounted]);

  

  const renderItems = (items: Skill[]) =>
    [...items, ...items].map((item, index) => (
      <div
        key={`${item.title}-${index}`}
        className="flex items-center gap-3 bg-(--text-primary) px-8 py-2 rounded-lg text-(--bg-primary) shrink-0"
      >
        <Image
          src={item.icon}
          alt={item.title}
          width={48}
          height={48}
          className="w-12 h-12"
        />
        <span className="font-medium whitespace-nowrap">{item.title}</span>
      </div>
    ));

  return (
    <section className="pt-36 pb-20 bg-(--bg-primary) space-y-10 overflow-hidden">
      
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute -top-10 -left-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="74"
              viewBox="0 0 68 74"
              fill="none"
              ref={skillSvgRef}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z"
                className="fill-(--text-tertiary)"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z"
                className="fill-(--text-tertiary)"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z"
                className="fill-(--text-tertiary)"
              ></path>
            </svg>
          </div>

          <h2 className="text-4xl font-bold mb-3 bg-linear-to-l from-(--bg-tertiary) to-(--text-primary) bg-clip-text text-transparent">
            My Skills
          </h2>
        </div>

        <p className="text-(--text-muted) max-w-4xl mx-auto mt-4">
          Modern frontend development using React, Next.js, Vue, and Nuxt with
          performance-focused, scalable UI architecture.
        </p>
      </div>
     
     
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[500px] bg-linear-to-r from-(--bg-primary) to-transparent z-20" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-[500px] bg-linear-to-l from-(--bg-primary) to-transparent z-20" />

        <div className="space-y-4">
          <div ref={row1Ref} className="flex gap-3 w-max">
            {renderItems(row1)}
          </div>
          <div ref={row2Ref} className="flex gap-3 w-max">
            {renderItems(row2)}
          </div>
          <div ref={row3Ref} className="flex gap-3 w-max">
            {renderItems(row3)}
          </div>
        </div>
      </div>
    </section>
  );
}
