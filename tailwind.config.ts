import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        "card-elevated": "var(--card-elevated)",
        "border-line": "var(--border-line)",
        "text-primary": "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-dark": "var(--text-dark)",
        accent: "var(--accent)",
        "app-accent": "var(--app-accent)",
        "app-accent-text": "#4bdceb",
        "header-bg": "var(--header-bg)",
        "player-bg": "var(--player-bg)",
        "notice-bg": "var(--notice-bg)",
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
