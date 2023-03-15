import React, {useEffect, useState} from 'react';
import './my-library.css';

export default function myLibrary() {
  

  return (
    <div className='library'>
      <div className='library-header'>
        <h1>Library</h1>
      </div>
      <table className='library-table'>
        <tr className='table-header'>
          <th className='city-header'>City</th>
          <th className='weather-header'>Weather</th>
          <th className='forecast-header'>Forecast</th>
        </tr>
        <tr className='table-data'>
          <td className='city-data data'>Vancouver</td>
          <td className='weather-data data'>Current</td>
          <td className='forecast-data data'>Forecast</td>
          <td className='delete-data data'>Delete</td>
        </tr>
        <tr className='table-data'>
          <td className='city-data data'>Vancouver</td>
          <td className='weather-data data'>Current</td>
          <td className='forecast-data data'>Forecast</td>
          <td className='delete-data data'>Delete</td>
        </tr>
        <tr className='table-data'>
          <td className='city-data data'>Vancouver</td>
          <td className='weather-data data'>Current</td>
          <td className='forecast-data data'>Forecast</td>
          <td className='delete-data data'>Delete</td>
        </tr>
        <tr className='table-data'>
          <td className='city-data data'>Vancouver</td>
          <td className='weather-data data'>Current</td>
          <td className='forecast-data data'>Forecast</td>
          <td className='delete-data data'>Delete</td>
        </tr>
      </table>
    </div>
  )
};