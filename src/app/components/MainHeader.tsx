'use client';

import styles from './MainHeader.module.scss';
import Moon from './icons/Moon';
import MoonFill from './icons/MoonFill';
import { useTheme } from 'next-themes';

const MainHeader = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <header className={styles.main_header}>
            <nav>
                    <h1>Where in the world?</h1>
                <button
                    type="button"
                    onClick={toggleTheme}
                    data-hide-on-theme="dark"
                >
                    <Moon
                        width={14}
                        height={14}
                    />
                    Light Mode
                </button>
                <button
                    type="button"
                    onClick={toggleTheme}
                    data-hide-on-theme="light"
                >
                    <MoonFill
                        width={14}
                        height={14}
                    />
                    Dark Mode
                </button>
            </nav>
        </header>
    );
};

export default MainHeader;
