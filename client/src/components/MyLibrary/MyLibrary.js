import React, {useEffect, useState} from 'react';
import './MyLibrary.css';
import {getLocations, deleteLocation} from '../../service/libraryService';

export default function MyLibrary() {
  const [locations, setLocations] = useState([]);
  const [msgErr, setMsgErr] = useState(false);

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const fetchData = async () => {
    try {
      const locations = await getLocations()
      setLocations(locations)
      console.log(locations)
    } catch(err) {
        console.log(err.message.msgBody)
        setMsgErr(true)
    }
  }
  
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