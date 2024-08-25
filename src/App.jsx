

import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState(null);

  const apiKey = "18831b05b65c4838bca161129242408";

  function LoadWeather(cityName) {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=no&alerts=no`)
      .then((response) => {
        setLocation(response.data);
        setError(null);
      }).catch((e) => {
        setError("City not found. Please try again.");
      });
  }

  useEffect(() => {
    LoadWeather(city);
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <>
      

      <div className='weatherCard '>
          <h2>Weather in {location.location.name}, {location.location.country}</h2>
        <div className='d-flex m-1 mb-4'>
          <input type="text" className='form-control' value={city} onChange={handleCityChange} placeholder="Enter city name" />
          <button onClick={() => LoadWeather(city)} className='btn btn-info ms-2'>Get Weather</button>
          <button className='btn btn-info ms-2' onClick={toggleUnit}>
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
          {error && <p className='text-danger fs-4 mb-3'>{error}</p>}
        <div className='wCard d-flex'>
          <div className='wCardH'>
            <img src={location.current.condition.icon} className="card-img-top" alt={location.current.condition.text} />
          </div>
          <div className='wCardB'>
            <div className='wCardT'>
              <h5 className="card-title">Last Update: {location.current.last_updated}</h5>
              <p className="card-text">Temperature: {unit === "C" ? location.current.temp_c : location.current.temp_f}°{unit}</p>
              <p className="card-text">Wind: {location.current.wind_kph} kph ({location.current.wind_mph} mph) {location.current.wind_dir}</p>
              <p className="card-text">Pressure: {location.current.pressure_mb} MB</p>
              <p className="card-text">Visibility: {location.current.vis_km} KM</p>
              <p className="card-text">Humidity: {location.current.humidity} %</p>
            </div>
          </div>
        </div>
      </div>

      <div className='weatherCardBox '>
        <h3>5-Day Forecast</h3>
        <div className='wCardBox d-flex justify-content-center align-items-center mb-5'>
          {location.forecast.forecastday.map((day) => (
            <div className="box p-4 me-3 shadow text-white" key={day.date}>
              <h5>{day.date}</h5>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>{unit === "C" ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
