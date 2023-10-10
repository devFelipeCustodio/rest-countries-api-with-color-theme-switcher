import { useEffect, useState, useTransition } from 'react';
import { CountryProps } from '../components/Country';
import { useQuery, useQueryClient } from 'react-query';
import useFilterContext from './useFilterContext';

type TCountries = {
    entries: Array<CountryProps>;
    total: number;
};

function useCountries(_query?: string) {
    const { region, query, setQuery, countriesLimit, setCountriesLimit } =
        useFilterContext();
    const [countries, setCountries] = useState<null | TCountries>(null);
    const fields = ['name', 'flags', 'capital', 'region', 'population'];
    const params = new URLSearchParams();
    const queryClient = useQueryClient();

    params.set('fields', fields.join(','));

    const { isLoading, error, data } = useQuery({
        queryKey: ['countries', query, region, countriesLimit],
        queryFn: async () => {
            let url: string;
            if (!_query && !query && !region) {
                url = `${process.env.NEXT_PUBLIC_API_URL}/all/?${params}`;
            } else if (!query && region) {
                url = `${process.env.NEXT_PUBLIC_API_URL}/region/${region}/?${params}`;
            } else {
                url = `${process.env.NEXT_PUBLIC_API_URL}/name/${query}?${params}`;
            }
            const res = await fetch(url);
            if (!res.ok || res.status === 404) {
                queryClient.invalidateQueries({
                    queryKey: ['countries'],
                });
                setCountries(null);
                throw Error('Api error');
            }
            return res.json() as Promise<CountryProps[]>;
        },
        retry: false,
        refetchOnWindowFocus: false,
        cacheTime: 0
    });

    useEffect(() => {
        if (_query) {
            setQuery(_query);
        }
    }, []);

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
