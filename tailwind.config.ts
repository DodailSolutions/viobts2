import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          light: "#FFFFFF",
          offwhite: "#F8FAFC",
          subtle: "#F1F5F9",
          border: "#E2E8F0",
          text: "#0F172A",
          muted: "#64748B",
          blue: "#0066FF",
          blueHover: "#0052CC",
          cyan: "#00B4D8",
          accent: "#0284C7",
          navy: "#0A101D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 12px 30px -10px rgba(0, 102, 255, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 4px 20px -2px rgba(0, 102, 255, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-delayed": "float 5s ease-in-out 2.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
