import styles from './FilterDropdown.module.scss';
import ChevronDown from './icons/ChevronDown';

const FilterDropdown = () => {
    return (
        <div className={styles.menu_container}>
            <button>
                Filter by Region
                <ChevronDown
                    width={10}
                    height={10}
                />
            </button>
            <div style={{ display: 'none' }}>
                <ul>
                    <li>Africa</li>
                    <li>America</li>
                    <li>Asia</li>
                    <li>Europe</li>
                    <li>Oceania</li>
                </ul>
            </div>
        </div>
    );
};

export default FilterDropdown;
