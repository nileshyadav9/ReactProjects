import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import styles from "./CityList.module.css";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add city by clicking on Map!" />;

  const countries = cities.reduce((prev, cur) => {
    if (!prev.map((el) => el.country).includes(cur.country))
      return [...prev, { country: cur.country, emoji: cur.emoji }];
    else return prev;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
