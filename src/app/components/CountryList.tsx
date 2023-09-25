import Country, { CountryProps } from './Country';
import styles from './CountryList.module.scss';
import LoadMoreButton from './LoadMoreButton';

const CountryList = ({ countries }: { countries: Array<CountryProps> }) => {
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
            <LoadMoreButton/>
        </>
    );
};

export default CountryList;
