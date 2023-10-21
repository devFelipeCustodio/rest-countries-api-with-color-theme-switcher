import { useEffect, useState, useTransition } from 'react';
import { CountryProps } from '../components/Country';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useFilterContext from './useFilterContext';

type TCountries = {
    entries: Array<CountryProps>;
    total: number;
};

function useCountries() {
    const { region, query, setQuery, countriesLimit, setCountriesLimit } =
        useFilterContext();
    const [countries, setCountries] = useState<null | TCountries>(null);
    const fields = ['name', 'flags', 'capital', 'region', 'population', 'cca3'];
    const params = new URLSearchParams();
    const queryClient = useQueryClient();

    params.set('fields', fields.join(','));

    useEffect(() => setCountries(null), [query, region]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['countries', query, region, countriesLimit],
        queryFn: async () => {
            let url: string;
            if (!query && !region) {
                url = `${process.env.NEXT_PUBLIC_API_URL}/all/?${params}`;
            } else if (!query && region) {
                url = `${process.env.NEXT_PUBLIC_API_URL}/region/${region}/?${params}`;
            } else {
                url = `${process.env.NEXT_PUBLIC_API_URL}/name/${query}?${params}`;
            }

            const res = await fetch(url, { cache: 'no-cache' });
            if (!res.ok || res.status === 404) {
                queryClient.invalidateQueries({
                    queryKey: ['countries'],
                });
                throw Error('Api error');
            }
            return res.json() as Promise<CountryProps[]>;
        },
        onError: (err: Error) => {
            setCountries(null);
            return err;
        },
        retry: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });

    useEffect(() => {
        if (!data) return;
        let filtered: Array<CountryProps>;
        if (region) {
            filtered = data.filter(
                (country) =>
                    country.region.toLowerCase() === region.toLowerCase()
            );
        } else {
            filtered = data;
        }
        setCountries({
            entries: filtered.slice(0, countriesLimit.value),
            total: filtered.length,
        });
    }, [data]);

    return { isLoading, error, countries };
}

export default useCountries;
