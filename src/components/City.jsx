import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../Context/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

// Fonction de formatage de date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// Dictionnaire pour les codes pays (nécessaire pour récupérer le drapeau)
const countryCodes = {
  Italy: "IT",
  Spain: "ES",
  Germany: "DE",
  France: "FR",
  Algeria: "DZ",
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id]);

  // Si les données ne sont pas encore là
  if (!currentCity.cityName) return <Spinner />;
  if (isLoading) return <Spinner />;

  const { cityName, country, date, notes } = currentCity;
  const countryCode = countryCodes[country];

  return (
    <div className={styles.city}>
      <h2>
        <img
          src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
          alt={`Flag of ${country}`}
          width="32"
          style={{ marginRight: "8px", verticalAlign: "middle" }}
        />
        {cityName}
      </h2>
      <p>{formatDate(date)}</p>
      <h6>Your notes</h6>
      <p>{notes}</p>
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://fr.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="norreferrer"
        >
          Check out {cityName} on wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
