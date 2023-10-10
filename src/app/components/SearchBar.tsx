import { useEffect, useRef } from 'react';
import Search from '../components/icons/Search';
import { CountryLimitActionKind } from '../context/FilterContext';
import useFilterContext from '../hooks/useFilterContext';
import styles from './SearchBar.module.scss';
import {  useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
    const { query, setQuery, setCountriesLimit } = useFilterContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const debounced = useDebouncedCallback((value: string | null) => {
        setQuery(value);
        setCountriesLimit({ type: CountryLimitActionKind.RESET });
    }, 800);

    useEffect(() => {
        if (inputRef.current && query) {
            inputRef.current.value = query;
        }
    }, []);

    return (
        <div className={styles.searchbar_container}>
            <div className={styles.icon_container}>
                <Search
                    width={16}
                    height={16}
                />
            </div>
            <input
                ref={inputRef}
                aria-label="Country search"
                type="text"
                placeholder="Search for a country..."
                name="query"
                onInput={(e) => debounced(e.currentTarget.value)}
                autoComplete="no"
            />
        </div>
    );
};

export default SearchBar;
