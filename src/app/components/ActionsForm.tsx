'use client';

import { FormEvent, useDeferredValue, useEffect } from 'react';
import FilterMenu from './FilterDropdown';
import SearchBar from './SearchBar';
import useActionsContext from '../hooks/useActionsContext';
import { usePathname, useRouter } from 'next/navigation';

const ActionsForm = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { region, query, maxCountries } = useActionsContext();
    const deferredQuery = useDeferredValue(query);

    const setSearchParams = () => {
        router.push(
            `${pathname}?q=${deferredQuery || ''}&region=${
                region || ''
            }&max=${maxCountries}`,
            { scroll: false }
        );
    };

    useEffect(() => {
        if (!deferredQuery && !region && !maxCountries) return;
        setSearchParams();
    }, [deferredQuery, region, maxCountries]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearchParams();
    };

    return (
        <form onSubmit={handleSubmit}>
            <SearchBar />
            <FilterMenu />
        </form>
    );
};

export default ActionsForm;
