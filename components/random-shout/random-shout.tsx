"use client";

import { useCallback } from "react";
import { useMount } from "react-use";
import { shoutRandom } from "@/src/shout-random";
import { TextView } from "./text-view";
import { useApplyShout, useShoutContent } from "../atom";

export const RandomShout: React.FC = () => {
  const applyShout = useApplyShout();
  const setRandomShout = useCallback(() => {
    applyShout(shoutRandom());
  }, [applyShout]);
  useMount(() => {
    setRandomShout();
  });
  const shout = useShoutContent();

  return (
    <div className="px-10 h-1/3">
      <div
        className={`
          rounded-xl
          border-primary
          border
          overflow-hidden
          items-stretch
          `}
      >
        <button
          className="border-r border-primary px-3 bg-panel w-max"
          onClick={setRandomShout}
        >
          →
        </button>
        <div className="pl-5 justify-start">
          {shout == null ? null : <TextView text={shout} />}
        </div>
      </div>
    </div>
  );
};
