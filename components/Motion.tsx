"use client";

import { useEffect, useState } from "react";

export default function Motion() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach(element => {
      element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return <button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)} aria-label={paused ? "הפעלת אנימציות" : "עצירת אנימציות"}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span>{paused ? "הפעלת אנימציות" : "עצירת אנימציות"}</span></button>;
}
