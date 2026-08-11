"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const ThemeContext = createContext({ mounted: false });

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ visibility: "hidden" }}>{children}</div>;
    }

    return (
        <ThemeContext.Provider value={{ mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
