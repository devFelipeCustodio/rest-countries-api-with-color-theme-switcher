'use client';

import { useSearchParams } from 'next/navigation';
import {
    Dispatch,
    SetStateAction,
    createContext,
    useReducer,
    useState,
} from 'react';

export enum CountryLimitActionKind {
    RESET = 'RESET',
    INCREASE = 'INCREASE',
}

type CountryLimitAction = {
    type: CountryLimitActionKind;
    payload?: string;
};

type CountryLimitState = {
    value: number;
    default: number;
};

type Props = {
    region: null | string;
    setRegion: Dispatch<SetStateAction<null | string>>;
    query: null | string;
    setQuery: Dispatch<SetStateAction<null | string>>;
    countriesLimit: CountryLimitState;
    setCountriesLimit: Dispatch<CountryLimitAction>;
};

export const FilterContext = createContext<null | Props>(null);

function countryLimitReducer(
    state: CountryLimitState,
    action: CountryLimitAction
) {
    const { type, payload } = action;
    switch (type) {
        case CountryLimitActionKind.RESET:
            return { ...state, value: state.default };
        case CountryLimitActionKind.INCREASE:
            if (payload) {
                return {
                    ...state,
                    value: parseInt(payload),
                };
            }
            return {
                ...state,
                value: state.value
                    ? state.value + state.default
                    : state.default,
            };

        default:
            return state;
    }
}

export default function FilterContextProvider({
    children,
}: React.PropsWithChildren) {
    const searchParams = useSearchParams();
    const queryFromParam = searchParams.get('q');
    const regionFromParam = searchParams.get('region');
    const maxFromParam = searchParams.get('max');
    const [query, setQuery] = useState<null | string>(queryFromParam);
    const [region, setRegion] = useState<null | string>(
        regionFromParam ? regionFromParam[0] + regionFromParam.slice(1) : null
    );
    const [countriesLimit, setCountriesLimit] = useReducer(
        countryLimitReducer,
        { value: maxFromParam ? parseInt(maxFromParam) : 15, default: 15 }
    );

    return (
        <FilterContext.Provider
            value={{
                region,
                setRegion,
                query,
                setQuery,
                countriesLimit,
                setCountriesLimit,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
