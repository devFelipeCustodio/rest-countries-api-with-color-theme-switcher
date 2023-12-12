'use client';

import Link from 'next/link';
import styles from './MainHeader.module.scss';
import SunFill from './icons/Moon';
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
                <Link href="/">
                    <h1>Where in the world?</h1>
                </Link>
                <button
                    type="button"
                    onClick={toggleTheme}
                    data-hide-on-theme="dark"
                >
                    <SunFill
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
