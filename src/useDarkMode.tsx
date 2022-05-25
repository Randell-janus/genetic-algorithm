import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState<string>("light");
  const colorTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.add(theme);
    root.classList.remove(colorTheme);
  }, [setTheme, colorTheme]);
  return [setTheme, colorTheme] as const;
};

export default useDarkMode;
