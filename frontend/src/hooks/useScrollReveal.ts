import { useEffect, useRef } from "react";

/**
 * Lightweight scroll reveal using native IntersectionObserver + CSS classes.
 * Adds `is-visible` to the ref element when it enters the viewport.
 * All animation is done via CSS transitions — no JS animation loop, no main-thread blocking.
 */
export function useScrollReveal(margin = "-80px") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          // Reveal all child elements with reveal classes
          el.querySelectorAll<HTMLElement>(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
          ).forEach((child) => child.classList.add("is-visible"));
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return ref;
}
