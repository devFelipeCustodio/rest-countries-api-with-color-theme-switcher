import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Country.module.scss';

function CountrySkeleton() {
    return (
        <div className={styles.country_container}>
            <ContentLoader
                speed={2}
                width={256}
                height={336}
                backgroundColor={'black'}
                backgroundOpacity={0.05}
                foregroundColor={'black'}
                foregroundOpacity={0.15}
            >
                <rect
                    x="0"
                    y="0"
                    rx="0"
                    ry="0"
                    width="256"
                    height="161"
                />
                <rect
                    x="20"
                    y="184"
                    rx="5"
                    ry="5"
                    width="100"
                    height="21"
                />
                <rect
                    x="20"
                    y="222"
                    rx="5"
                    ry="5"
                    width="180"
                    height="19"
                />
                <rect
                    x="20"
                    y="246"
                    rx="5"
                    ry="5"
                    width="150"
                    height="19"
                />
                <rect
                    x="20"
                    y="271"
                    rx="5"
                    ry="5"
                    width="120"
                    height="19"
                />
            </ContentLoader>
        </div>
    );
}

export default CountrySkeleton;
