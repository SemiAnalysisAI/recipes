"use client";

import { useEffect, useState, useRef } from "react";

const SKILLS = [
  "Attack", "Strength", "Defence", "Ranged", "Prayer", "Magic",
  "Runecraft", "Construction", "Hitpoints", "Agility", "Herblore",
  "Thieving", "Crafting", "Fletching", "Slayer", "Hunter",
  "Mining", "Smithing", "Fishing", "Cooking", "Firemaking",
  "Woodcutting", "Farming",
];
const SPAWN_MS = 500;
const LIFE_MS = 2600;

export function XpDrops() {
  const [drops, setDrops] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    function spawn() {
      const id = ++idRef.current;
      const d = {
        id,
        x: 5 + Math.random() * 90,
        y: 100,
        amount: 1 + Math.floor(Math.random() * 250),
        skill: SKILLS[Math.floor(Math.random() * SKILLS.length)],
      };
      setDrops((ds) => [...ds, d]);
      setTimeout(() => {
        setDrops((ds) => ds.filter((x) => x.id !== id));
      }, LIFE_MS);
    }
    spawn();
    const iv = setInterval(spawn, SPAWN_MS);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {drops.map((d) => (
        <div
          key={d.id}
          className="osrs-xp-drop"
          style={{ left: `${d.x}%`, bottom: 0 }}
        >
          +{d.amount} {d.skill}
        </div>
      ))}
    </div>
  );
}
