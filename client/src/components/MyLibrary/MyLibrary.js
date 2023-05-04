import React, { useEffect, useState } from 'react';
import './MyLibrary.css';
import { getLocations, deleteLocation } from '../../service/libraryService';
import { getCurrentWeather, getForcast } from '../../service/weatherService';

export default function MyLibrary() {
  const [locations, setLocations] = useState();
  const [msgErr, setMsgErr] = useState(false);
  const data = [];

  useEffect(() => {
    fetchLocations()
      .then(() => {
        //how should i iterate through locations array and get weather for each item in the array
      })
  }, []) 

  const getWeather = async (location) => {
    const currentWeatherData = getCurrentWeather(location);
    const forecastData = getForcast(location);

    const [currentWeather, forecast] = await Promise.all([currentWeatherData, forecastData]);
    
    const weatherData = {
      currentWeather : currentWeather,
      forecast : forecast
    }
    return weatherData;
  }

  const fetchLocations = async () => {
    try {
      const data = await getLocations()
      setLocations(data.map(data => data.location))
    } catch(err) {
        console.log(err.message.msgBody)
        setMsgErr(true);
    } 
  };

  // const loadData = () => {
  //   const results = [];
  //   if (isData) {
  //     for (let i=0; i < isData.length; i++) {
  //       results.push(
  //         <tr className='table-data'>
  //           <td className='city-data data'>{isData[i].city}</td>
  //           <td className='weather-data data'>{isData[i].weather}</td>
  //           <td className='forecast-data data'>{isData[i].forecast}</td>
  //           <td className='delete-data data'>Delete</td>
  //         </tr>
  //       )
  //     }
  //   }
  //   return(results);
  // }

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
          {/* {isData ? loadData() : null} */}
        </tbody>
      </table>
    </div>
  )
};