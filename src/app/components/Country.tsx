import Link from 'next/link';
import styles from './Country.module.scss';

export type CountryProps = {
    name: { common: string };
    flags: { svg: string };
    population: number;
    region: string;
    capital: string[];
    cca3: string;
};

const Country = ({
    flags,
    name,
    population,
    region,
    capital,
    cca3,
}: CountryProps) => {
    return (
        <div className={styles.country_container}>
            <img
                src={flags.svg}
                alt={`${name.common}'s flag`}
            />
            <div className={styles.body}>
                <Link href={`${cca3.toLowerCase()}`}>{name.common}</Link>
                <div className={styles.info}>
                    {population !== null && population !== undefined && (
                        <p>
                            <span>Population: </span>
                            {population.toLocaleString('en-US')}
                        </p>
                    )}
                    <p>
                        <span>Region:</span> {region}
                    </p>
                    {capital && (
                        <p>
                            <span>Capital:</span> {capital}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Country;
