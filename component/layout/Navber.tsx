"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import { handleScroll } from "@/utils/handleScroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const resumeBtnMobileRef = useRef<HTMLButtonElement | null>(null);

  const animRef = useRef<gsap.core.Timeline | null>(null);

  const menuItems = [
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Why Me", href: "#why-me", id: "why-me" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Review", href: "#review", id: "review" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.6 }
    );

    menuItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!menuRef.current) return;

    gsap.set(menuRef.current, {
      display: "none",
      height: 0,
      opacity: 0,
      pointerEvents: "none",
      overflow: "hidden",
    });
  }, []);

  const openMenu = () => {
    const menu = menuRef.current;
    if (!menu) return;

    animRef.current?.kill();

    gsap.set(menu, {
      display: "block",
      height: 0,
      opacity: 1,
      pointerEvents: "auto",
      overflow: "hidden",
    });

    requestAnimationFrame(() => {
      const targetHeight = menu.scrollHeight;

      animRef.current = gsap
        .timeline()
        .to(menu, {
          height: targetHeight,
          duration: 0.35,
          ease: "power2.out",
        })
        .fromTo(
          linksRef.current.filter(Boolean),
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
          "-=0.25"
        )
        .add(() => {
          gsap.set(menu, { height: "auto", overflow: "visible" });
        });
    });
  };

  const closeMenu = () => {
    const menu = menuRef.current;
    if (!menu) return;

    animRef.current?.kill();

    gsap.set(menu, {
      height: menu.offsetHeight,
      overflow: "hidden",
      pointerEvents: "none",
    });

    animRef.current = gsap.timeline().to(menu, {
      height: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(menu, {
          display: "none",
          height: 0,
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        });

        gsap.set(linksRef.current.filter(Boolean), { clearProps: "all" });
        if (resumeBtnMobileRef.current) {
          gsap.set(resumeBtnMobileRef.current, { clearProps: "all" });
        }
      },
    });
  };

  useEffect(() => {
    if (open) openMenu();
    else closeMenu();

    return () => {
      animRef.current?.kill();
    };
  }, [open]);

  useEffect(() => {
    const close = () => open && setOpen(false);

    const clickHandler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", keyHandler);
    document.addEventListener("mousedown", clickHandler);

    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", keyHandler);
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [open]);

  useEffect(() => {
    let startY = 0;

    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const touchEnd = (e: TouchEvent) => {
      if (e.changedTouches[0].clientY - startY > 80) setOpen(false);
    };

    const menu = menuRef.current;
    if (!menu) return;

    menu.addEventListener("touchstart", touchStart, { passive: true });
    menu.addEventListener("touchend", touchEnd, { passive: true });

    return () => {
      menu.removeEventListener("touchstart", touchStart);
      menu.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-(--bg-primary)/40 border-b border-(--border-secondary)"
    >
      <div className="container py-4 flex justify-between items-center">
        <a href="#" onClick={(e) => handleScroll(e, "#")}>
          <Image src="/logo.svg" alt="logo" width={48} height={48} />
        </a>

        <div className="hidden lg:flex items-center gap-8 text-[12px] sm:text-[16px] md:text-xl">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                handleScroll(e, item.href);
              }}
              className={`hover:text-(--text-tertiary) ${
                active === item.id ? "text-(--text-tertiary) font-semibold" : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <button className="border border-(--border-primary) text-(--text-tertiary) px-4 py-1 rounded-md">
          Resume
        </button>
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div
        ref={menuRef}
        className="hidden overflow-hidden lg:hidden bg-(--bg-primary)/70 border-t border-(--border-secondary)"
      >
        <div className="px-5 py-4 space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={item.href}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              href={item.href}
              onClick={(e) => {
                handleScroll(e, item.href);
                setOpen(false);
              }}
              className={`block ${
                active === item.id ? "text-(--text-tertiary) font-semibold" : ""
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
