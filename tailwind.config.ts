import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#f8faff",
        paper: "#ffffff",
        ink: "#0c0e12",
        muted: "#687080",
        line: "rgba(16,20,30,0.11)",
        blue: "#3c63ff",
        cyan: "#20c9ff",
        rose: "#ff5d8f",
        lime: "#cfff4a",
        violet: "#8567ff",
        peach: "#ffad7e",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 26px 80px rgba(35,45,78,0.16)",
        soft: "0 14px 40px rgba(35,45,78,0.09)",
      },
      borderRadius: {
        xl: "22px",
        "2xl": "28px",
      },
      letterSpacing: {
        label: "0.12em",
      },
      maxWidth: {
        wrapper: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
