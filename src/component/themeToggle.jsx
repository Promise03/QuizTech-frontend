import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import React from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-custom bg-button-gradient text-text-dark 
                 hover:shadow-glow transition-all duration-500 ease-in-out 
                 transform hover:scale-105 active:scale-95"
    >
      {theme === "light" ? (
        <>
          <Moon size={18} className="transition-transform duration-500 rotate-0" />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun size={18} className="transition-transform duration-500 rotate-180" />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
