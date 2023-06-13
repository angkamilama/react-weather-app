import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function WeatherPage({ data, startNewPage, fetchData }) {
  const { name, sys, main, weather, wind } = { ...data };
  const [newLocation, setNewLocation] = useState("");
  const [inputError, setInputError] = useState(false);

  const showInputError = () => {
    if (newLocation === "") {
      setInputError(true);
    } else {
      fetchData(newLocation);
    }
    setNewLocation("");
  };

  return (
    <div className="main-weather-container">
      <div className="weather-container">
        <div className="weather-heading">
          <input
            className="input"
            value={newLocation}
            placeholder="City Search"
            onClick={() => setInputError(false)}
            onChange={(e) => {
              setNewLocation(e.target.value);
            }}
          />
          <AiOutlineSearch
            onClick={() => {
              showInputError();
            }}
            size={20}
            color="white"
            className="search-icon"
          />
        </div>
        {inputError ? (
          <p className="inputError-msg">Enter a city name</p>
        ) : null}
        <div className="weather-info">
          <h2 className="weather-city">
            {name}, {sys.country}
          </h2>
          <h1>
            <span className="current_temperature">
              {Math.floor(main.temp)}°
            </span>
            <span className="celsius-symbol">C</span>
          </h1>
          <h3> {weather[0].main} </h3>
        </div>
        <div className="weather-description">
          <h4>
            {main.temp_max}° C / {main.temp_min}° C
          </h4>
          <h4>Humidity: {main.humidity}%</h4>
          <h4>Wind-speed: {wind.speed} m/s</h4>
        </div>
        <button className="homePage-btn" onClick={() => startNewPage(false)}>
          Home
        </button>
      </div>
    </div>
  );
}

export default WeatherPage;
