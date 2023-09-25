'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

type Props = {
    region: null | string;
    setRegion: Dispatch<SetStateAction<null | string>>;
    query: null | string;
    setQuery: Dispatch<SetStateAction<null | string>>;
    maxCountries: null | number;
    setMaxCountries: Dispatch<SetStateAction<null | number>>;
};

export const ActionsContext = createContext<null | Props>(null);

export default function ActionsContextProvider({
    children,
}: React.PropsWithChildren) {
    const [region, setRegion] = useState<null | string>(null);
    const [query, setQuery] = useState<null | string>(null);
    const [maxCountries, setMaxCountries] = useState<null | number>(null);

    return (
        <ActionsContext.Provider
            value={{
                region,
                setRegion,
                query,
                setQuery,
                maxCountries,
                setMaxCountries,
            }}
        >
            {children}
        </ActionsContext.Provider>
    );
}
