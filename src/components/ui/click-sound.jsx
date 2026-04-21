"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'button, a, [role="button"], [role="tab"], [role="switch"], [role="checkbox"], [role="link"], input[type="checkbox"], input[type="radio"], summary';

export function ClickSound() {
  const audioCtxRef = useRef(null);
  const bufferRef = useRef(null);

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    fetch("/minecraft-click.mp3")
      .then((r) => r.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf))
      .then((decoded) => {
        bufferRef.current = decoded;
      })
      .catch(() => {});
    return () => {
      ctx.close();
      audioCtxRef.current = null;
      bufferRef.current = null;
    };
  }, []);

  useEffect(() => {
    function onPointerDown(e) {
      const target = e.target;
      if (!target?.closest?.(INTERACTIVE)) return;
      const ctx = audioCtxRef.current;
      const buffer = bufferRef.current;
      if (!ctx || !buffer) return;
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = 0.5;
      source.buffer = buffer;
      source.connect(gain).connect(ctx.destination);
      source.start();
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

  return null;
}
