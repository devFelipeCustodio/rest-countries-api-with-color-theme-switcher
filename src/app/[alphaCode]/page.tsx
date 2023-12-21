import Link from 'next/link';
import ErrorMessage from '../components/ErrorMessage';
import styles from './page.module.scss';
import BackButton from '../components/BackButton';

type TCountry = {
    flags: { svg: string };
    name: { common: string };
    altSpellings: Array<string>;
    population: number;
    region: string;
    subregion: string;
    capital: Array<string>;
    tld: Array<string>;
    currencies: { [key: string]: { name: string } };
    languages: { [key: string]: [key: string] };
    borders: Array<string>;
    cca3: string;
};

let country: TCountry;

export async function generateMetadata({
    params,
}: {
    params: { alphaCode: string };
}) {
    return {
        title:
            country?.name?.common ||
            params.alphaCode.toUpperCase(),
    };
}

const CountryPage = async ({ params }: { params: { alphaCode: string } }) => {
    const alphaCode = params.alphaCode;

    try {
        const FIELDS = [
            'flags',
            'name',
            'population',
            'region',
            'subregion',
            'capital',
            'tld',
            'currencies',
            'languages',
            'borders',
            'altSpellings',
            'cca3',
        ];

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/all?fields=${FIELDS.join(',')}`
        );

        if (!res.ok) {
            throw Error('Country not found.');
        }
        const data: Array<TCountry> = await res.json();
        country = data.filter(
            (c) => c.cca3.toLowerCase() === alphaCode.toLowerCase()
        )[0];
        if (!country) throw Error('Country not found.');
    } catch (e: any) {
        return (
            <div className={styles.container}>
                <ErrorMessage message={e.message} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <BackButton />
            <div className={styles.country}>
                <img
                    src={country.flags.svg}
                    alt={`${country.name.common}'s flag`}
                />
                <div className={styles.data_container}>
                    <h2>{country.name.common}</h2>
                    <div className={styles.data}>
                        <div className={styles.core_data}>
                            <p>
                                <span>Native Name: </span>
                                {country.altSpellings[1]}
                            </p>
                            {country.population !== null &&
                                country.population !== undefined && (
                                    <p>
                                        <span>Population: </span>
                                        {country.population.toLocaleString(
                                            'en-US'
                                        )}
                                    </p>
                                )}
                            <p>
                                <span>Region: </span>
                                {country.region}
                            </p>
                            <p>
                                <span>Sub Region: </span>
                                {country.subregion}
                            </p>
                            {country.capital && (
                                <p>
                                    <span>Capital: </span>
                                    {country.capital}
                                </p>
                            )}
                        </div>
                        <div className={styles.extra_data}>
                            <p>
                                <span>Top Level Domain: </span>
                                {country.tld.join(', ')}
                            </p>
                            <p>
                                <span>Currencies: </span>
                                {Object.keys(country.currencies)
                                    .map(
                                        (c) =>
                                            country.currencies[
                                                c
                                            ].name[0].toUpperCase() +
                                            country.currencies[c].name.slice(1)
                                    )
                                    .join(', ')}
                            </p>
                            <p>
                                <span>Languages: </span>
                                {Object.keys(country.languages)
                                    .map((l) => country.languages[l])
                                    .join(', ')}
                            </p>
                        </div>
                    </div>

                    {country.borders.length > 0 && (
                        <div className={styles.border_countries}>
                            <h3>Border Countries:</h3>
                            <div>
                                {country.borders.map((c) => (
                                    <Link
                                        key={c}
                                        href={c.toLowerCase()}
                                    >
                                        {c}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountryPage;
