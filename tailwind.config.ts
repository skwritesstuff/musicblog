import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        card: "#0a0a0a",
        "card-elevated": "#141414",
        "border-line": "rgba(255, 255, 255, 0.18)",
        "text-primary": "#fffaf0",
        "text-muted": "#d6dbe5",
        "text-dark": "#8892b0",
        accent: "#f7f308",
        "app-accent": "#2eb8c8",
        "app-accent-text": "#4bdceb",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-ibm-plex)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
