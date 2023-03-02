import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({});
  const {
    name,
    capital,
    area,
    languages,
    flags,
    latlng: [lat, lng],
  } = country;

  useEffect(() => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    axios
      .get(openWeatherUrl)
      .then((res) => res.data)
      .then(({ main: { temp }, weather: [conditions] }) => {
        setWeather((w) => ({ ...w, temp, conditions }));
      });
  }, [lat, lng]);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.temp}</p>

      {weather.conditions && (
        <img
          src={` http://openweathermap.org/img/wn/${weather.conditions.icon}@2x.png`}
          alt={weather.conditions.description}
        />
      )}
    </div>
  );
};
export default CountryDetail;
