'use client';

import { useContext } from 'react';
import { ActionsContext } from '../context/ActionsContext';

function useActionsContext() {
    const context = useContext(ActionsContext);
    if (!context)
        throw Error(
            'useActionsContext should be used within a ActionsContextProvider'
        );
    return context;
}

export default useActionsContext;
