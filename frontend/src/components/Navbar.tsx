"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Location", href: "/location" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    // Initialize state on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        !isTransparent ? "bg-[var(--bg)] shadow-md py-4 border-b border-primary/10" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-[40px]">
        <Link href="/" className="z-50 flex flex-col shrink-0">
          <span className={cn("text-2xl font-serif font-bold transition-colors", !isTransparent ? "text-primary" : "text-white")}>
            Vikas Residency
          </span>
          <span className={cn("text-xs tracking-[0.2em] uppercase transition-colors", !isTransparent ? "text-accent" : "text-white/80")}>
            Varanasi
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent shrink-0",
                !isTransparent ? "text-foreground" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 shrink-0">
            {mounted && (
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-full transition-colors hover:bg-primary/10 active:scale-95 shrink-0",
                  !isTransparent ? "text-foreground" : "text-white"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <Link
              href="/contact"
              className={cn(
                "px-5 py-2 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 border border-transparent",
                !isTransparent ? "bg-primary text-white hover:bg-primary-light" : "bg-accent text-[#0f3d2e] hover:bg-accent-hover"
              )}
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50">
          {mounted && (
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-colors active:scale-95",
                isOpen ? "text-primary" : !isTransparent ? "text-primary" : "text-white"
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          )}
          
          <button
            className={cn("transition-colors", isOpen ? "text-primary" : !isTransparent ? "text-primary" : "text-white")}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-[var(--bg)] z-40 flex flex-col justify-center items-center gap-8 transition-all duration-300 transform",
            isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-serif text-primary hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-2xl font-serif text-primary hover:text-accent transition-colors"
          >
            Contact
          </Link>
          <div className="flex flex-col items-end gap-1 mt-4">
            <div className="flex items-center gap-2 text-accent">
              <Phone size={20} />
              <a href="tel:+919795756509" className="text-lg font-bold">+91 97957 56509</a>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Phone size={20} />
              <a href="tel:+918318635270" className="text-lg font-bold">+91 83186 35270</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
