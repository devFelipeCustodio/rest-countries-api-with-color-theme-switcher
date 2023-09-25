'use client';
import { ThemeProvider } from 'next-themes';
import ActionsContextProvider from './context/ActionsContext';

export function Providers({ children }: React.PropsWithChildren) {
    return (
        <ActionsContextProvider>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
        </ActionsContextProvider>
    );
}
