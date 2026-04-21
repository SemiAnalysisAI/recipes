"use client";

import { useState, useEffect } from "react";
import { Pokeballs } from "./Pokeballs";

export function PokemonBackground() {
  const [isPokemon, setIsPokemon] = useState(false);

  useEffect(() => {
    function check() {
      setIsPokemon(document.documentElement.classList.contains("pokemon"));
    }
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!isPokemon) return null;

  return <Pokeballs />;
}
