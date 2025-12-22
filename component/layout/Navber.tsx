"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const resumeBtnRef = useRef<HTMLButtonElement | null>(null);
  const resumeBtnMobileRef = useRef<HTMLButtonElement | null>(null);

  const tlMenu = useRef<gsap.core.Timeline | null>(null);

  const sectionIds = ["home", "about", "services", "review", "contact"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((element) => element.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.6 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!menuRef.current) return;

    gsap.set(menuRef.current, {
      height: 0,
      opacity: 0,
      display: "none",
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    tlMenu.current?.kill();

    tlMenu.current = gsap.timeline({ paused: true });

    tlMenu.current
      .to(menuRef.current, {
        display: "block",
        height: "auto",
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power2.out",
      })
      .fromTo(
        linksRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        resumeBtnMobileRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .eventCallback("onReverseComplete", () => {
        gsap.set(menuRef.current, {
          height: 0,
          opacity: 0,
          display: "none",
          pointerEvents: "none",
        });
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    open ? tlMenu.current.play() : tlMenu.current.reverse();
  }, [open]);

  useEffect(() => {
    const handleClick = (element: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(element.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    const onScroll = () => open && setOpen(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const onKey = (element: KeyboardEvent) => element.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let startY = 0;

    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const touchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 80) setOpen(false);
    };

    const menu = menuRef.current;
    if (!menu) return;

    menu.addEventListener("touchstart", touchStart);
    menu.addEventListener("touchend", touchEnd);

    return () => {
      menu.removeEventListener("touchstart", touchStart);
      menu.removeEventListener("touchend", touchEnd);
    };
  }, []);

  const menuItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Review", href: "#review", id: "review" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-(--bg-primary)/40 border-b border-(--border-secondary)"
    >
      <div className="container px-5 py-4 flex justify-between items-center">
        <Image src="/logo.svg" alt="logo" width={48} height={48} />

        <div className="hidden md:flex items-center gap-8 text-sm">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`hover:text-(--text-tertiary) ${
                active === item.id
                  ? "text-(--text-tertiary) font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          ref={resumeBtnRef}
          className="hidden md:block border border-(--border-primary) text-(--text-tertiary) px-4 py-1 rounded-md"
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
                if (element) linksRef.current[index] = element;
              }}
              href={item.href}
              onClick={() => {
                setActive(item.id);
                setOpen(false);
              }}
              className={`block ${
                active === item.id
                  ? "text-(--text-tertiary) font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </a>
          ))}

          <button
            ref={resumeBtnMobileRef}
            className="border border-(--border-primary) text-(--text-tertiary) px-4 py-1 rounded-md"
          >
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
}
