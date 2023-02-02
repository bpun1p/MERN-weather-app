import React, {useState} from 'react';

export default function CurrentWeather() {
    return(
        <div className='containter'>
          <div className='top'>
            <div className='location'>
              <h1>Whistler</h1> 
            </div>
            <div className='temp'>
              <p>79°C</p>
            </div>
            <div className='descripton'>
              <p>Cloudy</p>
            </div>
          </div>
          <div className='center'>
            <div className='feels'>
              <p>79°C</p>
              <p>Feels like</p>
            </div>
            <div className='humidity'>
              <p>70%</p>
              <p>Humidity</p>
            </div>
            <div className='winds'>
              <p>2 MPH</p>
              <p>Winds</p>
            </div>
          </div>
        </div>
    )
};