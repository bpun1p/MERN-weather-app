import React from 'react';
import './Gauge.css';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Gauge({ value }) {
  const gaugeElement = useRef();

  useEffect(() => {
    const gauge = gaugeElement.current;
    setGaugeValue(gauge, value/100);
  }, [])
  
  function setGaugeValue(element, value) {
    if (value < 0 || value > 1) {
      return;
    }

    element.querySelector(".gauge-fill").style.transform = `rotate(${value / 2}turn)`;
    element.querySelector(".gauge-cover").textContent = `${Math.round(value * 100)}%`;
  }

  return (
    <div ref={gaugeElement} className="gauge">
      <div className="gauge-body">
        <div className="gauge-fill"></div>
          <div className='gauge-cover'></div>
      </div>
    </div>
  );
}

Gauge.propTypes = {
  value: PropTypes.number
};
  

