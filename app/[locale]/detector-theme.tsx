"use client";

import { useMemo, useState, useCallback, ReactNode } from "react";
import type { IconType } from "react-icons";

interface Props {
  children: [ReactNode, ReactNode];
}

type Theme = "dark" | "light";

const toggleThemeString = (current: Theme) => {
  return current === "dark" ? "light" : "dark";
};

const useSwitchTheme = () => {
  const initTheme = useMemo(() => {
    if (typeof localStorage === "undefined") return "dark";
    return localStorage.getItem("theme") ?? "dark";
  }, []) as Theme;
  const [theme, setTheme] = useState<Theme>(initTheme);
  const switchTheme = useCallback(() => {
    setTheme((current) => {
      const next = toggleThemeString(current);
      window.localStorage.setItem("theme", next);
      return next;
    });
  }, []);
  return { theme, switchTheme };
};

export const DetectorTheme = ({
  children: [darkIconEl, lightIconEl],
}: Props) => {
  const { switchTheme, theme } = useSwitchTheme();
  return (
    <button
      data-detect-theme={theme}
      onClick={switchTheme}
      className={`
        relative
    `}
    >
      <div
        className={`
        absolute
        visible
        [*[data-detect-theme="light"]>&]:invisible
        justify-end
      `}
      >
        {darkIconEl}
      </div>
      <div
        className={`
        absolute
        invisible
        [*[data-detect-theme="light"]>&]:visible
        justify-end
      `}
      >
        {lightIconEl}
      </div>
    </button>
  );
};
