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
        bg: "#0f1115",
        card: "#171a21",
        "card-elevated": "#1f2430",
        "border-line": "rgba(255, 255, 255, 0.18)",
        "text-primary": "#fffaf0",
        "text-muted": "#d6dbe5",
        "text-dark": "#8892b0",
        accent: "#c7ff5a", // shameis.com signature lime green
        "app-accent": "#2eb8c8", // secondary cyan
        "app-accent-text": "#4bdceb",
        "app-accent-deep": "#06343a",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-ibm-plex)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.45)",
        "glow-lime": "0 0 20px rgba(199, 255, 90, 0.25)",
        "glow-cyan": "0 0 20px rgba(46, 184, 200, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
