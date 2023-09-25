import styles from './page.module.scss';
import ScrollerButton from './components/ScrollerButton';
import CountryList from './components/CountryList';
import ActionsForm from './components/ActionsForm';
import { CountryProps } from './components/Country';

const FILTER_FIELDS = 'fields=name,flags,capital,region,population';

type TApiError = { status: number; message: string };
type TCountries = Array<CountryProps>;

function filterByRegion(countries: TCountries, region: string) {
    return countries.filter(
        (country: CountryProps) =>
            country.region.toLowerCase() === region.toLowerCase()
    );
}

function applyLimit(countries: TCountries, limit: number) {
    return countries.slice(0, limit);
}

async function fetchCountries(
    query: string | undefined,
    region: string | undefined,
    max: string | undefined = '15'
) {
    // TODO CRIAR HANDLER DE ENV VARS
    let url = `${process.env.NEXT_PUBLIC_API_URL}/all?${FILTER_FIELDS}`;
    if (query) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/name/${query}?${FILTER_FIELDS}`;
    }
    const res = await fetch(url);
    if (res.status === 200) {
        let countries: Array<CountryProps> = await res.json();
        let filtered;
        if (region) {
            filtered = filterByRegion(countries, region);
        }
        filtered = filtered
            ? applyLimit(filtered, parseInt(max))
            : applyLimit(countries, parseInt(max));
        return filtered;
    } else {
        return (await res.json()) as TApiError;
    }
}

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { q, region, max } = searchParams;
    const json = await fetchCountries(q, region, max);

    const isApiError = (json: TCountries | TApiError): json is TApiError => {
        return (json as TApiError).status === 404;
    };

    return (
        <div className={styles.container}>
            <ActionsForm />
            <main>{!isApiError(json) && <CountryList countries={json} />}</main>
            <ScrollerButton />
        </div>
    );
};

export default Page;
