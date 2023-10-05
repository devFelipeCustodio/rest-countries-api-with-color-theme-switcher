'use client';

import styles from './page.module.scss';
import ScrollerButton from '../components/ScrollerButton';
import CountryList from '../components/CountryList';
import ActionsForm from '../components/ActionsForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useFilterContext from '../hooks/useFilterContext';
import useCountries from '../hooks/useCountries';
import ErrorMessage from '../components/ErrorMessage';
import { CountryLimitActionKind } from '../context/FilterContext';

const Page = () => {
    const {
        query,
        setQuery,
        region,
        setRegion,
        countriesLimit,
        setCountriesLimit,
    } = useFilterContext();
    const { countries, isLoading } = useCountries();
    const searchParams = useSearchParams();
    const queryFromParam = searchParams.get('q');
    const regionFromParam = searchParams.get('region');
    const maxFromParam = searchParams.get('max');

    useEffect(() => {
        if (queryFromParam) setQuery(queryFromParam);
        if (regionFromParam) setRegion(regionFromParam);
        if (maxFromParam)
            setCountriesLimit({
                type: CountryLimitActionKind.INCREASE,
                payload: maxFromParam,
            });
    }, []);

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
                {!countries ||
                    (countries.total === 0 && (
                        <ErrorMessage
                            message={`No matches for "${queryFromParam}".`}
                        />
                    ))}
            </main>
            <ScrollerButton />
        </div>
    );
};

export default Page;
