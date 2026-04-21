"use client";

import { useState, useEffect } from "react";
import { XpDrops } from "./XpDrops";

export function OsrsBackground() {
  const [isOsrs, setIsOsrs] = useState(false);

  useEffect(() => {
    function check() {
      setIsOsrs(document.documentElement.classList.contains("osrs"));
    }
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!isOsrs) return null;

  return <XpDrops />;
}
