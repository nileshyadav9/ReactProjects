// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import { useEffect } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoMappingError, setGeoMappingError] = useState("");
  const { insertCity, isCityInsertionLoading } = useCities();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function getCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeoMappingError("");
          const result = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await result.json();
          console.log(data);

          if (!data.countryCode) {
            //setGeoMappingError("International Waters!");
            throw new Error("International Waters/ Not a City!");
          }

          setCityName(data.cityName || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGeoMappingError(error.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await insertCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Please click somwhere on map to start!" />;
  if (geoMappingError) return <Message message={geoMappingError} />;
  return (
    <form
      className={`${styles.form} ${
        isCityInsertionLoading ? styles.loading : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/*  <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
