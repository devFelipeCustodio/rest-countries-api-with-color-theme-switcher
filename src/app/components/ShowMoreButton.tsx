import { CountryLimitActionKind } from '../context/FilterContext';
import useSearch from '../hooks/useSearch';
import useFilterContext from '../hooks/useFilterContext';
import styles from './ShowMoreButton.module.scss';

export const ShowMoreButton = () => {
    const { setCountriesLimit } = useFilterContext();
    const { isLoading } = useSearch();
    const handleClick = () => {
        setCountriesLimit({ type: CountryLimitActionKind.INCREASE });
    };
    return (
        <button
            type="button"
            className={styles.load_more_btn}
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Show more'}
        </button>
    );
};

export default ShowMoreButton;
