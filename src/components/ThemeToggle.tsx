import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setIsDark(initial);
    document.body.classList.toggle("light", !initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.body.classList.toggle("dark", !newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <label className="theme-toggle" onClick={toggleTheme}>
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
      {isDark ? "Dark Mode" : "Light Mode"}
    </label>
  );
};

export default ThemeToggle;
