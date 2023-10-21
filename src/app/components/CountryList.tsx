import { Children, PropsWithChildren } from 'react';
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
            <ul>
                <li className={styles.countries_container}>
                    {countries &&
                        countries.map((country, i) => (
                            <Country
                                key={i}
                                {...country}
                            />
                        ))}
                    {children}
                </li>
            </ul>
            {remaining > 0 && <LoadMoreButton />}
        </>
    );
};

export default CountryList;
