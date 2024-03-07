import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "about-panel": {
          1: "var(--about-panel-1-color)",
          2: "var(--about-panel-2-color)",
        },
        panel: "var(--background-panel-color)",
        backest: "var(--background-color)",
        fg: {
          1: "var(--foreground-1-color)",
          2: {
            1: "var(--foreground-2-1-color)",
            2: "var(--foreground-2-2-color)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
