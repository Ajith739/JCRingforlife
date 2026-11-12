import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext({ theme: "light", setTheme: () => {} });
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const value = localStorage.getItem("jc-admin-theme-v1");
    return value === "light" || value === "dark" ? value : "light";
  });
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () =>
      document
        .querySelector(".aion-admin")
        ?.setAttribute(
          "data-theme",
          theme === "system" ? (media.matches ? "dark" : "light") : theme,
        );
    update();
    localStorage.setItem("jc-admin-theme-v1", theme);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
