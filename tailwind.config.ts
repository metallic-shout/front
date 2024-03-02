import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridAutoRows: {
        "about-panel": " max-content",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        panel: "var(--background-panel-color)",
        backest: "var(--background-color)",
      },
      borderColor: {
        primary: "var(--foreground-color)",
      },
      gridTemplateColumns: {
        platte: "100% 0",
      },
      gridTemplateRows: {
        platte: "1fr 5rem",
      },
      gradientColorStops: {
        "about-panel": {
          1: "#373b4b",
          2: "#37414b",
          3: "#374a4b",
          4: "#374b44",
        },
      },
      textColor: {
        "theme-bg": "var(--background-color)",
        theme: "var(--foreground-color)",
      },
      padding: {
        "about-panel": "10vw",
      },
    },
  },
  plugins: [],
};
export default config;
