import styles from './SearchBar.module.scss';
import Search from '../components/icons/Search'

const SearchBar = () => {
    return (
        <div className={styles.searchbar_container}>
            <Search width={28} height={28} />
            <input
                aria-label="Country search"
                type="text"
                placeholder="Search for a country..."
            />
        </div>
    );
};

export default SearchBar;
