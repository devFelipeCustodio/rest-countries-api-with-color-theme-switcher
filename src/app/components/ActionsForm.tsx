import { FormEvent, useEffect } from 'react';
import FilterMenu from './FilterDropdown';
import SearchBar from './SearchBar';
import useFilterContext from '../hooks/useFilterContext';
import { usePathname, useRouter } from 'next/navigation';

const ActionsForm = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { region, query, countriesLimit } = useFilterContext();

    const setSearchParams = () => {
        const searchParams = new URLSearchParams();
        if (query) {
            searchParams.set('q', query.trim());
        }
        if (region) {
            searchParams.set('region', region.trim());
        }
        if (
            countriesLimit.value &&
            countriesLimit.value !== countriesLimit.default
        ) {
            searchParams.set('max', countriesLimit.value.toString());
        }
        router.push(`${pathname}?${searchParams.toString()}`, {
            scroll: false,
        });
    };

    useEffect(() => {
        if (!query && !region && !countriesLimit) return;
        setSearchParams();
    }, [query, region, countriesLimit]);

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
