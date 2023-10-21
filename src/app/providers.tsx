'use client';
import { ThemeProvider } from 'next-themes';
import FilterContextProvider from './context/FilterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: React.PropsWithChildren) {
    return (
            <QueryClientProvider client={queryClient}>
                <FilterContextProvider>
                    <ThemeProvider attribute="class">{children}</ThemeProvider>
                </FilterContextProvider>
            </QueryClientProvider>
    );
}
