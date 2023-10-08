"use client";

import { useRef, useCallback } from "react";
import { RandomAtom } from "@/components/random-atom";
import { CopyButton } from "@/components/copy-button";

export default function Home() {
  const text = useRef(null as string | null);
  const setText = useCallback((target: string) => {
    text.current = target;
  }, []);
  return (
    <main className="w-screen h-screen">
      <RandomAtom setShout={setText} />
      <CopyButton target={text} />
    </main>
  );
}
