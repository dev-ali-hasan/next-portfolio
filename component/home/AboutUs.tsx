"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { GraduationCap, ShieldCheck, User } from "lucide-react";
import { aboutContent } from "@/content/aboutContent";
import { TabKey } from "@/type/about/aboutContent";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  const imgRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const filteredContent = aboutContent.filter(
    (item) => item.type === activeTab
  );

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };
  
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
          duration: 0.5,
          delay: i * 0.1,
          ease: "power2.out",
        }
      );
    });
    }, [activeTab]);

    useEffect(() => {
      if (!titleRef.current || !descriptionRef.current) return;

      const ctx = gsap.context(() => {

        const titleText = titleRef.current!.innerText;
        titleRef.current!.innerHTML = "";

        titleText.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "about_title";
          span.textContent = char === " " ? "\u00A0" : char;
          titleRef.current!.appendChild(span);
        });

        gsap.from(titleRef.current!.querySelectorAll(".about_title"), {
          yPercent: 120,
          opacity: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        });

        const descText = descriptionRef.current!.innerText;
        descriptionRef.current!.innerHTML = "";

        descText.split(" ").forEach((word) => {
          const span = document.createElement("span");
          span.className = "about_word";
          span.textContent = word + " ";
          descriptionRef.current!.appendChild(span);
        });

        gsap.from(descriptionRef.current!.querySelectorAll(".about_word"), {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 90%",
            toggleActions: "play reset play reset",
          },
        });
      });

      return () => ctx.revert();
    }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
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
          duration: 0.6,
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
    <div className="w-full py-12 md:py-20 px-4 bg-(--bg-secondary)">
      <div className="container">
        <div className="flex items-center flex-col">
          <span ref={titleRef} className="text-xl sm:text-3xl font-semibold">
            About Me
          </span>

          <p
            ref={descriptionRef}
            className="text-(--text-muted) mt-4 text-center text-sm sm:text-base"
          >
            A passionate Frontend Developer with{" "}
            <span className="text-(--text-tertiary)">2+ years</span> of
            experience
          </p>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row  gap-10">
          <div
            ref={imgRef}
            className="w-full lg:w-[35%] p-6 bg-(--bg-primary) rounded-2xl shadow-lg h-fit mt-20"
          >
            <div ref={imgRef} className="overflow-hidden rounded-xl ">
              <Image
                width={2000}
                height={2000}
                src="/about-us.webp"
                alt="Profile"
                className="w-full h-[370px] object-fill"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">MD Ali Hasan</h2>
              <p className="text-(--text-muted)">Frontend Developer</p>
            </div>
          </div>

          <div className="w-full lg:w-[65%]">

            <div ref={tabsRef} className="flex flex-wrap gap-3 mb-6">
              {(["personal", "professional", "education"] as TabKey[]).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 sm:px-5 md:px-10 sm:py-2 rounded-2xl sm:rounded-4xl text-[14px] sm:text-[16px] font-medium text-(--text-tertiary) transition duration-300 cursor-pointer border  border-(--border-primary) flex items-center gap-1 sm:gap-3 hover:text-(--text-primary)  ${
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
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-(--text-muted)">{item.discretion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
