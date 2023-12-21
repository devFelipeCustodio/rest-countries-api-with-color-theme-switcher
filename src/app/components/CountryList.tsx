import { PropsWithChildren } from 'react';
import Country, { CountryProps } from './Country';
import styles from './CountryList.module.scss';
import LoadMoreButton from './ShowMoreButton';

const CountryList = ({
    countries,
    remaining,
    children,
}: {
    countries?: Array<CountryProps>;
    remaining: number;
} & PropsWithChildren) => {
    return (
        <>
            <ul className={styles.countries_list}>
                {countries &&
                    countries.map((country, i) => (
                        <li key={i}>
                            <Country {...country} />
                        </li>
                    ))}
                {children}
            </ul>
            {remaining > 0 && <LoadMoreButton />}
        </>
    );
};

export default CountryList;
