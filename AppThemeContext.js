'use client'

// if the OS theme is darkmode:
// window.matchMedia('(prefers-color-scheme: dark)').matches

import { createContext, useEffect, useState } from "react";

export const AppThemeContext = createContext()

export default function AppThemeContextProvider({ children }) {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const handleThemeChange = (newTheme) => {
        document.documentElement.classList.toggle("dark", (newTheme === "dark" || newTheme === "os-dark"));
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        if (theme == 'light') {
            handleThemeChange('light');
        }
        if (theme == 'dark') {
            handleThemeChange('dark');
        }
        if (theme.startsWith('os')) {
            const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            const osDefaultTheme = systemDarkMode ? "os-dark" : "os-light"
            handleThemeChange(osDefaultTheme)
        }
    }, [theme]);

    return (
        <AppThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </AppThemeContext.Provider>
    )
}