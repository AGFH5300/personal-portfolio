import { useCallback, useEffect, useState } from "react";

export type PortfolioTheme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";
const EVENT_NAME = "portfolio-theme-change";

function readTheme(): PortfolioTheme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: PortfolioTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<PortfolioTheme>(() => readTheme());

  useEffect(() => {
    applyTheme(theme);

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<PortfolioTheme>).detail;
      if (nextTheme === "light" || nextTheme === "dark") {
        setThemeState(nextTheme);
        applyTheme(nextTheme);
      }
    };

    window.addEventListener(EVENT_NAME, handleThemeChange);
    return () => window.removeEventListener(EVENT_NAME, handleThemeChange);
  }, [theme]);

  const setTheme = useCallback((nextTheme: PortfolioTheme) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    setThemeState(nextTheme);
    window.dispatchEvent(new CustomEvent<PortfolioTheme>(EVENT_NAME, { detail: nextTheme }));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return { theme, setTheme, toggleTheme };
}
