import Search from '../components/icons/Search';
import useActionsContext from '../hooks/useActionsContext';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
    const { setQuery, setMaxCountries } = useActionsContext();
    const handleChange = (value: string | null) => {
        setQuery(value);
        setMaxCountries(15);
    };

    return (
        <div className={styles.searchbar_container}>
            <div className={styles.icon_container}>
                <Search
                    width={16}
                    height={16}
                />
            </div>
            <input
                aria-label="Country search"
                type="text"
                placeholder="Search for a country..."
                name="query"
                onChange={(e) => handleChange(e.currentTarget.value)}
            />
        </div>
    );
};

export default SearchBar;
