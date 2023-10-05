import { useEffect, useRef, useState } from 'react';
import styles from './FilterDropdown.module.scss';
import ChevronDown from './icons/ChevronDown';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useFilterContext from '../hooks/useFilterContext';
import { CountryLimitActionKind } from '../context/FilterContext';

const FilterMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const filters = ['africa', 'americas', 'asia', 'europe', 'oceania'];
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const { region, setRegion, setCountriesLimit } = useFilterContext();
    const handleChange = (selectedRegion: string | null) => {
        setRegion(selectedRegion);
        setCountriesLimit({ type: CountryLimitActionKind.RESET });
    };

    useOnClickOutside(menuBtnRef, () => {
        setIsOpen(false);
    });

    useEffect(() => {
        setIsOpen(false);
    }, [region]);

    return (
        <div className={styles.menu_container}>
            {!region && (
                <button
                    id="filter-dropdown-btn"
                    aria-expanded={isOpen}
                    type="button"
                    ref={menuBtnRef}
                    className={styles.btn}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Filter by Region
                    <ChevronDown
                        width={10}
                        height={10}
                    />
                </button>
            )}
            {region && (
                <button
                    type="button"
                    ref={menuBtnRef}
                    className={styles.btn_region_selected}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {region}
                    <ChevronDown
                        width={10}
                        height={10}
                    />
                </button>
            )}

            {isOpen && (
                <div className={styles.filter_options}>
                    <ul aria-labelledby="filter-dropdown-btn">
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    className={styles.list_item}
                                    onChange={() => handleChange(null)}
                                />
                                All
                            </label>
                        </li>

                        {filters.map((filter, i) => (
                            <li key={i}>
                                <label>
                                    <input
                                        type="radio"
                                        className={styles.list_item}
                                        onChange={() => handleChange(filter)}
                                    />
                                    {filter}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;
