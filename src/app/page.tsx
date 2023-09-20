import FilterMenu from './components/FilterMenu';
import SearchBar from './components/SearchBar';
import styles from './page.module.scss';

const Page = () => {
    return (
        <div className={styles.container}>
            <SearchBar />
            <FilterMenu />
            <main></main>
        </div>
    );
};

export default Page;
