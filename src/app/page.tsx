import FilterDropdown from './components/FilterDropdown';
import SearchBar from './components/SearchBar';
import styles from './page.module.scss';

const Page = () => {
    return (
        <div className={styles.container}>
            <SearchBar />
            <FilterDropdown />
            <main></main>
        </div>
    );
};

export default Page;
