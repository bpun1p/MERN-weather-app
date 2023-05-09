import React, { useEffect, useState } from 'react';
import './MyLibrary.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrentWeather, getForecast } from '../../service/weatherService';

export default function MyLibrary() {
  const [locations, setLocations] = useState(null)
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if(!locations) {
      fetchLocations()
        .then((locationsArr) => loadData(locationsArr))
        .then((data) => setWeatherData(data))
        .catch((err) => console.error(err));
    }
  }, []);

  const getWeather = async (localeArr) => {
    const currentWeatherData = getCurrentWeather(localeArr.location);
    const forecastData = getForecast(localeArr.location);

    const [currentWeather, forecast] = await Promise.allSettled([currentWeatherData, forecastData]);

    const weatherData = {
      id : localeArr._id,
      currentWeather : currentWeather.value,
      forecast : forecast.value
    };
    return weatherData;
  };

  const fetchLocations = async () => {
    const data = await getLocations();
    setLocations(data)
    return data;
  };

  const loadData = async (localeArr) => {
    let weatherDataArr = [];
    for (let i = 0; i < localeArr.length; i++) {
      weatherDataArr.push( await getWeather(localeArr[i]));
    }
    return weatherDataArr;
  };

  const handleDelete = async (index) => {
    await deleteLocation(weatherData[index].id);
    const newData = weatherData.filter((e) => e.id !== weatherData[index].id)
    setWeatherData(newData);
 };

  const uploadData = () => {
    const results = [];
    if (weatherData) {
      for (let i=0; i < weatherData.length; i++) {
        results.push(
          <tr className='table-data'>
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
      }
    } return(results);
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
  )
};