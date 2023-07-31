import React, { useEffect, useState, useCallback } from 'react';
import './MyLibrary.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrent, getForecast } from '../../service/weatherService';
import { useAuthContext } from '../utils/access/useAuthContext';
import LoadingSpinner from '../utils/loader/Loader';
import Trash from '../assets/images/trash-icon.png';

export default function MyLibrary() {
  const [weatherData, setWeatherData] = useState(null);
  const { user } = useAuthContext();

  const accumulateWeatherData = useCallback(async (locData) => {
    const dataArr = [];
    for (let i = 0; i < locData.length; i++) {
      dataArr.push( await fetchWeatherData(locData[i]));
    }
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
      }
    };

    if (user) {
      getData();
    }

    return() => {
      setWeatherData(null);
      console.log('Unmounted');
    };
  }, [accumulateWeatherData, user]);

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
    const locations = await getLocations(user);
    return locations;
  };

  const handleDelete = async (id) => {
    if (!user) {
      console.log('Login Required');
      return;
    }
    await deleteLocation(id, user);
    setWeatherData(() => weatherData.filter(e => e.id !== id));
  };

  const accumulateForecastData = (forecastData) => {
    const forecastResults = [];
    for (let forecast of forecastData) {
      forecastResults.push((forecast.main.temp.toFixed() + ' °C | '));
    }
    return forecastResults;
  };

  const showData = () => {  
    const results = [];
    if (weatherData) {
      for (let weather of weatherData) {
        results.push(
          <tr className='table-data' key={weather.id}>
            <td className='city-data data'>{weather.current.data.name}</td>
            <td className='weather-data data'>{weather.current.data.main.temp.toFixed()}°C</td>
            <td className='forecast-data data'>
              {accumulateForecastData(weather.forecast.data.list)}
            </td>
            <img src={Trash} onClick={() => handleDelete(weather.id)} className='trash-icon' alt='trash-icon' />
          </tr>
        );
      }
      return(results);
    }
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
          {user ? 
            <>
              {weatherData ? showData() : <LoadingSpinner/>}
            </> 
            : <span className='unauthorized-library-text'>Login or sign up to see your saved locations</span>}
        </tbody>
      </table> 
    </div>
  );
}