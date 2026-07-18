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
        page: "#ffffff",
        paper: "#ffffff",
        surface: "#f8fafc",
        ink: "#0f172a",
        muted: "#64748b",
        line: "rgba(15,23,42,0.08)",
        blue: "#3b82f6",
        accent: "#6366f1",
        "accent-hover": "#4f46e5",
        violet: "#8b5cf6",
        rose: "#f43f5e",
        lime: "#84cc16",
        teal: "#14b8a6",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 10px 40px rgba(15,23,42,0.06)",
        "card-hover": "0 20px 60px rgba(15,23,42,0.10)",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "28px",
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
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
