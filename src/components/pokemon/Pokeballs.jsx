"use client";

import { useMemo } from "react";

const BALL_COUNT = 28;

export function Pokeballs() {
  const balls = useMemo(() => {
    return Array.from({ length: BALL_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 36 + Math.random() * 64,
      rotate: Math.random() * 360,
      bobDur: 4 + Math.random() * 5,
      spinDur: 18 + Math.random() * 22,
      delay: -Math.random() * 6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.18 }}>
      {balls.map((b) => (
        <div
          key={b.id}
          className="pokeball-wrap"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.bobDur}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div
            className="pokeball"
            style={{
              animationDuration: `${b.spinDur}s`,
              animationDelay: `${b.delay}s`,
              transform: `rotate(${b.rotate}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
