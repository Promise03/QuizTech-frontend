import { defineConfig } from "tailwindcss";

export default defineConfig({
  darkMode: "class", // enable .light-mode / dark mode switching
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--primary)",
      "primary-light": "var(--primary-light)",
      "primary-dark": "var(--primary-dark)",

      secondary: "var(--secondary)",
      accent: "var(--accent)",

      "text-dark": "var(--text-dark)",
      "text-light": "var(--text-light)",

      "bg-light": "var(--bg-light)",
      "bg-medium": "var(--bg-medium)",
      "bg-dark": "var(--bg-dark)",
      "card-bg": "var(--card-bg)",

      "nav-bg": "var(--nav-bg)",
      "border-color": "var(--border-color)",
    },
    extend: {
      boxShadow: {
        glow: "0 0 15px var(--glow-color)",
        custom: "var(--shadow)",
      },
      backgroundImage: {
        "button-gradient": "var(--button-gradient)",
      },
    },
  },
});
