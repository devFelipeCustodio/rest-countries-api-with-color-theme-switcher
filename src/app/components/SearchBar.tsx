import styles from './SearchBar.module.scss';
import Search from '../components/icons/Search';

const SearchBar = () => {
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
            />
        </div>
    );
};

export default SearchBar;
