'use client';

import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

function useFilterContext() {
    const context = useContext(FilterContext);
    if (!context)
        throw Error(
            'useFilterContext should be used within a FilterContextProvider'
        );
    return context;
}

export default useFilterContext;
