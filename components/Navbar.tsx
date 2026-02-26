"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-line/50" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-semibold text-text">CortexAuto</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-muted hover:text-text transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("platform")}
              className="text-sm text-muted hover:text-text transition-colors"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="text-sm text-muted hover:text-text transition-colors"
            >
              Analytics
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("cta")}
            className="rounded-full border border-accent/60 bg-accent/20 px-5 py-2 text-sm font-medium text-accent transition hover:bg-accent/30"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
