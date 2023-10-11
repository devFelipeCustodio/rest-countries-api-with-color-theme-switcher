'use client';

import styles from './page.module.scss';
import ScrollerButton from '../components/ScrollerButton';
import CountryList from '../components/CountryList';
import ActionsForm from '../components/ActionsForm';
import useFilterContext from '../hooks/useFilterContext';
import useCountries from '../hooks/useCountries';
import ErrorMessage from '../components/ErrorMessage';
import { useEffect } from 'react';

const Page = () => {
    const { query, countriesLimit, region } = useFilterContext();
    const { countries, error } = useCountries();

    useEffect(() => {
        console.log(countries);
    }, [countries]);

    return (
        <div className={styles.container}>
            <ActionsForm />
            <main>
                {countries && countries.total > 0 && countriesLimit && (
                    <CountryList
                        remaining={countries.total - countriesLimit.value}
                        countries={countries.entries}
                    />
                )}
                {(countries?.total === 0 || error) &&
                    (region ? (
                        <ErrorMessage
                            message={`No matches for "${query}" in region "${
                                region[0].toUpperCase() + region.slice(1)
                            }".`}
                        />
                    ) : (
                        <ErrorMessage message={`No matches for "${query}".`} />
                    ))}
            </main>
            <ScrollerButton />
        </div>
    );
};

export default Page;
