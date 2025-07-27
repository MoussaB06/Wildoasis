import { Link } from "react-router-dom";
import {
  cityItem,
  emoji as emojiClass,
  name,
  date as daate,
  deleteBtn,
} from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji: cityEmoji, date, id, position } = city;
  return (
    <li>
      <Link
        className={cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={emojiClass}>{cityEmoji}</span>
        <h3 className={name}>{cityName}</h3>
        <time className={daate}>({formatDate(date)})</time>
        <button className={deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
