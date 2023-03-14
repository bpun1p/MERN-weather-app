import React, {useEffect, useState} from 'react';

export default function myLibrary() {

  return (
    <div>
      <div className='library-header'>
        <h1>Library</h1>
      </div>
      <table>
        <thead>
          <trow>
            <th>City</th>
            <th>Weather</th>
            <th>Forecast</th>
          </trow>
        </thead>
        <tdata>
          <trows>
            <td>Vancouver</td>
            <td>CurrentWeather component</td>
            <td>Forecast component</td>
            <rmdata>Delete</rmdata>
          </trows>
        </tdata>
      </table>
    </div>
  )
};