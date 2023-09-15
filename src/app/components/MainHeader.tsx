'use client';

import Link from 'next/link';
import styles from './MainHeader.module.scss';
import useThemeContext from '../hooks/useThemeContext';
import Moon from './icons/Moon';
import MoonFill from './icons/MoonFill';

const MainHeader = () => {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <header className={styles.main_header}>
            <Link href={'/'}>
                <h1>Where in the world?</h1>
            </Link>
            <button type='button' onClick={toggleTheme}>
                {theme === 'dark' ? <Moon /> : <MoonFill />}
                Dark Mode
            </button>
        </header>
    );
};

export default MainHeader;
