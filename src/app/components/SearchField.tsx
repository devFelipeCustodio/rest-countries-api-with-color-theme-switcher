import { useSearchFieldState } from 'react-stately';
import {
    useSearchField,
    AriaSearchFieldProps,
    AriaButtonProps,
    useButton,
} from 'react-aria';
import { useEffect, useRef } from 'react';
import styles from './SearchField.module.scss';
import Search from './icons/Search';
import XSquare from './icons/XSquare';
import useFilterContext from '../hooks/useFilterContext';
import { useDebouncedCallback } from 'use-debounce';
import { CountryLimitActionKind } from '../context/FilterContext';

function Button(props: AriaButtonProps) {
    let ref = useRef(null);
    let { buttonProps } = useButton(props, ref);
    return (
        <button
            {...buttonProps}
            ref={ref}
        >
            {props.children}
        </button>
    );
}

function SearchField(props: AriaSearchFieldProps) {
    let state = useSearchFieldState(props);
    let ref = useRef<HTMLInputElement>(null);
    let { inputProps, clearButtonProps } = useSearchField(props, state, ref);

    const { query, setQuery, setCountriesLimit } = useFilterContext();

    const debounced = useDebouncedCallback(() => {
        setQuery(state.value);
        setCountriesLimit({ type: CountryLimitActionKind.RESET });
    }, 800);

    useEffect(() => {
        if (query) state.setValue(query);
    }, []);

    return (
        <div className={styles.searchbar_container}>
            <div className={styles.icon_container}>
                <Search
                    aria-hidden
                    width={16}
                    height={16}
                />
            </div>
            <input
                {...inputProps}
                ref={ref}
                placeholder="Search for a country..."
                name="query"
                autoComplete="false"
                onInput={debounced}
            />
            {state.value !== '' && (
                <Button
                    {...clearButtonProps}
                    type="button"
                    onPressEnd={() => setQuery(null)}
                >
                    <XSquare
                        aria-hidden
                        width={16}
                        height={16}
                    />
                </Button>
            )}
        </div>
    );
}

export default SearchField;
