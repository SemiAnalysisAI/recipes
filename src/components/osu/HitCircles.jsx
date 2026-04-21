"use client";

import { useEffect, useState, useRef } from "react";

const COLORS = ["#ff66aa", "#ff3388", "#ffaad4", "#ff8ec2"];
const SPAWN_MS = 400;
const LIFE_MS = 1400;

export function HitCircles() {
  const [circles, setCircles] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    function spawn() {
      const id = ++idRef.current;
      const circle = {
        id,
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        size: 70 + Math.random() * 60,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        num: 1 + Math.floor(Math.random() * 9),
      };
      setCircles((cs) => [...cs, circle]);
      setTimeout(() => {
        setCircles((cs) => cs.filter((c) => c.id !== id));
      }, LIFE_MS);
    }
    spawn();
    const iv = setInterval(spawn, SPAWN_MS);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {circles.map((c) => (
        <div
          key={c.id}
          className="osu-hit"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            "--osu-col": c.color,
          }}
        >
          <div className="osu-hit-approach" />
          <div className="osu-hit-body">
            <span className="osu-hit-num">{c.num}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
