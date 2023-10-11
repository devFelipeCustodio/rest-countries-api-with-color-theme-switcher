import { FormEvent, useEffect } from 'react';
import Select from './Select/Select';
import SearchBar from './SearchBar';
import useFilterContext from '../hooks/useFilterContext';
import { usePathname, useRouter } from 'next/navigation';
import { Item } from 'react-stately';
import { CountryLimitActionKind } from '../context/FilterContext';
import SearchField from './SearchField';

const ActionsForm = () => {
    const router = useRouter();
    const pathname = usePathname();

    const filters = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania'];
    const { region, query, countriesLimit, setCountriesLimit } =
        useFilterContext();

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
            <SearchField aria-label="Country search" />
            <Select
                onSelectionChange={() =>
                    setCountriesLimit({ type: CountryLimitActionKind.RESET })
                }
                aria-label="Filter by Region"
            >
                {filters.map((region, i) => (
                    <Item key={i}>
                        {region[0].toUpperCase() + region.slice(1)}
                    </Item>
                ))}
            </Select>
        </form>
    );
};

export default ActionsForm;
