import { useEffect } from "react";
import { gsap } from "gsap";

export default function hoverAnimation({
  titleRef,
  descriptionRef,
}: {
  titleRef: React.RefObject<HTMLDivElement>;
  descriptionRef: React.RefObject<HTMLDivElement>;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        duration: 0.2,
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
        duration: 0.2,
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
}
