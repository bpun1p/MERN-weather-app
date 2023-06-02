import React, { useEffect, useState, useCallback } from 'react';
import './MyLibrary.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrent, getForecast } from '../../service/weatherService';

export default function MyLibrary() {
  const [weatherData, setWeatherData] = useState(null);

  const accumulateWeatherData = useCallback(async (locData) => {
    const dataArr = [];
    for (let i = 0; i < locData.length; i++) {
      dataArr.push( await fetchWeatherData(locData[i]));
    };
    return dataArr;
  }, []);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const savedLocData = await fetchSavedLocations();
        const data = await accumulateWeatherData(savedLocData);
        setWeatherData(data);
      } catch (err) {
          console.error(err);
      };
    };
    getData();
  }, [accumulateWeatherData]);

  const fetchWeatherData = async (locData) => {
    const location = locData.location;
    const [current, forecast] = await Promise.all([getCurrent(location), getForecast(location)]);

    const weatherData = {
      id : locData._id,
      current : current,
      forecast : forecast
    };
    return weatherData;
  };

  const fetchSavedLocations = async () => {
    const locations = await getLocations();
    return locations;
  };

  const handleDelete = async (id) => {
    await deleteLocation(id);
    setWeatherData(() => weatherData.filter(e => e.id !== id));
  };

  const accumulateForecastData = (forecastData) => {
    const forecastResults = [];
    forecastData.forEach(forecast => forecastResults.push(forecast.main.temp.toFixed() + " °C | "))
    return forecastResults;
  };

  const showData = () => {  
    const results = [];
    if (weatherData) {
      weatherData.forEach(e => 
        results.push(
          <tr className='table-data' key={e.id}>
            <td className='city-data data'>{e.current.data.name}</td>
            <td className='weather-data data'>{e.current.data.main.temp.toFixed()}°C</td>
            <td className='forecast-data data'>
            {accumulateForecastData(e.forecast.data.list)}
            </td>
            <button className='delete-data data' onClick={() => handleDelete(e.id)}>Delete</button>
          </tr>
        ));
    }; 
    return(results);
  };

  return (
    <div className='library'>
      <div className='library-header'>
        <h1>Library</h1>
      </div>
      <table className='library-table'>
        <tbody>
          <tr className='table-header'>
            <th className='city-header'>City</th>
            <th className='weather-header'>Weather</th>
            <th className='forecast-header'>Forecast</th>
          </tr>
          {weatherData ? showData() : null}
        </tbody>
      </table>
    </div>
  );
};