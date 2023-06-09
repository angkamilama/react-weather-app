import { useState } from "react";
import Axios from "axios";

function WeatherPage({ data, startNewPage, renderNewLocation }) {
  const retrievedData = { ...data };
  const [newLocation, setNewLocation] = useState("");

  return (
    <div className="main-weather-container">
      <div className="weather-box">
        <div>
          <input
            placeholder="search another city"
            onChange={(e) => {
              setNewLocation(e.target.value);
            }}
          />
          <button onClick={() => renderNewLocation(newLocation)}>Search</button>
        </div>
        <div className="weather-info">
          <h2 className="weather-city">
            {retrievedData.name}, {retrievedData.sys.country}
          </h2>
          <h1>
            <span className="current_temperature">
              {Math.floor(retrievedData.main.temp)}°
            </span>
            <span className="celsius-symbol">C</span>
          </h1>
          <h3> {retrievedData.weather[0].main} </h3>
        </div>
        <div className="weather-description">
          <h4>
            {retrievedData.main.temp_max}° C / {retrievedData.main.temp_min}° C
          </h4>
          <h4>Humidity: {retrievedData.main.humidity}%</h4>
          <h4>Wind-speed: {retrievedData.wind.speed} m/s</h4>
        </div>
        <button className="weather-search" onClick={() => startNewPage(false)}>
          HomePage
        </button>
      </div>
    </div>
  );
}

export default WeatherPage;
