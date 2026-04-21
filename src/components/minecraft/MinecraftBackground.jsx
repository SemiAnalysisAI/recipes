"use client";

import dynamic from "next/dynamic";

const MinecraftScene = dynamic(() => import("./MinecraftScene"), {
  ssr: false,
  loading: () => null,
});

export function MinecraftBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.18 }}
    >
      <MinecraftScene />
    </div>
  );
}
