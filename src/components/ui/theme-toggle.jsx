"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Pickaxe } from "lucide-react";

const THEME_CYCLE = ["light", "dark", "minecraft"];

function applyTheme(t) {
  const cls = document.documentElement.classList;
  cls.remove("dark", "minecraft");
  if (t === "dark" || t === "minecraft") cls.add(t);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored && THEME_CYCLE.includes(stored)) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const t = prefersDark ? "dark" : "light";
      setTheme(t);
      applyTheme(t);
    }
  }, []);

  const toggleTheme = () => {
    const idx = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle theme">
        <div className="w-4 h-4" />
      </button>
    );
  }

  const Icon = theme === "light" ? Moon : theme === "dark" ? Pickaxe : Sun;
  const nextLabel = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
      aria-label={`Switch to ${nextLabel} mode`}
      title={`Theme: ${theme}`}
    >
      <Icon className="w-4 h-4 text-foreground" />
    </button>
  );
}
