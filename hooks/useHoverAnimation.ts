"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  titleRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLDivElement | null>;
};

function wrapWordsPreserveHTML(element: HTMLElement, className: string) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

  const textNodes: Text[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) {
    if (node.nodeValue?.trim()) {
      textNodes.push(node as Text);
    }
  }

  textNodes.forEach((textNode) => {
    const words = textNode.nodeValue!.split(" ");
    const fragment = document.createDocumentFragment();

    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = word;
      fragment.appendChild(span);

      if (i < words.length - 1) {
        fragment.appendChild(document.createTextNode(" "));
      }
    });

    textNode.parentNode?.replaceChild(fragment, textNode);
  });
}

function wrapCharsPreserveHTML(element: HTMLElement, className: string) {
  const text = element.innerText;
  element.innerHTML = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = char === " " ? "\u00A0" : char;
    element.appendChild(span);
  });
}

export default function useHoverAnimation({ titleRef, descriptionRef }: Props) {
  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current) return;

    const ctx = gsap.context(() => {
      const titleEl = titleRef.current!;
      wrapCharsPreserveHTML(titleEl, "about_title");

      gsap.from(titleEl.querySelectorAll(".about_title"), {
        yPercent: 120,
        opacity: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleEl,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      const descEl = descriptionRef.current!;
      wrapWordsPreserveHTML(descEl, "about_word");

      gsap.from(descEl.querySelectorAll(".about_word"), {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descEl,
          start: "top 90%",
          toggleActions: "play none none reset",
        },
      });
    });

    return () => ctx.revert();
  }, [titleRef, descriptionRef]);
}
