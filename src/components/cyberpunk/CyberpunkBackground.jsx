"use client";

import { useState, useEffect } from "react";

export function CyberpunkBackground() {
  const [isCp, setIsCp] = useState(false);

  useEffect(() => {
    function check() {
      setIsCp(document.documentElement.classList.contains("cyberpunk"));
    }
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!isCp) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="cp-grid-top" />
      <div className="cp-grid-bottom" />
      <div className="cp-scanlines" />
      <div className="cp-vignette" />
    </div>
  );
}
