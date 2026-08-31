import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, it adds the class "revealed",
 * which triggers the CSS reveal/reveal-stagger transitions in index.css.
 *
 * @param {IntersectionObserverInit} options - Observer options override.
 * @returns {React.RefObject} ref - Attach to any HTML element.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref} className="reveal"> ... </section>
 *
 *   // Staggered children:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="reveal-stagger"> <Card /> <Card /> </div>
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if motion is reduced — the element stays fully visible
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
