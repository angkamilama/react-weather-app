import axios from "axios";
import { useState } from "react";
import style from "./style.css";
import WeatherPage from "./components/WeatherPage";

function App() {
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [showWeather, setShowWeather] = useState(false);
  const [inputError, setInputError] = useState(false);

  const fetchData = async (value) => {
    console.log(value);
    if (value === "") {
      setInputError(true);
      return;
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=d75acfd51254272f61cb01512c09920a`;
      const receivedData = await axios
        .get(url)
        .then((response) => {
          setWeatherInfo(response.data);
          setShowWeather((showWeather) => true);
          setLocation("");
        })
        .catch((error) => {
          if (error.response) {
            // Request made but the server responded with an error
            console.log(error.response);
          } else if (error.request) {
            // Request made but no response is received from the server.
            console.log(error.request);
          } else {
            // Error occured while setting up the request
            console.log("error during setting up request");
          }
        });
      return receivedData;
    }
  };

  const startNewPage = (value) => {
    if (value === false) {
      setShowWeather(false);
    }
    return;
  };

  return (
    <>
      {showWeather ? (
        <WeatherPage
          data={weatherInfo}
          fetchData={fetchData}
          startNewPage={startNewPage}
        />
      ) : (
        <div className="main-container">
          <div className="front-image">
            <img src="photos/weather-icon.png" />
          </div>
          <div className="main-heading">
            <div className="heading">
              <h2>
                Weather <span className="heading-primary">News & Feed</span>
              </h2>
              <p className="heading-description">
                Do you want to find out about the weather in your favourite city
                or compare weather between cities. It is just a
                <span className="click"> click </span>away! Let's find it
                together with my
                <span className="weather"> Weather </span>{" "}
                <span className="search">Search </span>
                App.
              </p>
            </div>
            <div className="search-container">
              <>
                <input
                  name="city"
                  className="input"
                  value={location}
                  placeholder="City Name"
                  onClick={() => setInputError(false)}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
                {inputError ? (
                  <p className="inputError-msg">Enter a city name</p>
                ) : null}
              </>
              <button
                className="inputButton"
                onClick={() => fetchData(location)}
              >
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
