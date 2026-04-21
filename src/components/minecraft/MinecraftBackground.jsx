"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MinecraftScene = dynamic(() => import("./MinecraftScene"), {
  ssr: false,
  loading: () => null,
});

export function MinecraftBackground() {
  const [isMinecraft, setIsMinecraft] = useState(false);

  useEffect(() => {
    function check() {
      setIsMinecraft(document.documentElement.classList.contains("minecraft"));
    }
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!isMinecraft) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.18 }}
    >
      <MinecraftScene />
    </div>
  );
}
