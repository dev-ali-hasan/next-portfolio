"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { GraduationCap, ShieldCheck, User } from "lucide-react";
import { aboutContent } from "@/content/aboutContent";
import { TabKey } from "@/type/about/aboutContent";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverItem from "../share/HoverImage";
import useHoverAnimation from "@/hooks/useHoverAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  const imgRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const filteredContent = aboutContent.filter(
    (item) => item.type === activeTab
  );

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };
  
  useHoverAnimation({ titleRef, descriptionRef });

  useEffect(() => {
    if (!imgRef.current) return;

    gsap.to(imgRef.current, {
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    if (!itemRefs.current.length) return;

    itemRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
        }
      );
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 85%",
          toggleActions: "play reset play reset",
        },
      });

      if (listRef.current) {
        gsap.from(listRef.current.children, {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" className="w-full py-8 md:py-12 lg:py-20 bg-(--bg-secondary)">
      <div className="container">
        <div className="flex items-center flex-col">
          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-semibold"
          >
            About Me
          </span>

          <p
            ref={descriptionRef}
            className="text-(--text-muted) mt-4 text-center text-[12px] sm:text-[16px] md:text-xl"
          >
            A passionate Frontend Developer with{" "}
            <span className="text-(--text-tertiary)">2+ years</span> of
            experience
          </p>
        </div>

        <div className="sm:mt-5 lg:mt-12 flex flex-col lg:flex-row  gap-10">
          <div
            ref={imgRef}
            className="w-full lg:w-[35%] p-6 bg-(--bg-primary) rounded-2xl shadow-lg h-fit mt-10 lg:mt-20"
          >
            <div
              ref={imgRef}
              className="overflow-hidden w-full h-[370px] cursor-pointer"
            >
              <HoverItem
                image="/about-us.webp"
                displacement="/about-us.webp"
                css="rounded-xl"
                intensity={0.4}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-[16px] sm:text-lg md:text-2xl font-bold">
                MD Ali Hasan
              </h2>
              <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-xl">
                Frontend Developer
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[65%]">
            <div ref={tabsRef} className="flex flex-wrap gap-2 md:gap-3 mb-6">
              {(["personal", "professional", "education"] as TabKey[]).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 sm:px-5 xl:px-10 sm:py-2 rounded-2xl sm:rounded-4xl text-[12px] sm:text-[16px] md:text-xl font-medium text-(--text-tertiary) transition duration-300 cursor-pointer border  border-(--border-primary) flex items-center gap-1 sm:gap-3 hover:text-(--text-primary)  ${
                      activeTab === tab
                        ? "bg-(--bg-tertiary)/70 text-(--text-primary)! hover:bg-(--bg-tertiary) "
                        : "hover:bg-(--bg-tertiary)"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "personal" ? (
                      <User className="w-3 h-3 sm:w-5 sm:h-5" />
                    ) : tab === "professional" ? (
                      <ShieldCheck className="w-3 h-3 sm:w-5 sm:h-5" />
                    ) : (
                      <GraduationCap className="w-3 sm:w-6" />
                    )}

                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>

            <div
              ref={listRef}
              className="bg-(--bg-primary) p-6 rounded-xl space-y-4"
            >
              {filteredContent.map((item, i) => (
                <div key={i} ref={addToRefs} className="space-y-1.5">
                  <div className="text-xl md:text-2xl font-semibold">
                    {item.title}
                  </div>
                  <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-lg">
                    {item.discretion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
