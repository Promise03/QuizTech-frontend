import { useEffect, useState } from "react";
import React from "react";

export function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // Trigger overlay animation
    const overlay = document.createElement("div");
    overlay.classList.add("theme-transition", "active");
    document.body.appendChild(overlay);

    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, 100); // apply theme after short delay

    // setTimeout(() => {
    //   overlay.classList.remove("active");
    //   setTimeout(() => overlay.remove(), 400); // cleanup
    // }, 400);
  };

  return { theme, toggleTheme };
}
