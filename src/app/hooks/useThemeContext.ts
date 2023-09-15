'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context)
        throw Error(
            'useThemeContext should be used within a ThemeContextProvider'
        );
    return context;
}

export default useThemeContext;
