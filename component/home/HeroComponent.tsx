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
      className=" container relative bg-(--bg-primary)"
      style={{ backgroundImage: "url('/introShape1_2.webp')" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1441"
        height="762"
        viewBox="0 0 1441 762"
        fill="none"
      >
        <path
          d="M549.828 635.087H898.087M0.527698 17.1645L0.527665 762M46.9623 17.1645L46.9623 762M93.3968 17.1645L93.3968 762M139.831 17.1645L139.831 762M186.266 17.1645L186.266 762M232.701 17.1645L232.701 762M279.135 17.1645L279.135 762M325.57 17.1645L325.57 762M372.004 17.1645L372.004 762M0 732.352H1439.47M418.439 17.1645L418.439 762M0 686.58H1439.47M464.874 17.1645L464.874 762M0 640.808H1439.47M511.308 17.1645L511.308 762M0 595.036H1439.47M557.743 17.1645L557.743 762M0 549.264H1439.47M604.177 17.1645L604.177 762M0 503.492H1439.47M650.612 17.1645L650.612 762M0 457.72H1439.47M697.047 17.1645L697.046 762M0 411.948H1439.47M743.481 17.1645L743.481 762M0 366.176H1439.47M789.916 17.1645L789.916 762M0 320.404H1439.47M836.35 17.1645L836.35 762M0 274.632H1439.47M882.785 17.1645L882.785 762M0 228.86H1439.47M929.219 17.1645L929.219 762M0 183.088H1439.47M975.654 17.1645L975.654 762M0 137.316H1439.47M1022.09 17.1645L1022.09 762M0 91.544H1439.47M1068.52 17.1645L1068.52 762M0 45.772H1439.47M1114.96 17.1645V762M0 0L1439.47 0M1161.39 17.1645V762M1207.83 17.1645V762M1254.26 17.1645V762M1300.7 17.1645V762M1347.13 17.1645V762M1393.57 17.1645V762M1440 17.1645V762"
          stroke="url(#paint0_radial_577_97153)"
          strokeOpacity="0.5"
        ></path>
        <defs>
          <radialGradient
            id="paint0_radial_577_97153"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(720 335.779) rotate(90) scale(426.221 805.457)"
          >
            <stop stopColor="white" stopOpacity="0.16"></stop>
            <stop offset="0.6" stopColor="#54D0FB" stopOpacity="0.02"></stop>
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute top-0 left-0 w-full h-full grid lg:grid-cols-2 gap-14 items-center pt-30 pb-20 px-5">
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

          <div className="flex gap-4 mt-10 text-(--text-muted) text-xl">
            <i className="ri-linkedin-fill"></i>
            <i className="ri-github-fill"></i>
            <i className="ri-mail-fill"></i>
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
