import { countriesList } from "./CountriesList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Context/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={`Add your first country by clicking on a city on the map`}
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((city) => city.country).includes(city.country))
      return [...arr, { country: city.country, emogi: city.emogi }];
    else return arr;
  }, []);

  return (
    <ul className={countriesList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountriesList;
