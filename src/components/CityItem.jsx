import { Link } from "react-router-dom";
import {
  cityItem,
  emoji as emojiClass,
  name,
  date as daate,
  deleteBtn,
  cityItemActive,
} from "./CityItem.module.css";
import { useCities } from "../Context/CitiesContext";

// Formatage de la date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// Dictionnaire des codes pays
export const countryCodes = {
  Italy: "IT",
  Spain: "ES",
  Germany: "DE",
  France: "FR",
  Algeria: "DZ",
  Libya: "LY",
  Nigeria: "NG",
};

function CityItem({ city }) {
  const { currentCity } = useCities();

  const { cityName, country, date, id, position } = city;
  const countryCode = countryCodes[country];

  return (
    <li>
      <Link
        className={`${cityItem} ${
          city.id === currentCity.id ? cityItemActive : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {countryCode && (
          <img
            src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
            alt={`Flag of ${country}`}
            width="20"
            className={emojiClass}
          />
        )}
        <h3 className={name}>{cityName}</h3>
        <time className={daate}>({formatDate(date)})</time>
        <button className={deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
