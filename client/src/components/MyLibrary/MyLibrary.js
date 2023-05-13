import React, { useEffect, useState, useCallback } from 'react';
import './MyLibrary.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrentWeather, getForecast } from '../../service/weatherService';

export default function MyLibrary() {
  const [locations, setLocations] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const pushWeatherData = useCallback(async (locations) => {
    const dataArr = [];
    for (let i = 0; i < locations.length; i++) {
      dataArr.push( await fetchWeatherData(locations[i]));
    };
    return dataArr;
  }, []);
  
  useEffect(() => {
    if(!locations) {
      const displayWeather = async () => {
        try {
          const locations = await fetchLocations();
          const data = await pushWeatherData(locations);
          setWeatherData(data);
        } catch (err) {
            console.error(err);
        };
      };
    displayWeather();
    };
  }, [locations, pushWeatherData]);

  const fetchWeatherData = async (locations) => {
    const currentWeatherData = getCurrentWeather(locations.location);
    const forecastData = getForecast(locations.location);

    const [currentWeather, forecast] = await Promise.allSettled([currentWeatherData, forecastData]);

    const weatherData = {
      id : locations._id,
      currentWeather : currentWeather.value,
      forecast : forecast.value
    };
    return weatherData;
  };

  const fetchLocations = async () => {
    const locations = await getLocations();
    setLocations(locations);
    return locations;
  };

  const handleDelete = async (index) => {
    await deleteLocation(weatherData[index].id);
    setWeatherData(() => weatherData.filter((e) => e.id !== weatherData[index].id));
 };

  const uploadData = () => {
    const results = [];
    if (weatherData) {
      for (let i=0; i < weatherData.length; i++) {
        results.push(
          <tr className='table-data' key={i}>
            <td className='city-data data'>{weatherData[i].currentWeather.data.name}</td>
            <td className='weather-data data'>{weatherData[i].currentWeather.data.main.temp}</td>
            <td className='forecast-data data'>
             {weatherData[i].forecast.data.list[0].main.temp} |&nbsp;
             {weatherData[i].forecast.data.list[1].main.temp} |&nbsp;
             {weatherData[i].forecast.data.list[2].main.temp} |&nbsp;
             {weatherData[i].forecast.data.list[3].main.temp} |&nbsp;
             {weatherData[i].forecast.data.list[4].main.temp} 
            </td>
            <button className='delete-data data' onClick={() => handleDelete(i)}>Delete</button>
          </tr>
        );
      };
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
          {weatherData ? uploadData() : null}
        </tbody>
      </table>
    </div>
  );
};