"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reviews } from "@/content/clientReview";
import { Star } from "lucide-react";
import { Review } from "@/type/reviews/reviewsContent";
import useHoverAnimation from "@/hooks/useHoverAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function ReviewComponent() {
  const skillSvgRef = useRef<SVGSVGElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const col3Ref = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [col1, setCol1] = useState<Review[]>([]);
  const [col2, setCol2] = useState<Review[]>([]);
  const [col3, setCol3] = useState<Review[]>([]);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useHoverAnimation({ titleRef, descriptionRef });

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
    const chunkSize = Math.ceil(reviews.length / 3);
    setCol1(reviews.slice(0, chunkSize));
    setCol2(reviews.slice(chunkSize, chunkSize * 2));
    setCol3(reviews.slice(chunkSize * 2));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const animateColumn = (
      el: HTMLDivElement | null,
      direction: "up" | "down",
      duration: number
    ) => {
      if (!el) return;
      const height = el.scrollHeight / 2;

      gsap.fromTo(
        el,
        { y: direction === "up" ? 0 : -height },
        {
          y: direction === "up" ? -height : 0,
          duration,
          ease: "linear",
          repeat: -1,
        }
      );
    };

    animateColumn(col1Ref.current, "up", 20);
    animateColumn(col2Ref.current, "down", 25);
    animateColumn(col3Ref.current, "up", 18);
  }, [mounted]);

  const renderReviews = (items: Review[]) =>
    [...items, ...items].map((review, index) => (
      <div
        key={`${review.name}-${index}`}
        className="p-6 rounded-2xl bg-(--bg-primary) border border-(--border-secondary) transition-colors duration-300 group flex flex-col justify-between w-full shrink-0"
      >
        <div>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < review.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-gray-600 text-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-(--text-muted) line-clamp-4 leading-relaxed text-[12px] sm:text-[16px]">
            &quot;{review.review}&quot;
          </p>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div className="w-12 h-12 rounded-full bg-(--bg-tertiary)/10 flex items-center justify-center text-(--text-tertiary) font-bold text-2xl shrink-0">
            {review.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <div className="font-semibold text-(--text-primary) truncate text-[12px] sm:text-[16px] md:text-xl">
              {review.name}
            </div>
            <p className="text-[12px] sm:text-[16px] text-(--text-tertiary) truncate">
              {review.company}
            </p>
          </div>
        </div>
      </div>
    ));

  return (
    <section
      className="pt-20 lg:pt-36 pb-20 bg-(--bg-secondary) space-y-10 overflow-hidden"
      id="review"
    >
      <div className="text-center container px-4 pb-14">
        <div className="relative inline-block ">
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

          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold block text-center mb-3"
          >
            Client Experiences
          </span>
        </div>

        <p
          ref={descriptionRef}
          className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-5xl mx-auto"
        >
          Honest feedback from clients highlighting their experience with our
          design quality, development approach, and overall collaboration across
          real-world projects.
        </p>
      </div>

      <div className="relative h-[600px] overflow-hidden container">
        <div className="pointer-events-none absolute left-0 top-0 w-full h-24 bg-linear-to-b from-(--bg-secondary) to-transparent z-20" />
        <div className="pointer-events-none absolute left-0 bottom-0 w-full h-24 bg-linear-to-t from-(--bg-secondary) to-transparent z-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          <div className="overflow-hidden relative h-full px-6 sm:px-0">
            <div ref={col1Ref} className="flex flex-col gap-6">
              {renderReviews(col1)}
            </div>
          </div>
          <div className="overflow-hidden relative h-full hidden md:block">
            <div ref={col2Ref} className="flex flex-col gap-6 px-6 sm:px-0">
              {renderReviews(col2)}
            </div>
          </div>
          <div className="overflow-hidden relative h-full hidden lg:block">
            <div ref={col3Ref} className="flex flex-col gap-6 px-6 sm:px-0">
              {renderReviews(col3)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
