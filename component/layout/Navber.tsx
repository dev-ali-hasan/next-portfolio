"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("home");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const resumeBtnRef = useRef<HTMLButtonElement | null>(null);
  const resumeBtnMobileRef = useRef<HTMLButtonElement | null>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const sectionIds: string[] = [
    "home",
    "about",
    "services",
    "review",
    "contact",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.6 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    tl.current?.kill();
    tl.current = gsap.timeline();

    if (open) {
      tl.current
        .fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          }
        )
        .fromTo(
          linksRef.current,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      tl.current.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  useEffect(() => {
    const buttons: HTMLButtonElement[] = [];

    if (resumeBtnRef.current) buttons.push(resumeBtnRef.current);
    if (resumeBtnMobileRef.current) buttons.push(resumeBtnMobileRef.current);

    buttons.forEach((button) => {
      const hoverAnim = gsap.to(button, {
        scale: 1.1,
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-primary)",
        boxShadow: "0px 0px 15px rgba(34, 197, 94, 0.7)",
        duration: 0.3,
        paused: true,
      });

      const handleEnter = () => hoverAnim.play();
      const handleLeave = () => hoverAnim.reverse();

      button.addEventListener("mouseenter", handleEnter);
      button.addEventListener("mouseleave", handleLeave);

      return () => {
        button.removeEventListener("mouseenter", handleEnter);
        button.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, []);

  const menuItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Review", href: "#review", id: "review" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-(--bg-primary)/40 border-b border-(--border-secondary)">
      <div className="container px-5 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Balal.</div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`hover:text-(--text-tertiary) transition ${
                active === item.id ? "text-(--text-tertiary) font-semibold" : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          ref={resumeBtnRef}
          className="hidden md:block border border-(--border-primary) text-(--text-tertiary)
 px-4 py-1 rounded-md transition duration-300 cursor-pointer"
        >
          Resume
        </button>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div
        ref={menuRef}
        className="overflow-hidden md:hidden bg-(--bg-primary)/70 border-t border-(--border-secondary)"
      >
        <div className="px-5 py-4 space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={item.id}
              ref={(element) => {
                if (element) {
                  linksRef.current[index] = element;
                }
              }}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={`block text-(--text-primary) ${
                active === item.id ? "text-(--text-tertiary) font-semibold" : ""
              }`}
            >
              {item.name}
            </a>
          ))}

          <button
            ref={resumeBtnMobileRef}
            className="border border-(--border-primary) text-(--text-tertiary px-4 py-1 rounded-md transition duration-300 cursor-pointer"
          >
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
}
