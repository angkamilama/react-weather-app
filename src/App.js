import Axios from "axios";
import { useState } from "react";
import style from "./style.css";
import WeatherPage from "./components/WeatherPage";

function App() {
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [showWeather, setShowWeather] = useState(false);

  const fetchData = () => {
    if (!location) {
      alert("Please enter a city");
      return;
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d75acfd51254272f61cb01512c09920a`;
      return Axios.get(url).then((response) => {
        setWeatherInfo(response.data);
        setShowWeather((showWeather) => !showWeather);
      });
    }
  };

  const startNewPage = (val) => {
    if (val === false) {
      setShowWeather(false);
    }
    return;
  };

  const renderNewLocation = (data) => {
    setLocation((location) => data);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d75acfd51254272f61cb01512c09920a`;
    return Axios.get(url).then((response) => {
      setWeatherInfo(response.data);
    });
  };

  return (
    <>
      {showWeather ? (
        <WeatherPage
          data={weatherInfo}
          renderNewLocation={renderNewLocation}
          startNewPage={startNewPage}
        />
      ) : (
        <div className="main-container">
          <div className="front-image">
            <img src="Photos/weather-icon.png" />
          </div>
          <div className="main-heading">
            <div className="heading">
              <h2>
                Weather <span className="heading-primary">News & Feed</span>
              </h2>
              <p className="heading-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
                voluptas exercitationem enim commodi, rerum cupiditate
                perspiciatis amet. Omnis, ad nulla.
              </p>
            </div>
            <div className="search-container">
              <input
                name="city"
                className="input"
                value={location}
                placeholder="Type City Name"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />

              <button className="inputButton" onClick={fetchData}>
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
