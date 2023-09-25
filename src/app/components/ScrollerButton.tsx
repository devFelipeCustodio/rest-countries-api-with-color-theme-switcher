'use client';

import useHasScrolledPast from '../hooks/useHasScrolledPast';
import ArrowUp from './icons/ArrowUp';
import styles from './ScrollerButton.module.scss';

const ScrollerButton = () => {
    const hasScrolledPast = useHasScrolledPast(500);
    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <>
            {hasScrolledPast && (
                <button type='button'
                    onClick={handleClick}
                    className={styles.Scroller}
                >
                    <ArrowUp />
                </button>
            )}
        </>
    );
};

export default ScrollerButton;
