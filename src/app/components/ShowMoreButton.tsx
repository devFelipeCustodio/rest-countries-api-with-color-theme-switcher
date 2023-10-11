import { CountryLimitActionKind } from '../context/FilterContext';
import useCountries from '../hooks/useCountries';
import useFilterContext from '../hooks/useFilterContext';
import styles from './ShowMoreButton.module.scss';

export const ShowMoreButton = () => {
    const { setCountriesLimit } = useFilterContext();
    const { isLoading } = useCountries();
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
            Show more
        </button>
    );
};

export default ShowMoreButton;
