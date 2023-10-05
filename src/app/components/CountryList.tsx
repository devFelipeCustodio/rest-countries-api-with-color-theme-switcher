import Country, { CountryProps } from './Country';
import styles from './CountryList.module.scss';
import LoadMoreButton from './LoadMoreButton';

const CountryList = ({
    countries,
    remaining,
}: {
    countries: Array<CountryProps>;
    remaining: number;
    }) => {
    
    return (
        <>
            <div className={styles.countries_container}>
                {countries.map((country, i) => (
                    <Country
                        key={i}
                        {...country}
                    />
                ))}
            </div>
            {remaining > 0 && <LoadMoreButton />}
        </>
    );
};

export default CountryList;
