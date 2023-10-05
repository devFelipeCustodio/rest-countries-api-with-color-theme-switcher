'use client';

import { CountryLimitActionKind } from '../context/FilterContext';
import useFilterContext from '../hooks/useFilterContext';
import styles from './LoadMoreButton.module.scss';

const LoadMoreButton = () => {
    const { setCountriesLimit } = useFilterContext();
    const loadMore = () =>
        setCountriesLimit({ type: CountryLimitActionKind.INCREASE });
    return (
        <button
            className={styles.load_more_btn}
            onClick={loadMore}
        >
            Load more
        </button>
    );
};

export default LoadMoreButton;
