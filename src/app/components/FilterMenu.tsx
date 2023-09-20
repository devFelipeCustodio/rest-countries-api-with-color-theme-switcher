'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FilterMenu.module.scss';
import ChevronDown from './icons/ChevronDown';
import useOnClickOutside from '../hooks/useOnClickOutside';

const FilterDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const [filter, setFilter] = useState<null | (typeof regions)[number]>(null);

    useOnClickOutside(menuBtnRef, () => setIsOpen(false));
    useEffect(() => setIsOpen(false), [filter]);

    return (
        <div className={styles.menu_container}>
            <button
                ref={menuBtnRef}
                className={styles.btn}
                onClick={() => setIsOpen(!isOpen)}
            >
                {filter ? filter : 'Filter by Region'}
                <ChevronDown
                    width={10}
                    height={10}
                />
            </button>
            {isOpen && (
                <div className={styles.filter_options}>
                    <ul>
                        {regions.map((region, i) => (
                            <li key={i}>
                                <button
                                    className={styles.list_item_btn}
                                    onClick={() => setFilter(region)}
                                >
                                    {region}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
