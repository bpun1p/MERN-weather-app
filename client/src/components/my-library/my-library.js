import React, {useEffect, useState} from 'react';
import './my-library.css';

export default function MyLibrary() {

  const [isData, setData] = useState([  //replace /w dummy data
    {
      city: 'Vancouver',
      weather: '-1 C',
      forecast:'forecast' 
    }
  ]);

  useEffect(() => {
    //axios.get from api
  })
  
  const loadData = () => {
    const results = []
    if (isData) {
      for (let i=0; i < isData.length; i++) {
        results.push(
          <tr className='table-data'>
            <td className='city-data data'>{isData[i].city}</td>
            <td className='weather-data data'>{isData[i].weather}</td>
            <td className='forecast-data data'>{isData[i].forecast}</td>
            <td className='delete-data data'>Delete</td>
          </tr>
        )
      }
    }
    return(results);
  }

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
        {isData ? loadData() : null}
      </table>
    </div>
  )
};