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
        "card-hover": "0 34px 100px rgba(35,45,78,0.22)",
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
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.7s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
