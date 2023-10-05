import { useEffect, useRef, useTransition } from 'react';
import Search from '../components/icons/Search';
import { CountryLimitActionKind } from '../context/FilterContext';
import useFilterContext from '../hooks/useFilterContext';
import styles from './SearchBar.module.scss';
import { useSearchParams } from 'next/navigation';

const SearchBar = () => {
    const { query, setQuery, setCountriesLimit } = useFilterContext();
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const queryFromParam = searchParams.get('q');

    const handleInput = (value: string | null) => {
        startTransition(() => {
            setQuery(value);
            setCountriesLimit({ type: CountryLimitActionKind.RESET });
        });
    };

    useEffect(() => {
        if (inputRef.current && queryFromParam) {
            inputRef.current.value = queryFromParam;
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
                onInput={(e) => handleInput(e.currentTarget.value)}
                autoComplete='no'
            />
        </div>
    );
};

export default SearchBar;
