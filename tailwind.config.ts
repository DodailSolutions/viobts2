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
          blue: "#0c34cd",
          blueHover: "#0a2cb0",
          cyan: "#00B4D8",
          accent: "#0284C7",
          navy: "#0A101D",
        },
        primary: {
          DEFAULT: "#0c34cd",
          hover: "#0a2cb0",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#4f46e5",
          600: "#0c34cd",
          700: "#0a2cb0",
          800: "#082182",
          900: "#06185f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 12px 30px -10px rgba(12, 52, 205, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 4px 20px -2px rgba(12, 52, 205, 0.25)",
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
