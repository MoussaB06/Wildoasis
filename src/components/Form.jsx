// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCities } from "../Context/CitiesContext";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
// import { btn, primary, back } from "./Button.module.css";

import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        console.log(data);

        if (!data.countryCode)
          throw new Error("Doesn't seem to be a city. Click somewhere else 😉");

        setCityName(data.city || data.locality || "");

        setCountry(data.countryName);

        setCountryCode(data.countryCode);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  if (!lat && !lng)
    return <Message message="Start by clicking somwhere on the map!" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {countryCode && (
          <img
            src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
            alt={`Flag of ${country}`}
            width="32"
            className={styles.flag}
          />
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          type="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date.toISOString().split("T")[0]}
        /> */}
        <DatePicker
          id="date"
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button variation="primary">add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
