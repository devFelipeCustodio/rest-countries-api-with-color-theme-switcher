'use client';

import styles from './BackButton.module.scss';
import ArrowLeft from './icons/ArrowLeft';

const BackButton = () => {
    return (
        <button
            type="button"
            className={styles.back_button}
            onClick={() => history.back()}
        >
            <ArrowLeft
                width={14}
                height={14}
            />
            <span>Back</span>
        </button>
    );
};

export default BackButton;
