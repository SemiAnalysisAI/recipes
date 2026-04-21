"use client";

import { useState, useEffect } from "react";
import { HitCircles } from "./HitCircles";

export function OsuBackground() {
  const [isOsu, setIsOsu] = useState(false);

  useEffect(() => {
    function check() {
      setIsOsu(document.documentElement.classList.contains("osu"));
    }
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!isOsu) return null;

  return <HitCircles />;
}
