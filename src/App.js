import React, { useState, useEffect } from "react";
import "./App.css";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const api = {
  key: API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

// const apiGeo = {
//   key: API_KEY,
//   base: "http://api.openweathermap.org/geo/1.0/direct?q=",
// };

console.log();

function App() {
  const [query, setQuery] = useState("");
  const [queryZip, setQueryZip] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    const response = await fetch(
      `${api.base}weather?q=queens&units=imperial&APPID=${api.key}`
    );
    const data = await response.json();
    setWeather(data);
    console.log(data);
  };

  const searchByPlace = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        // fetch(`${api.base}weather?zip=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const searchByZip = (e) => {
    if (e.key === "Enter") {
      // fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      fetch(
        `${api.base}weather?zip=${queryZip}&units=imperial&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQueryZip("");
          console.log(result);
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date},  ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 50
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by Place..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={searchByPlace}
            value={query}
          />
          <input
            type="text"
            className="search-bar2"
            placeholder="Search by Zip code..."
            onChange={(e) => setQueryZip(e.target.value)}
            onKeyPress={searchByZip}
            value={queryZip}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°
                <div className="cnt-high-low">
                  <h2 className="low">
                    Low: {Math.round(weather.main.temp_min)}°
                  </h2>
                  <h2 className="high">
                    High: {Math.round(weather.main.temp_max)}°
                  </h2>
                </div>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
