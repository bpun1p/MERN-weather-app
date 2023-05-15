import React, { useEffect, useState, useCallback } from 'react';
import './MyLibrary.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrent, getForecast } from '../../service/weatherService';

export default function MyLibrary() {
  const [weatherData, setWeatherData] = useState(null);

  const pushWeatherData = useCallback(async (locations) => {
    const dataArr = [];
    for (let i = 0; i < locations.length; i++) {
      dataArr.push( await fetchWeatherData(locations[i]));
    };
    return dataArr;
  }, []);
  
  useEffect(() => {
      const getData = async () => {
        try {
          const savedLocations = await fetchSavedLocations();
          const data = await pushWeatherData(savedLocations);
          setWeatherData(data);
        } catch (err) {
            console.error(err);
        };
      };
      getData();
  }, [pushWeatherData]);

  const fetchWeatherData = async (location) => {
    const [current, forecast] = await Promise.all([getCurrent(location.location), getForecast(location.location)]);

    const weatherData = {
      id : location._id,
      current : current,
      forecast : forecast
    };
    return weatherData;
  };

  const fetchSavedLocations = async () => {
    const locations = await getLocations();
    return locations;
  };

  const handleDelete = async (index) => {
    await deleteLocation(weatherData[index].id);
    setWeatherData(() => weatherData.filter((e) => e.id !== weatherData[index].id));
 };

  const showData = () => {
    const results = [];
    if (weatherData) {
      for (let i=0; i < weatherData.length; i++) {
        results.push(
          <tr className='table-data' key={i}>
            <td className='city-data data'>{weatherData[i].current.data.name}</td>
            <td className='weather-data data'>{weatherData[i].current.data.main.temp.toFixed()}°C</td>
            <td className='forecast-data data'>
             {weatherData[i].forecast.data.list[0].main.temp.toFixed()}°C |&nbsp;
             {weatherData[i].forecast.data.list[1].main.temp.toFixed()}°C |&nbsp;
             {weatherData[i].forecast.data.list[2].main.temp.toFixed()}°C |&nbsp;
             {weatherData[i].forecast.data.list[3].main.temp.toFixed()}°C |&nbsp;
             {weatherData[i].forecast.data.list[4].main.temp.toFixed()}°C 
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
          {weatherData ? showData() : null}
        </tbody>
      </table>
    </div>
  );
};