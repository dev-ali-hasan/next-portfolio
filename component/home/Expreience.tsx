"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Briefcase, MapPin } from "lucide-react";
import { experiences } from "@/content/experience";

const Experience = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const [labelWidths, setLabelWidths] = useState<number[]>([]);
  const [lineHeight, setLineHeight] = useState<number | "auto">("auto");

  const setLabelRef = (index: number) => (element: HTMLDivElement | null) => {
    if (!element) return;

    const width = element.offsetWidth - 23;

    setLabelWidths((prev) => {
      if (prev[index] === width) return prev;

      const next = [...prev];
      next[index] = width;
      return next;
    });
  };

  useEffect(() => {
    if (!experienceRef.current) return;

    const update = () => {
      setLineHeight(experienceRef.current!.offsetHeight - 200);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(experienceRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="py-20 px-4 relative bg-(--bg-primary)">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[2px] w-16 bg-(--border-primary)"></div>
            <div className="text-3xl md:text-4xl font-bold animate-on-scroll text-(--text-primary)">
              Professional Experience
            </div>
            <div className="h-[2px] w-16 bg-(--border-primary)"></div>
          </div>

          <p className="text-(--text-muted) text-sm mt-2">
            Creating reliable, user-focused web solutions using modern frontend
            technologies.
          </p>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-(--border-primary)"
            style={{ height: lineHeight }}
          ></div>

          <div ref={experienceRef} className="space-y-0">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`flex items-start ${
                    idx % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`md:w-[calc(50%-20px)] ${
                      idx % 2 === 0 ? "pr-1 text-left" : "pl-1 text-left"
                    }`}
                  >
                    <div className="relative">
                      <div
                        ref={setLabelRef(idx)}
                        className={`hidden md:flex absolute -top-8.5 ${
                          idx % 2 === 0
                            ? "-right-[20px] rounded-bl-none!"
                            : "-left-[20px] rounded-br-none!"
                        } items-center gap-2 px-3 py-1.5 rounded-md whitespace-nowrap border border-(--border-primary) bg-(--bg-primary) text-(--text-tertiary)`}
                      >
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs sm:text-[16px]">
                          {exp.date}
                        </span>
                      </div>
                      <div
                        className={`hidden md:block absolute top-0 ${
                          idx % 2 === 0 ? "right-0.5" : "left-0.5"
                        } h-2 bg-(--bg-primary)`}
                        style={{ width: labelWidths[idx] ?? "auto" }}
                      />

                      <div
                        className={`p-6 ${
                          idx % 2 === 0
                            ? "md:rounded-tr-none!"
                            : "md:rounded-tl-none!"
                        } bg-transparent border-2 border-(--border-primary) rounded-xl mt-8`}
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <Briefcase className="w-4 h-4 text-(--text-tertiary) mt-1 shrink-0" />
                          <div className="text-xl font-bold text-(--text-primary)">
                            {exp.title}
                          </div>
                          <div className="flex md:hidden items-center gap-2 mt-1 text-(--text-tertiary)">
                            <Calendar className="w-3 h-3 " />
                            <span className="text-xs sm:text-[16px]">
                              {exp.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs sm:text-[16px]">
                          <span className="text-(--text-muted) ">
                            {exp.company} - {exp.location}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium bg-(--bg-tertiary) text-(--text-primary)">
                            <MapPin className="w-3 h-3" />
                            {exp.isOnsite ? "Onsite" : "Remote"}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {exp.details.map((detail, detailIdx) => (
                            <li
                              key={detailIdx}
                              className="text-(--text-muted) text-xs sm:text-[16px] leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-(--text-tertiary) text-xl -mt-1 shrink-0">
                                •
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2">
                  <div className="w-4 h-4 rounded-full transition-all duration-300 border-4 animate-pulse bg-(--border-primary) border-(--bg-primary)"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
