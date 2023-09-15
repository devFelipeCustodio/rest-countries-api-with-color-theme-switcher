'use client';

import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

type Themes = 'light' | 'dark';

type Props = {
    theme: null | Themes;
    setTheme: Dispatch<SetStateAction<null | Themes>>;
};

export const ThemeContext = createContext<null | Props>(null);

const getRootClass = () => document.documentElement.className as Themes;
const setRootClass = (name: string) =>
    (document.documentElement.className = name);

export default function ThemeContextProvider({
    children,
}: React.PropsWithChildren) {
    const [theme, setTheme] = useState<null | Themes>(null);

    useEffect(() => {
        setTheme(getRootClass());
    }, []);

    useEffect(() => {
        document.cookie = `theme=${theme}`;
        if (!theme) return;
        setRootClass(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
